"use client";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, 
        cacheTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
      } as any,
    },
  });
  

 const TanstackQueryClient: FC<{ children: ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryClient;
