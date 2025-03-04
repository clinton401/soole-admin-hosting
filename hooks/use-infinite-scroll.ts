import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

interface InfiniteScrollResult<TData> {
  data: TData[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchPreviousPage: () => void;
  hasPreviousPage: boolean | undefined;
  isFetchingPreviousPage: boolean;
  isFetching: boolean;
  refetch: (data?: any) => void;
  isFetched: boolean;
}

/**
* useInfiniteScroll
* A reusable hook for infinite scrolling with React Query.
*
* @template TData - Type of individual items in the data array.
* @template TQueryFnData - Type of the API response.
*/
const useInfiniteScroll = <TData, TQueryFnData extends { nextPage?: number; prevPage?: number }>(
  fetchFn: ({
      pageParam,
      signal,
  }: {
      pageParam?: number;
      signal: AbortSignal;
  }) => Promise<TQueryFnData>,
  queryKey: string[],
  options?: UseInfiniteQueryOptions<TQueryFnData, Error, TQueryFnData>
): InfiniteScrollResult<TData> => {
  const {
      data,
      isLoading,
      isError,
      error,
      isFetching,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      fetchPreviousPage,
      hasPreviousPage,
      isFetchingPreviousPage,
      refetch,
      isFetched
  }: UseInfiniteQueryResult<TQueryFnData, Error> = useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1, signal }) => {
          return fetchFn({
              pageParam: pageParam as number,
              signal,
          });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? null,
      getPreviousPageParam: (firstPage) => {
        return firstPage?.prevPage && firstPage.prevPage > 0 ? firstPage.prevPage : undefined;
      },


    
      ...options,
  });

  const newData = data as { pages: any } | undefined;

  // Flatten paginated data
  const flatData: TData[] = newData?.pages.flatMap((page: any) => page.data) || [];

  return {
      data: flatData,
      isLoading,
      isError,
      error: error || null,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      fetchPreviousPage, 
      hasPreviousPage, 
      isFetchingPreviousPage, 
      refetch,
      isFetching,
      isFetched
  };
};

export default useInfiniteScroll;
