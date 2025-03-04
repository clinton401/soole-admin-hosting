import React, { useContext } from "react";
import Image from "next/image";
import { AppContext } from "./ContextProvider";
import { useRouter } from "next/navigation";
import fetchData from "../../../hooks/fetch-data";
import { QueryFunctionContext } from "@tanstack/react-query";
import api from "../../../config/api";
type InboxCountQueryKey = ["inbox-count"];
type InboxCountResponse = {
  total_count: number;
  sent_count: number;
  starred_count: number;
  bin_count: number;
};
const fetchInboxCount = async ({
  queryKey,
  signal,
}: QueryFunctionContext<InboxCountQueryKey>): Promise<InboxCountResponse> => {
  try {
    const response = await api.get(`/complaints/summary`, {
      signal,
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Unknown error occurred");
  }
};

type Props = {
  isVisible?: boolean;
};

const Searchbar = ({ isVisible = true }: Props) => {
  const {
    data: inbox_count,
    error,
    isLoading,
    
  } = fetchData<InboxCountResponse, InboxCountQueryKey>(
    ["inbox-count"],
    fetchInboxCount
  );

  const { user } = useContext(AppContext);
  const { push } = useRouter();
  if (!isVisible) return null;

  return (
    <div className="header-parent" >
      <div className="header ">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>

        {user && (
          <div className="user-settings">
            <div className="notify mx-1"  onClick={() => push("/inbox/all")}>
              <div className="notification">
                {!isLoading &&
                  !error &&
                  inbox_count &&
                  inbox_count.total_count > 0 && (
                    <p className="">{inbox_count.total_count}</p>
                  )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M13.3153 20.029L13.3155 20.029C13.6061 19.9363 13.8685 19.8009 14.0883 19.6317C14.2354 19.5183 14.3611 19.3916 14.4631 19.2551C14.0157 19.2962 13.0736 19.3746 12.3969 19.3746C11.7202 19.3746 10.778 19.2962 10.3306 19.2551C10.4326 19.3915 10.5583 19.5183 10.7056 19.6318L13.3153 20.029ZM13.3153 20.029C13.0248 20.1218 12.7126 20.1697 12.3969 20.1697C12.0811 20.1697 11.769 20.1218 11.4784 20.029L11.4782 20.029M13.3153 20.029L11.4782 20.029M11.4782 20.029C11.1877 19.9363 10.9254 19.801 10.7057 19.6319L11.4782 20.029Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path
                  d="M15.1074 4.30153L15.1074 4.30153L15.2784 4.37747C15.2784 4.37748 15.2784 4.37748 15.2784 4.37748C15.293 4.38395 15.3075 4.39048 15.322 4.39707C14.541 5.03091 14.0416 5.9984 14.0416 7.08335C14.0416 8.99334 15.59 10.5417 17.5 10.5417C17.7291 10.5417 17.9533 10.5193 18.1704 10.4766C18.2563 11.1634 18.4542 11.834 18.7579 12.4633C18.7579 12.4633 18.7579 12.4634 18.7579 12.4634L18.979 12.9218L18.979 12.9218C19.7644 14.5497 18.7608 16.5053 16.8419 16.8463C16.8419 16.8463 16.8418 16.8463 16.8418 16.8464L16.7081 16.8701L16.7079 16.8701C13.8572 17.3766 10.9339 17.3766 8.0832 16.8701L8.08318 16.8701C6.15043 16.5268 5.19669 14.5089 6.09055 12.9207L6.27971 12.5847L6.27975 12.5846C6.80937 11.6436 7.08775 10.5885 7.08775 9.51493V8.45357C7.08775 6.73922 8.09752 5.1544 9.72444 4.37616L9.72445 4.37616C11.4131 3.56838 13.3946 3.54072 15.1074 4.30153Z"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <Image
              className="user-img"
              width={40}
              height={40}
              src={user?.avatarUrl || "/Default-Img.jpg"}

              alt=""
            />
            <div className="user-details">
              <div
                className="user-name ff-Mabry-Pro-semibold fs-16"
                style={{ width: "140px" }}
              >
                {user.name || "User"}
              </div>
              <div
                className="user-name ff-Mabry-Pro-semibold fs-16 card-title"
                style={{ color: "#" }}
              >
                {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
