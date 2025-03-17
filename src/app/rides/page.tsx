"use client";
import React, { useEffect, useState } from "react";
import { ListFilter, Search } from "lucide-react";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";
import api from "../../../config/api";
import RidesTable from "../components/RidesTable";
import TableFooter from "../components/TableFooter";
import LoaderComp from "../components/LoaderComp";
import ErrorComp from "../components/ErrorComp";
import useDebounce from "../../../hooks/use-debounce";
import { handleAxiosError } from "../../../config/handleAxiosError";
import { useQueryClient } from "@tanstack/react-query";
import useCloseOnEscKey from "../../../hooks/use-close-on-esc-key";
import axios from "axios"

export interface Ride {
  userId: string;
  from: string;
  to: string;
  status: "ACTIVE" | "ONGOING" | "CANCELLED" | "COMPLETED";
  date?: string;
  passengers: {
    seats: number;
    id: string;
    completed: boolean;
  }[];
  userAvatarUrl?: string;
  userFirstName?: string;
  userLastName?: string;
  userUsername?: string;
  userEmail?: string;
  estimatedTime?: string;
  carImages?: string[];
  vehicleModel?: string;
  color?: string;
  plateNumber?: string;
  numberOfSeats: number;
  pricePerSeat: number;
  adminViewable: boolean;
  analyticsDate: string;
  createdAt: string;
  id: string;
}

type FilterOption = "Filter" | "Active" | "Completed" | "Ongoing" | "Cancelled";
type FetchRidesResult = {
  data: Ride[];
  nextPage?: number;
  prevPage?: number;
};

export default function RideTracker() {
  // const [map, setMap] = useState<mapboxgl.Map | null>(null);
  // const [rides, setRides] = useState<Ride[]>([
  //   { id: "1", name: "Ride 1", latitude: 9.082, longitude: 8.6753 }, // Abuja, Nigeria
  //   { id: "2", name: "Ride 2", latitude: 6.5244, longitude: 3.3792 }, // Lagos, Nigeria
  // ]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("Filter");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRides, setTotalRides] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [searchError, setSearchError] = useState<null | string>(null);
  const fetchRides = async ({
    pageParam = 1,
    signal,
  }: {
    pageParam?: number;
    signal?: AbortSignal;
  }): Promise<FetchRidesResult> => {
    try {
      const response = await api.get(
        `/rides?page=${pageParam}&filter=${selectedFilter}`,
        {
          signal,
        }
      );

      const data = response.data.data;
      setTotalRides(data.totalRides || 1);
      setCurrentPage(data.currentPage || 1);
      return {
        data: data.rides,
        nextPage: data.nextPage,
        prevPage: data.prevPage,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || "Unknown error occurred");
    } else {
        throw new Error("An unexpected error occurred");
    }
    }
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteScroll<Ride, FetchRidesResult>(
    ({ pageParam = 1, signal }) => fetchRides({ pageParam, signal }),
    ["rides", selectedFilter]
  );
  // console.log({ data, isLoading, error, hasPreviousPage, currentPage });
  const queryClient = useQueryClient();
  const {isOpen, setIsOpen} = useCloseOnEscKey();
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: FilterOption) => {
    setSelectedFilter(option);
    setIsOpen(false);
    setSearchValue("");
    setCurrentPage(1)
  };

  const options: FilterOption[] = [
    "Active",
    "Completed",
    "Ongoing",
    "Cancelled",
  ];
  const pageSize = 15;

  // useEffect(() => {
  //   const mapInstance = new mapboxgl.Map({
  //     container: "ride-tracker-map",
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [8.6753, 9.0820],
  //     zoom: 2,
  //   });

  //   setMap(mapInstance);

  //   return () => mapInstance.remove();
  // }, []);

  // useEffect(() => {
  //   if (map) {
  //     rides.forEach((ride) => {
  //       const marker = new mapboxgl.Marker()
  //         .setLngLat([ride.longitude, ride.latitude])
  //         .setPopup(
  //           new mapboxgl.Popup().setHTML(`<h4>${ride.name}</h4>`)
  //         )
  //         .addTo(map);

  //       return () => marker.remove();
  //     });
  //   }
  // }, [map, rides]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRides((prevRides) =>
  //       prevRides.map((ride) => ({
  //         ...ride,
  //         latitude: ride.latitude + Math.random() * 0.01 - 0.005,
  //         longitude: ride.longitude + Math.random() * 0.01 - 0.005,
  //       }))
  //     );
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const searchForRides = async () => {
    if (searchValue.length < 1) {
      return;
    }
    try {
      setIsSearchPending(true);
      setSearchError(null);
      const response = await api.get(
        `/rides/search?query=${searchValue}&filter=${selectedFilter}`
      );
      if (response.status === 200 && response.data) {
        // console.log(response.data.data);
        queryClient.setQueryData(["rides", selectedFilter], (old: unknown) => {
          if (!old) return old;

          return {
            ...(old as any),
            pageParams: [1],
            pages: [
              { data: response.data.data.rides, prevPage: null, nextPage: 2 },
            ],
          };
        });
        setCurrentPage(1);
        
        setTotalRides(response.data?.data?.rides?.length || 1)
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);

      setSearchError(message);
      console.error(`Unable to search for rides: ${message}`);
    } finally {
      setIsSearchPending(false);
    }
  };
  const debouncedData = useDebounce(searchForRides);
  useEffect(() => {
    if (searchValue.length > 1) {
      debouncedData();
    }
  }, [searchValue]);

  if (isLoading) {
    return (
      <div className="container">
        <LoaderComp />
      </div>
    );
  }
  if (error || searchError || !data) {
    const search_error = searchError ? new Error(searchError) : null;
    const refetchFunc = async() => {
      
      if(searchError){
        await queryClient.invalidateQueries(
          {
            queryKey: ["rides", selectedFilter], 
            exact: true,     
            refetchType: 'active', 
          },
          {
            throwOnError: true,  
            cancelRefetch: true,  
          }
        );
        setSearchError(null);
      }else {
      refetch();
      }
      setSearchValue("");
    }
    return (
      <div className="container">
        <ErrorComp error={error || search_error} refetch={refetchFunc} />
      </div>
    );
  }


  // let sliceStart = pageSize * (currentPage - 1);
  // let sliceEnd = sliceStart + pageSize;
  // const getPreviousPageData = () => {
  //   if (currentPage > 1) {
  //     sliceStart = sliceStart - pageSize >= 0 ? sliceStart - pageSize : 0;
  //     sliceEnd = sliceStart;
  //     setCurrentPage((prev) => prev - 1);
  //   }
  // };

  return (
    <div className="container">
     
      <div className="ride-history">
        <h2 className="ride-tracker-title ff-Mabry-Pro-bold">Ride History</h2>
        <section className="filters">
          <div className="search">
            <input
              placeholder="Search by name, username or email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />{" "}
            <Search className="search-icon" />
          </div>{" "}
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              <ListFilter className="icon" /> {selectedFilter}
            </button>

            <ul className={`dropdown-menu ${isOpen ? "open" : ""}`}>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`${selectedFilter === option ? "selected" : ""}`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div>
          {isSearchPending ? (
            <LoaderComp />
          ) : (
            <>
            
            <RidesTable rides={data} />

              {isFetchingNextPage || isFetchingPreviousPage ?  <LoaderComp /> : ""}
            </>
          )}

          <TableFooter
            currentPage={currentPage}
            pageSize={pageSize}
            total={totalRides}
            hasNextPage={hasNextPage || false}
            hasPreviousPage={hasPreviousPage || false}
            fetchNextPage={fetchNextPage}
            fetchPreviousPage={fetchPreviousPage}
            isPending={
              isLoading || isFetchingNextPage || isFetchingPreviousPage
            }
            setSearchValue={setSearchValue}
          />
        </div>
      </div>
    </div>
  );
}
