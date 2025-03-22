"use client";
import { FC, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, Send, Loader } from "lucide-react";
import { MdDelete } from "react-icons/md";
import { ComplaintConversation, ComplaintStatus } from "./InboxConvoParentComp";
import useInfiniteScroll from "../../../hooks/use-infinite-scroll";
import api from "../../../config/api";
import { useQueryClient } from "@tanstack/react-query";
import {
  ComplaintMessage,
  
} from "../(message)/inbox/sent/page";
import LoaderComp from "./LoaderComp";
import ErrorComp from "./ErrorComp";
import useToggleStar from "../../../hooks/use-toggle-star";
import { CiStar } from "react-icons/ci";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import showToast from "../../../hooks/use-toast";
import Image from "next/image";
import { formatDate } from "../../../lib/utils";
import useSendMessage from "../../../hooks/use-send-message";
import { handleAxiosError } from "../../../config/handleAxiosError";
import useCloseOnEscKey from "../../../hooks/use-close-on-esc-key";
import AlertDialog from "./AlertDialog";
type FetchConversationMessagesResult = {
  data: ComplaintMessage[];
  nextPage?: number;
  prevPage?: number;
};
enum ComplaintSenderType {
  USER = "USER",
  ADMIN = "ADMIN",
}

const InboxChat: FC = () => {
  
const [isMarkPending, setIsMarkPending] = useState(false);
const [isDeletePending, setIsDeletePending] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalMessages, setTotalMessages] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const { id } = useParams();
  const { isOpen, setIsOpen } = useCloseOnEscKey(true);
  const fetchConversationMessages = async ({
    pageParam = 1,
    signal,
  }: {
    pageParam?: number;
    signal?: AbortSignal;
  }): Promise<FetchConversationMessagesResult> => {
    try {
      const response = await api.get(
        `/complaints/${id}/messages?page=${pageParam}`,
        {
          signal,
        }
      );
      const data = response.data.data;
      // setTotalMessages(data.totalMessages || 1);
      // setCurrentPage(data.currentPage || 1);
      // setConversation(data.conversation || null);
      queryClient.setQueryData(["conversation", id], data.conversation || null);
      return {
        data: data.messages,
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
    data: messages,
    isLoading,
    error,
    refetch,
  } = useInfiniteScroll<ComplaintMessage, FetchConversationMessagesResult>(
    ({ pageParam = 1, signal }) =>
      fetchConversationMessages({ pageParam, signal }),
    [`messages`, id as string]
  );

  const queryClient = useQueryClient();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { back, push } = useRouter();
  const conversation: ComplaintConversation | null | undefined = queryClient.getQueryData(["conversation", id as string]);


  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        100
      )}px`;
    }
  };

  const { mutate: toggleStar } = useToggleStar();
  const { mutate: sendMessage } = useSendMessage();

  if (isLoading) {
    return <LoaderComp />;
  }


  if (error || !messages || !conversation) {
    return <ErrorComp error={error} refetch={refetch} />;
  }

  const handleStar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const starred = conversation.starred; 

    queryClient.setQueryData(["conversation", id], (prev: any) => {
      if (!prev) return null;
      return { ...prev, starred: !starred };
    });

    toggleStar(
      {
        convoId: conversation.id,
        value: !starred, 
      },
      {
        onError: (error) => {
          console.error("Error toggling star:", error);
          queryClient.setQueryData(["conversation", id], (prev: any) => {
            if (!prev) return null;
            return { ...prev, starred: starred };
          });

          showToast(
            error?.message ||
              `Unable to ${starred ? "unstar" : "star"} conversation`,
            "error"
          );
        },
      }
    );
  };

  const handleMessageSending = () => {
    if (inputValue.length < 2) return;
    sendMessage(
      {
        convoId: conversation.id,
        message: inputValue,
      },
      {
        onError: (error) => {
          console.error("Error sending message:", error);
          showToast(error?.message || `Unable to  send message `, "error");
        },
      }
    );
    setInputValue("");
    const div = scrollRef.current;
    if (div) {
      setTimeout(() => {
        div.scrollTop = div.scrollHeight;
      }, 500);
    }
  };
  const backHandler = () => {
    if (window.history.length > 1) {
      back();
    } else {
      push("/inbox/all");
    }
  };

  const markAsCompleted = async () => {
    if (isMarkPending) return;
    if (conversation.status === ComplaintStatus.RESOLVED) {
      showToast(
        "This conversation has already been marked as resolved.",
        "error"
      );
      return;
    }
    try {
      setIsMarkPending(true);
      const response = await api.patch(`/complaints/${id}/resolve`);
await Promise.all([
  queryClient.invalidateQueries(
    {
      queryKey: [`messages`, id as string],
      exact: true,
      refetchType: "active",
    },
    {
      throwOnError: true,
      cancelRefetch: true,
    }
  ),
   queryClient.invalidateQueries(
    {
      queryKey: ["total-conversations"],
      exact: true,
      refetchType: "active",
    },
    {
      throwOnError: true,
      cancelRefetch: true,
    }
  ),
   queryClient.invalidateQueries(
    {
      queryKey: ["inbox-count"],
      exact: true,
      refetchType: "active",
    },
    {
      throwOnError: true,
      cancelRefetch: true,
    }
  )
])
       

      showToast(response.data?.message || "Conversation marked as resolved successfully", "success")
    } catch (error) {
      console.error(`Unable to mark conversation as resolved: ${error}`);
      const { message } = handleAxiosError(error);
      showToast(message, "error");
    } finally {
      setIsMarkPending(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConversationDeletion = async () => {
    try {
      setIsDeletePending(true);
      const isDeleted = conversation.isDeleted;
      const method = isDeleted ? "delete" : "patch";
      // const queryIds = toBeDeleted.join(","); 
      const endpoint = `/complaints/bin?ids=${id}`;

      const response = await api[method](endpoint, {
        complaintIds: [id],
      });

      if (response.status === 200 && response.data) {
        // const types = ["total", ]
        if(!isDeleted){
        await queryClient.invalidateQueries(
          {
            queryKey: [`messages`, id as string],
            exact: true,
            refetchType: "active",
          },
          {
            throwOnError: true,
            cancelRefetch: true,
          }
        )}
       
        await queryClient.invalidateQueries(
          {
            queryKey: ["inbox-count"],
            exact: true,
            refetchType: "active",
          },
          {
            throwOnError: true,
            cancelRefetch: true,
          }
        );
        const types = ["total", "bin", "starred"];
        for (const type of types) {
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
        }
  
        showToast(
          response.data.message || `Conversations deleted successfully`,
          "success"
        );
       if(isDeleted){
backHandler()
       }
   
       
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(`Unable to delete conversation: ${error}`);
      const { message } = handleAxiosError(error);
      showToast(message, "error");
    } finally {
      setIsDeletePending(false);
    }
  };
  return (
    <div className="chat-container">
      <div className="chat-navbar">
        <div className="back-name">
          <button onClick={backHandler}>
            <ChevronLeft size={14} />
          </button>
          <h3 className="truncate">{conversation?.userName || "User"}</h3>
        </div>
        <div className="more-options">
          {!conversation.isDeleted && (
            <>
              {conversation.status !== ComplaintStatus.RESOLVED && (
                <>
                  <button
                    className="check-button"
                    disabled={isMarkPending}
                    onClick={markAsCompleted}
                  >
                    {isMarkPending ? (
                      <Loader className="custom-loader dark-btn" />
                    ) : (
                      <Check className="check" />
                    )}

                    <span className="tooltip">Mark as resolved</span>
                  </button>
                </>
              )}

              <button onClick={handleStar}>
                {conversation.starred ? (
                  <FaStar className="starred" />
                ) : (
                  <CiStar className="star" />
                )}
              </button>
            </>
          )}

          <button onClick={()=> setIsOpen(true)} disabled={isDeletePending}>
            {isDeletePending ?  <Loader className="custom-loader dark-btn" /> :   <MdDelete />}
           
          </button>
        </div>
      </div>

      <div className="chat-content" ref={scrollRef}>
        {messages.map((message) => {
          const isUser = message.senderType === ComplaintSenderType.USER;
          const createdAt = new Date(message.createdAt);

          return (
            <div
              className={`message-parent ${isUser ? "user" : "admin"}`}
              key={message.id}
            >
              {isUser && (
                <Image
                  className="user-img"
                  width={40}
                  height={40}
                  objectFit="cover"
                  src={message?.userAvatarUrl || "/profilePic.png"}
                  alt=""
                />
              )}
              <div className="message-content">
                <p className="message">{message.message}</p>
                <p className="message-time">{formatDate(createdAt, false)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        {conversation.isDeleted ? (
          <p className="deleted-convo">
            This conversation has been moved to the bin. You can view messages
            but cannot reply.
          </p>
        ) : (
          <div className="reply-container">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInput}
              placeholder="Write message..."
              className="reply-input"
              spellCheck={false}
            />
            <button
              className="send-button"
              disabled={inputValue.length < 2}
              onClick={handleMessageSending}
            >
              {" "}
              Send <Send size={14} />
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <AlertDialog
          closeModal={closeModal}
          confirmHandler={handleConversationDeletion}
        >
          Delete conversation
        </AlertDialog>
      )}
    </div>
  );
};

export default InboxChat;
