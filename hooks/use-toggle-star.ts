import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/api"

const useToggleStar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      convoId,
      value,
    }: {
      convoId: string;
      value: boolean;
    }) => {
        try {
     await api.patch(`/complaints/${convoId}/star`, {starred: value});
      
       return {convoId, value}
        } catch (error: any) {
          throw new Error(error.response?.data?.error || `Failed to ${value ? "star": "unstar"} conversation`);
        }

    },
    onMutate: async ({ convoId, value }) => {
      await queryClient.cancelQueries({ queryKey: ["inbox-count"], exact: true });
      await queryClient.cancelQueries({ queryKey: ["starred-conversations"], exact: true });
      await queryClient.cancelQueries({ queryKey: ["total-conversations"], exact: true });
      

      const previousInboxCount = queryClient.getQueryData(["inbox-count"]);
      const previousStarredConvos = queryClient.getQueryData(["starred-conversations"]);
      const previousTotalConvos = queryClient.getQueryData(["total-conversations"]);

      queryClient.setQueryData(["inbox-count"], (old: any) => {
        
         if(!old) return old;
         return {
            ...old,
            starred_count: old.starred_count + (value ? 1 : -1)
         }
      })
      queryClient.setQueryData(["total-conversations"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((convo: any) =>
              convo?.id === convoId
                ? { ...convo, starred: value }
                : convo
            ),
          })),
        };
      });
queryClient.setQueryData(["starred-conversations"], (old: any) => {
    if (!old) return old;
    return {
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((convo: any) => convo.id !== convoId),
        })),
      };
})
    

      return { previousInboxCount, previousStarredConvos, previousTotalConvos };
    },
    onError: (err, variables, context) => {
      if (context?.previousInboxCount) {
        queryClient.setQueryData(["inbox-count"], context.previousInboxCount);
      }
      if (context?.previousStarredConvos) {
        queryClient.setQueryData(["starred-conversations"], context.previousStarredConvos);
      }
      if (context?.previousTotalConvos) {
        queryClient.setQueryData(
          ["total-conversations"],
          context.previousTotalConvos
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
          queryKey: ["total-conversations"],
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
          queryKey: ["starred-conversations"],
          exact: true,
          refetchType: "active",
        },
        {
          throwOnError: true,
          cancelRefetch: true,
        }
      );
    },
  });
};

export default useToggleStar;
