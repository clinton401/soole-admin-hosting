"use client";
import { FC, useState, useEffect } from "react";
import useInfiniteScroll from "../../../../../hooks/use-infinite-scroll";
import api from "../../../../../config/api";
import TableFooter from "../../../components/TableFooter";
import LoaderComp from "../../../components/LoaderComp";
import ErrorComp from "../../../components/ErrorComp";
import useDebounce from "../../../../../hooks/use-debounce";
import { handleAxiosError } from "../../../../../config/handleAxiosError";
import { useQueryClient } from "@tanstack/react-query";
import SentConvoCard from "../../../components/SentConvoCard";
import { Search } from "lucide-react";
import axios from "axios";
 enum ComplaintSenderType {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface ComplaintMessage {
  id: string;
  createdAt: string;
  conversationId: string;
  senderId: string;
  message: string;
  senderType: ComplaintSenderType;
  userAvatarUrl?: string;
}

type FetchSentMessagesResult = {
  data: ComplaintMessage[];
  nextPage?: number;
  prevPage?: number;
};

const SentPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMessages, setTotalMessages] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [searchError, setSearchError] = useState<null | string>(null);
  const fetchMessages = async ({
    pageParam = 1,
    signal,
  }: {
    pageParam?: number;
    signal?: AbortSignal;
  }): Promise<FetchSentMessagesResult> => {
    try {
      const response = await api.get(`/complaints/reply?page=${pageParam}`, {
        signal,
      });
      const data = response.data.data;
      setTotalMessages(data.totalMessages || 1);
      setCurrentPage(data.currentPage || 1);
      return {
        data: data.messages,
        nextPage: data.nextPage,
        prevPage: data.prevPage,
      };
    } catch (error ) {
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
  } = useInfiniteScroll<ComplaintMessage, FetchSentMessagesResult>(
    ({ pageParam = 1, signal }) => fetchMessages({ pageParam, signal }),
    [`sent-messages`]
  );
  const queryClient = useQueryClient();
  const pageSize = 15;
  const searchForMessage = async () => {
    if (searchValue.length < 1) {
      return;
    }
    try {
      setIsSearchPending(true);
      setSearchError(null);
      const response = await api.get(`/complaints/search/sent?query=${searchValue}`);
      if (response.status === 200 && response.data) {
        

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        queryClient.setQueryData(["sent-messages"], (old: {pageParams: number[],pages: {data: ComplaintMessage[]}[]}) => {
          if (!old) return old;

          return {
            ...old,
            pageParams: [1],
            pages: [
              { data: response.data.data.messages, prevPage: null, nextPage: 2 },
            ],
          };
        });
        setCurrentPage(1);
        setTotalMessages(response.data?.data?.messages?.length || 1)
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      const { message } = handleAxiosError(error);

      setSearchError(message);
      console.error(`Unable to search for sent mail: ${message}`);
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
            queryKey: ["sent-messages"],
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
      <ErrorComp error={error || search_error} refetch={refetchFunc} />
    );
  }
  return (
    <>
      <section className="inbox-search-container">
        <div>
          <input
            placeholder="Search mail"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="search-icon" />
        </div>
      </section>
      {isSearchPending ? (
        <LoaderComp />
      ) : (
        <>
          {data.length > 0 && (
            <section
              className="convo-cards-container"
              id="convo_card_container"
            >
              {data.map((message, index) => {
                return (
                  <SentConvoCard
                    key={`${message.id}${index}`}
                    message={message}
                  />
                );
              })}
            </section>
          )}
          {data.length < 1 &&
            !isFetchingNextPage &&
            !isFetchingPreviousPage && (
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
        total={totalMessages}
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

export default SentPage;
