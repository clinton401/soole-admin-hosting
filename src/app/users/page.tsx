"use client";
import React, { FC, useEffect, useState } from "react";
import { ListFilter, Search } from "lucide-react";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";
import api from "../../../config/api";
import TableFooter from "../components/TableFooter";
import LoaderComp from "../components/LoaderComp";
import ErrorComp from "../components/ErrorComp";
import useDebounce from "../../../hooks/use-debounce";
import { handleAxiosError } from "../../../config/handleAxiosError";
import { useQueryClient } from "@tanstack/react-query";
import UsersTable from "../components/UsersTable";
import useCloseOnEscKey from "../../../hooks/use-close-on-esc-key";
import axios from "axios";
 enum UserStatus {
  SUSPENDED = "SUSPENDED",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DEACTIVATED = "DEACTIVATED",
}
export interface User {
  id: string;
  createdAt: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  isNumberVerified: boolean;
  avatarUrl?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  dob?: string;
  bio?: string;
  username?: string;
  dayOfCreation: string;
  weekOfCreation: string;
  // avatarPublicId?: string;
  email?: string;
  totalTrips: number;
  status: UserStatus;
  totalRides: number;
  analyticsDate: string;
}

type FilterOption =
  | "All"
  | "Active"
  | "Inactive"
  | "Suspended"
  | "Deactivated";
type FetchUsersResult = {
  data: User[];
  nextPage?: number;
  prevPage?: number;
};
const UsersPage: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");
  const [searchValue, setSearchValue] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [searchError, setSearchError] = useState<null | string>(null);
  const fetchUsers = async ({
    pageParam = 1,
    signal,
  }: {
    pageParam?: number;
    signal?: AbortSignal;
  }): Promise<FetchUsersResult> => {
    try {
      const response = await api.get(
        `/users?page=${pageParam}&filter=${selectedFilter}`,
        {
          signal,
        }
      );
      const data = response.data.data;
      queryClient.setQueryData(["users", "currentPage", selectedFilter.toLowerCase()], data.currentPage || 1);
      queryClient.setQueryData(["users", "totalUsers", selectedFilter.toLowerCase()], data.totalUsers || 1);
      return {
        data: data.users,
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
  } = useInfiniteScroll<User, FetchUsersResult>(
    ({ pageParam = 1, signal }) => fetchUsers({ pageParam, signal }),
    ["users", selectedFilter.toLowerCase()]
  );
  // console.log({ data, isLoading, error, hasPreviousPage, currentPage });
  const queryClient = useQueryClient();
  const {isOpen, setIsOpen} = useCloseOnEscKey();
  const currentPage: number = queryClient.getQueryData(["users", "currentPage", selectedFilter.toLowerCase()]) ?? 1;
  const totalUsers: number = queryClient.getQueryData(["users", "totalUsers", selectedFilter.toLowerCase()]) ?? 1;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: FilterOption) => {
    setSelectedFilter(option);
    setIsOpen(false);
    setSearchValue("");
    queryClient.setQueryData(["users", "currentPage", selectedFilter.toLowerCase()], () => {
      return 1
    });
  };

  const options: FilterOption[] = [
    "All",
    "Active",
    "Inactive",
    "Suspended",
    "Deactivated",
  ];
  const pageSize = 15;

  const searchForUsers = async () => {
    if (searchValue.length < 1) {
      return;
    }
    try {
      setIsSearchPending(true);
      setSearchError(null);
      const response = await api.get(
        `/users/search?query=${searchValue}&filter=${selectedFilter}`
      );
      if (response.status === 200 && response.data) {
        // console.log(response.data.data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData(["users", selectedFilter.toLowerCase()], (old: {pageParams: number[],pages: {data: User[]}[]}) => {
          if (!old) return old;

          return {
            ...(old),
            pageParams: [1],
            pages: [
              { data: response.data.data.users, prevPage: null, nextPage: 2 },
            ],
          };
        });
        queryClient.setQueryData(["users", "currentPage", selectedFilter.toLowerCase()], () => {
          return 1
        });
        queryClient.setQueryData(["users", "totalUsers", selectedFilter.toLowerCase()], () => {
          return response.data?.data?.users?.length || 1
        });
        
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);

      setSearchError(message);
      console.error(`Unable to search for users: ${message}`);
    } finally {
      setIsSearchPending(false);
    }
  };
  const debouncedData = useDebounce(searchForUsers);
  useEffect(() => {
    if (searchValue.length > 0) {
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
            queryKey: ["users", selectedFilter.toLowerCase()], 
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

  return (
    <div className="container">
      <div className="ride-history">
        <h2 className="ride-tracker-title ff-Mabry-Pro-bold">User Management</h2>
        <section className="filters">
          <div className="search">
            <input
              placeholder="Search by name, username or email"
              value={searchValue}
              onChange={async(e) => {
                const value = e.target.value
                setSearchValue(value);
                if(value.length < 1){
                  await queryClient.invalidateQueries(
                    {
                      queryKey: ["users", selectedFilter.toLowerCase()], 
                      exact: true,     
                      refetchType: 'active', 
                    },
                    {
                      throwOnError: true,  
                      cancelRefetch: true,  
                    }
                  );
                }
              }}
            />{" "}
            <Search className="search-icon" />
          </div>{" "}
          <div className="dropdown">
            <button className="dropdown-btn" onClick={toggleDropdown}>
              <ListFilter className="icon" />
              Filter
               {/* {selectedFilter} */}
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
              <UsersTable users={data} selectedFilter={selectedFilter}/>

              {isFetchingNextPage || isFetchingPreviousPage ? (
                <LoaderComp />
              ) : (
                ""
              )}
            </>
          )}

          <TableFooter
            currentPage={currentPage}
            pageSize={pageSize}
            total={totalUsers}
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
};

export default UsersPage;
