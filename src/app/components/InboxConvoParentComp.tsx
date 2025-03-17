"use client";
import { FC, useState, useEffect, useContext } from "react";
import { InboxContext, InboxFilter } from "./InboxSidebar";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";
import api from "../../../config/api";
import TableFooter from "./TableFooter";
import LoaderComp from "./LoaderComp";
import ErrorComp from "./ErrorComp";
import useDebounce from "../../../hooks/use-debounce";
import { handleAxiosError } from "../../../config/handleAxiosError";
import { useQueryClient } from "@tanstack/react-query";
import InboxConvoSearch from "./InboxConvoSearch";
import ConvoCard from "./ConvoCard";
import axios from "axios";

export enum ComplaintStatus {
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
}

export interface ComplaintConversation {
  id: string;
  createdAt: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: ComplaintStatus;
  complaint: string;
  starred: boolean;
  adminViewable: boolean;
  isDeleted: boolean;
}

type FetchConversationsResult = {
  data: ComplaintConversation[];
  nextPage?: number;
  prevPage?: number;
};

const InboxConvoParentComp: FC<{ type: "total" | "bin" | "starred" }> = ({
  type,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalConversations, setTotalConversations] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [searchError, setSearchError] = useState<null | string>(null);
  const [toBeDeleted, setToBeDeleted] = useState<string[]>([]);
  const fetchConversations = async ({
    pageParam = 1,
    signal,
  }: {
    pageParam?: number;
    signal?: AbortSignal;
  }): Promise<FetchConversationsResult> => {
    try {
      const response = await api.get(
        `/complaints?page=${pageParam}&filter=${type}`,
        {
          signal,
        }
      );
      const data = response.data.data;
      setTotalConversations(data.totalConversations || 1);
      setCurrentPage(data.currentPage || 1);
      return {
        data: data.conversations,
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
  } = useInfiniteScroll<ComplaintConversation, FetchConversationsResult>(
    ({ pageParam = 1, signal }) => fetchConversations({ pageParam, signal }),
    [`${type}-conversations`]
  );
  const {filter} = useContext(InboxContext);
  const queryClient = useQueryClient();
  const pageSize = 15;

  const searchForMessage = async () => {
    if (searchValue.length < 1) {
      return;
    }
    try {
      setIsSearchPending(true);
      setSearchError(null);
      const response = await api.get(`/complaints/search?query=${searchValue}`);
      if (response.status === 200 && response.data) {
        // console.log(response.data.data);
        queryClient.setQueryData([`${type}-conversations`], (old) => {
          if (!old) return old;

          return {
            ...old,
            pageParams: [1],
            pages: [
              { data: response.data.data.conversations, prevPage: null, nextPage: 2 },
            ],
          };
        });
        setCurrentPage(1);
        setTotalConversations(response.data?.data?.conversations?.length || 1)
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);

      setSearchError(message);
      console.error(`Unable to search for mail: ${message}`);
    } finally {
      setIsSearchPending(false);
    }
  };
  const debouncedData = useDebounce(searchForMessage);
  useEffect(() => {
    if (searchValue.length > 1) {
      debouncedData();
    }
  }, [searchValue]);

  if (isLoading) {
    return (
      //   <div className="container">
      <LoaderComp />
      //   </div>
    );
  }

  if (error || searchError || !data) {
    const search_error = searchError ? new Error(searchError) : null;
    const refetchFunc = async () => {
      if (searchError) {
        await queryClient.invalidateQueries(
          {
            queryKey: [`${type}-conversations`],
            exact: true,
            refetchType: "active",
          },
          {
            throwOnError: true,
            cancelRefetch: true,
          }
        );
        setSearchError(null);
      } else {
        refetch();
      }
      setSearchValue("");
    };
    return (
      //   <div className="container">
      <ErrorComp error={error || search_error} refetch={refetchFunc} />
      //   </div>
    );
  }



  const getFilteredConversations = () => {
    switch (filter) {
      case InboxFilter.resolved:
        return data.filter(convo => convo.status === ComplaintStatus.RESOLVED);
      case InboxFilter.unresolved:
        return data.filter(convo => convo.status === ComplaintStatus.IN_PROGRESS);
      default:
        return data;
    }
    }

    const conversations = getFilteredConversations();

  return (
    <>
      <InboxConvoSearch
        type={type}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        toBeDeleted={toBeDeleted}
      />
      {isSearchPending ? (
        <LoaderComp />
      ) : (
        <>
          {conversations.length > 0 && (
            <section className="convo-cards-container" id="convo_card_container">
              {conversations.map((convo, index) => {
                return (
                  <ConvoCard
                  type={type}
                    key={`${convo.id}${index}`}
                    conversation={convo}
                    setToBeDeleted={setToBeDeleted}
                    toBeDeleted={toBeDeleted}
                  />
                );
              })}
            </section>
          ) }
          {conversations.length < 1 &&  !isFetchingNextPage && !isFetchingPreviousPage  && (
            <p className="no-data">
              No results found. Try a different search term.
            </p>
          )}
        </>
      )}

      {isFetchingNextPage || isFetchingPreviousPage ? <LoaderComp /> : ""}
      <TableFooter
        currentPage={currentPage}
        pageSize={pageSize}
        total={totalConversations}
        hasNextPage={hasNextPage || false}
        hasPreviousPage={hasPreviousPage || false}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        isPending={isLoading || isFetchingNextPage || isFetchingPreviousPage}
        setSearchValue={setSearchValue}
      />
    </>
  );
};

export default InboxConvoParentComp;
