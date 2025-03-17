import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";
import { v4 as uuidv4 } from 'uuid';
// import {ComplaintSenderType} from "../src/app/(message)/inbox/sent/page"

enum ComplaintSenderType {
  USER = "USER",
  ADMIN = "ADMIN",
}
const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      convoId,
      message,
    }: {
      convoId: string;
      message: string;
    }) => {
        try {
     await api.post(`/complaints/${convoId}/reply`, {message});
      
       return {convoId, message}
        } catch (error: any) {
          throw new Error(error.response?.data?.error || `Failed to send message`);
        }

    },
    onMutate: async ({ convoId, message }) => {
      await queryClient.cancelQueries({ queryKey: ["inbox-count"], exact: true });
      await queryClient.cancelQueries({ queryKey: ["sent-messages"], exact: true });
      await queryClient.cancelQueries({ queryKey: ["messages", convoId], exact: true });
      

      const previousInboxCount = queryClient.getQueryData(["inbox-count"]);
      const previousSentMessages = queryClient.getQueryData(["sent-messages"]);
      const previousConvoMessages = queryClient.getQueryData(["messages", convoId]);

      queryClient.setQueryData(["inbox-count"], (old: any) => {
        
         if(!old) return old;
         return {
            ...old,
            sent_count: old.sent_count + 1
         }
      });
      const date = new Date().toISOString();
      const newData = {
        message,
        conversationId: convoId,
        id: uuidv4(),
        senderId: uuidv4(),
        senderType: ComplaintSenderType.ADMIN,
        createdAt: date
      }
      queryClient.setQueryData(["sent-messages"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: [newData, ...page.data]
          })),
        };
      });
queryClient.setQueryData(["messages", convoId], (old: any) => {
    if (!old) return old;
    return {
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: [...page.data, newData]
        })),
      };
})
    

      return { previousInboxCount, previousSentMessages, previousConvoMessages };
    },
    onError: (err, variables, context) => {
      if (context?.previousInboxCount) {
        queryClient.setQueryData(["inbox-count"], context.previousInboxCount);
      }
      if (context?.previousSentMessages) {
        queryClient.setQueryData(["sent-messages"], context.previousSentMessages);
      }
      if (context?.previousConvoMessages &&  variables?.convoId) {
        queryClient.setQueryData(
            ["messages", variables.convoId],
          context.previousConvoMessages
        );
      }
    },
    onSettled: async (data, error, variables) => {
    //   if (!error) return;

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
if(variables?.convoId){
      await queryClient.invalidateQueries(
        {
          queryKey:  ["messages", variables.convoId],
          exact: true,
          refetchType: "active",
        },
        {
          throwOnError: true,
          cancelRefetch: true,
        }
      );
    }
    },
  });
};

export default useSendMessage;
