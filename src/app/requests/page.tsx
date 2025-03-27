"use client";

import {FC, useEffect} from "react";
import { Request, RequestCard } from "../components/RequestCard";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";
import api from "../../../config/api";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import LoaderComp from "../components/LoaderComp";
import ErrorComp from "../components/ErrorComp";
import { useInView } from "react-intersection-observer";

type FetchRequestsResult = {
    data: Request[];
    nextPage?: number;
  };
const RequestsPage: FC = () => {
    const fetchAdminRequests = async ({
        pageParam = 1,
        signal,
      }: {
        pageParam: number;
        signal: AbortSignal;
      }): Promise<FetchRequestsResult> => {
        try {
          const response = await api.get(`/requests?page=${pageParam}`, {
            signal,
          });
    
          const data = response.data.data;
          return {
            data: data.requests,
            nextPage: data.nextPage,
            // prevPage: data.prevPage,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(
              error.response?.data?.error || "Unknown error occurred"
            );
          } else {
            throw new Error("An unexpected error occurred");
          }
        }
      };
      const {
        data: requests,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
        refetch,
      } = useInfiniteScroll<Request, FetchRequestsResult>(
        ({ pageParam = 1, signal }) => fetchAdminRequests({ pageParam, signal }),
        ["admin-requests"]
      );

      const queryClient = useQueryClient();
      const { ref, inView } = useInView();

      useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }, [fetchNextPage, inView, isFetchingNextPage, hasNextPage]);
      if (isLoading) {
        return (
          <div className="container">
            <LoaderComp />
          </div>
        );
      }
      if (error || !requests) {
        return (
          <div className="container">
            <ErrorComp error={error} refetch={refetch} />
          </div>
        );
      }
    

    return (
        <div className="wrapper-container">
      <section className="request-header">
        <h1>Admin Requests</h1>
        <p>Review and manage user registration requests</p>
      </section>

      {requests.length < 1 ? (
        <div className="empty-state">
          <p>No pending requests</p>
        </div>
      ) : (
        <div className="cards-grid">
          {requests.map((request) => (
           <RequestCard request={request} key={request.id} />
          ))}
        </div>
      )}
      {isFetchingNextPage && <LoaderComp />}
      <section ref={ref} className=""></section>
    </div>
    )
}

export default RequestsPage