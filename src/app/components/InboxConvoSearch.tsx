import { FC, Dispatch, SetStateAction, useState } from "react";
import { Search, Trash2, Loader } from "lucide-react";
import useCloseOnEscKey from "../../../hooks/use-close-on-esc-key";
import AlertDialog from "./AlertDialog";
import { handleAxiosError } from "../../../config/handleAxiosError";
import showToast from "../../../hooks/use-toast";
import api from "../../../config/api";
import { useQueryClient } from "@tanstack/react-query";

const InboxConvoSearch: FC<{
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  toBeDeleted: string[];
  type: "total" | "bin" | "starred";
}> = ({ searchValue, setSearchValue, toBeDeleted, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, setIsOpen } = useCloseOnEscKey(true);
  const queryClient = useQueryClient();
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConversationsDeletion = async () => {
    try {
      setIsLoading(true);
      const method = type === "bin" ? "delete" : "patch";
      const queryIds = toBeDeleted.join(","); 
      const endpoint = `/complaints/bin?ids=${queryIds}`;

      const response = await api[method](endpoint, {
        complaintIds: toBeDeleted,
      });

      if (response.status === 200 && response.data) {
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
        showToast(
          response.data.message || `Conversations deleted successfully`,
          "success"
        );
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(`Unable to delete conversation: ${error}`);
      const { message } = handleAxiosError(error);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="inbox-search-container">
      <div>
        <input
          placeholder="Search mail"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search className="search-icon" />
      </div>
      {toBeDeleted.length > 0 && (
        <>
          {isLoading ? (
            <Loader className="custom-loader dark-btn" />
          ) : (
            <button onClick={() => setIsOpen(true)}>
              <Trash2 className="trash-icon" />
            </button>
          )}
        </>
      )}
      {isOpen && (
        <AlertDialog
          closeModal={closeModal}
          confirmHandler={handleConversationsDeletion}
        >
          Delete marked conversations
        </AlertDialog>
      )}
    </section>
  );
};

export default InboxConvoSearch;
