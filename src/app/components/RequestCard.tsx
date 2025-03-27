import { FC, useState } from "react";
import api from "../../../config/api";
import LoaderComp from "../components/LoaderComp";
import { handleAxiosError } from "../../../config/handleAxiosError";
import showToast from "../../../hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {Loader} from "lucide-react"

export type Request = {
  id: string;
  createdAt: string;
  phone: string;
  name: string;
  workEmail: string;
  personalEmail: string;
  adminViewable: boolean;
};
export const RequestCard: FC<{ request: Request }> = ({ request }) => {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient()

  const handleRequest = async (value: "accept" | "reject") => {
    if (isPending) return;
    try {
      setIsPending(true);
      const url = `/requests/${request.id}/${value}`;
      const response = await api.put(url);
       queryClient.setQueryData(["admin-requests"], (old: {pageParams: number[],pages: {data: Request[]}[]}) => {
                  if (!old) return old;
                
                
                  return {
                    ...(old),
                    pages: (old).pages.map((page) => ({
                      ...page,
                      data: page.data.filter((validRequest) => 
                        validRequest.id !== request.id 
                      ),
                    })),
                  };
                });
                queryClient.setQueryData(
                    ["request-count"],
                    (old: {totalLength : number} | null) => {
                      if (!old || old.totalLength < 1) return old;
                      return {
                        ...old,
                        totalLength: old.totalLength - 1,
                      };
                    }
                  );
                  showToast(
                    response.data.message ||
                      `Admin request ${value === "accept" ? "approved" : "rejected"} successfully`,
                    "success"
                  );
    } catch (error) {
      console.error(`Unable to handle admin request: ${error}`);
      const { message } = handleAxiosError(error);
      showToast(message, "error");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="request-card" key={request.workEmail}>
      <div className="request-card-header">
        <h2 className="request-name">{request.name}</h2>
      </div>
      <div className="request-card-content">
        <div className="request-detail">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{request.phone}</span>
        </div>
        <div className="request-detail">
          <span className="detail-label">Work Email:</span>
          <span className="detail-value">{request.workEmail}</span>
        </div>
        <div className="request-detail">
          <span className="detail-label">Personal Email:</span>
          <span className="detail-value">{request.personalEmail}</span>
        </div>
      </div>
      {isPending ? <LoaderComp /> : (
          <div className="request-card-actions">
          <button
            className="approve-button"
            onClick={() => handleRequest("accept")}
          >
            Approve
          </button>
          <button
            className="reject-button"
            onClick={() => handleRequest("reject")}
          >
            Reject
          </button>
        </div>
      ) }
    
    </div>
  );
};
