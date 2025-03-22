"use client"
import { FC, ReactNode, useEffect, useRef, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { AppContext } from "./ContextProvider";
import { Ride } from "../rides/page";
import { User } from "../users/page";
import { ComplaintConversation } from "./InboxConvoParentComp";
import { ComplaintMessage } from "../(message)/inbox/sent/page";
import { InboxCountResponse } from "./InboxSidebar";

const SOCKET_URL = "http://localhost:5000"; 

const SocketUpdate: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, accessToken } = useContext(AppContext);
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!accessToken || !isAuthenticated) return;

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, { transports: ["websocket"], reconnection: true });
    }

    const socket = socketRef.current;

   
    socket.on(
        "complaint",
        (data: {
          message: ComplaintMessage;
          conversation: ComplaintConversation;
        }) => {
          const { message, conversation } = data;
          queryClient.setQueryData(
            ["inbox-count"],
            (old: InboxCountResponse | null) => {
              if (!old) return old;
              return {
                ...old,
                total_count: old.total_count + 1,
              };
            }
          );
          queryClient.setQueryData(
            ["total-conversations"],
            (old: {
              pageParams: number[];
              pages: { data: ComplaintConversation[] }[];
            }) => {
              if (!old) return old;
              return {
                ...old,
                pages: old.pages.map((page, index) => {
                  if (index === 0) {
                    return { ...page, data: [conversation, ...page.data] };
                  }
                  return page;
                }),
              };
            }
          );
          queryClient.setQueryData(
            ["messages", message.conversationId],
            (old: {
              pageParams: number[];
              pages: { data: ComplaintMessage[] }[];
            }) => {
              if (!old) return old;
              return {
                ...old,
                pages: old.pages.map((page: any, index: number) => {
                  if (index === 0) {
                    return { ...page, data: [...page.data, message] };
                  }
                  return page;
                }),
              };
            }
          );
        }
      );
      socket.on("ride", (newRide: Ride) => {
        queryClient.setQueryData(
          ["rides", "all"],
          (old: { pageParams: number[]; pages: { data: Ride[] }[] }) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page, index) => {
                if (index === 0) {
                  return { ...page, data: [newRide, ...page.data] };
                }
                return page;
              }),
            };
          }
        );
        queryClient.setQueryData(
          ["rides", newRide.status.toLowerCase()],
          (old: { pageParams: number[]; pages: { data: Ride[] }[] }) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page, index) => {
                if (index === 0) {
                  return { ...page, data: [newRide, ...page.data] };
                }
                return page;
              }),
            };
          }
        );
      });
      socket.on("user", (newUser: User) => {
        queryClient.setQueryData(
          ["users", "all"],
          (old: { pageParams: number[]; pages: { data: User[] }[] }) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page, index) => {
                if (index === 0) {
                  return { ...page, data: [newUser, ...page.data] };
                }
                return page;
              }),
            };
          }
        );
        queryClient.setQueryData(
          ["users", newUser.status?.toLowerCase()],
          (old: { pageParams: number[]; pages: { data: User[] }[] }) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page, index) => {
                if (index === 0) {
                  return { ...page, data: [newUser, ...page.data] };
                }
                return page;
              }),
            };
          }
        );
      });
  
      socket.on("ride:update", async(updatedRide: Ride) => {
        console.log({updatedRide})
        queryClient.setQueryData(
          ["rides", "all"],
          (old: { pageParams: number[]; pages: { data: Ride[] }[] }) => {
            if (!old) return old;
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                data: page.data.map((ride: Ride) =>
                  ride?.id === updatedRide.id ? updatedRide : ride
                ),
              })),
            };
          }
        );
        // queryClient.setQueryData(
        //   ["rides", updatedRide.status.toLowerCase()],
        //   (old: { pageParams: number[]; pages: { data: Ride[] }[] }) => {
        //     if (!old) return old;
        //     return {
        //       ...old,
        //       pages: old.pages.map((page) => ({
        //         ...page,
        //         data: page.data.map((ride: Ride) =>
        //           ride?.id === updatedRide.id ? updatedRide : ride
        //         ),
        //       })),
        //     };
        //   }
        // );
        
        await queryClient.invalidateQueries(
          {
            queryKey: ["rides", updatedRide.status.toLowerCase()], 
            exact: true,     
            refetchType: 'active', 
          },
          {
            throwOnError: true,  
            cancelRefetch: true,  
          }
        );
      });
  
  

    return () => {
      if (socketRef.current) {
        socketRef.current.off("complaint");
        socketRef.current.off("ride");
        socketRef.current.off("ride:update");
        socketRef.current.off("user");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [accessToken, queryClient, isAuthenticated]);

  return <>{children}</>;
};

export default SocketUpdate;
