"use client";
import { FC, ReactNode, useState, createContext } from "react";
import { Inbox, Star, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import fetchData from "../../../hooks/fetch-data";
import { QueryFunctionContext } from "@tanstack/react-query";
import api from "../../../config/api";
import LoaderComp from "../components/LoaderComp";
import ErrorComp from "../components/ErrorComp";
import axios from "axios";
type InboxCountQueryKey = ["inbox-count"];
type InboxCountResponse = {
  total_count: number;
  sent_count: number;
  starred_count: number;
  bin_count: number;
};
const fetchInboxCount = async ({

  signal,
}: QueryFunctionContext<InboxCountQueryKey>): Promise<InboxCountResponse> => {
  try {
    const response = await api.get(`/complaints/summary`, {
      signal,
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Unknown error occurred");
  } else {
      throw new Error("An unexpected error occurred");
  }
  }
};
export enum InboxFilter {
  all = "all",
  resolved = "resolved",
  unresolved = "unresolved",
}
type InboxContextProps = {
  filter: InboxFilter;
};
export const InboxContext = createContext<InboxContextProps>({
  filter: InboxFilter.all,
});
const InboxSidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<InboxFilter>(InboxFilter.all);
  const {
    data: inbox_count,
    error,
    isLoading,
    refetch,
  } = fetchData<InboxCountResponse, InboxCountQueryKey>(
    ["inbox-count"],
    fetchInboxCount
  );

  const pathname = usePathname();

  const links = [
    {
      name: "All Inbox",
      icon: <Inbox className="inbox-sidebar-icon" />,
      url: "/inbox/all",
      type: "total_count",
    },
    {
      name: "Starred",
      icon: <Star className="inbox-sidebar-icon" />,
      url: "/inbox/starred",
      type: "starred_count",
    },
    {
      name: "Sent",
      icon: <Send className="inbox-sidebar-icon" />,
      url: "/inbox/sent",
      type: "sent_count",
    },
    {
      name: "Bin",
      icon: <Trash2 className="inbox-sidebar-icon" />,
      url: "/inbox/bin",
      type: "bin_count",
    },
  ];
const values = {
  filter
}
  return (
    <InboxContext.Provider value={values}>
      <aside className="inbox-sidebar">
        {isLoading ? <LoaderComp /> : <>
        
        {error || !inbox_count ?  <ErrorComp error={error} refetch={refetch} /> : <>
        <h4>Customer tickets</h4>
            <ul>
              {links.map((link) => {
                const count =
                  inbox_count[link.type as keyof InboxCountResponse];
                return (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className={`inbox-sidebar-link ${
                        pathname.startsWith(link.url) ? "active" : ""
                      }`}
                    >
                      <span>
                        {link.icon} {link.name}
                      </span>{" "}
                      {count && (
                        <span className="message-count">
                          {count <= 9 ? count : "9+"}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="labels">
              <h4>Label</h4>
              <div>
                <label>
                  <input
                    type="radio"
                    value="all"
                    checked={filter === InboxFilter.all}
                    onChange={() => setFilter(InboxFilter.all)}
                  />
                  All
                </label>
                <label>
                  <input
                    type="radio"
                    value="resolved"
                    checked={filter === InboxFilter.resolved}
                    onChange={() => setFilter(InboxFilter.resolved)}
                  />
                  Resolved
                </label>

                <label>
                  <input
                    type="radio"
                    value="unresolved"
                    checked={filter === InboxFilter.unresolved}
                    onChange={() => setFilter(InboxFilter.unresolved)}
                  />
                  Unresolved
                </label>
              </div>
            </div></>}
        </>}
        
     
         
      </aside>
      <div className="convo-container">{children}</div>
    </InboxContext.Provider>
  );
};

export default InboxSidebar;
