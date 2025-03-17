import { FC, useState, useEffect } from "react";
import { EllipsisVertical, Loader } from "lucide-react";
import useCloseOnEscKey from "../../../hooks/use-close-on-esc-key";
import { User, UserStatus } from "../users/page";
import AlertDialog from "./AlertDialog";
import { handleAxiosError } from "../../../config/handleAxiosError";
import showToast from "../../../hooks/use-toast";
import api from "../../../config/api";
import { useQueryClient } from "@tanstack/react-query";

const UsersTableMoreOption: FC<{ user: User, selectedFilter: string }> = ({ user, selectedFilter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, setIsOpen } = useCloseOnEscKey();
  const { isOpen: isModalOpen, setIsOpen: setIsModalOpen } =
    useCloseOnEscKey(true);
const queryClient = useQueryClient()
  useEffect(() => {
    if (isOpen || isModalOpen) {
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isOpen, isModalOpen]);

  if (user.status === UserStatus.INACTIVE) return;
  const clickHandler = () => {
    if (isLoading) return;
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    if (!isModalOpen) return;
    setIsModalOpen(false);

    if (!isOpen) return;
    setIsOpen(false);
  };

  const isStatusActive = user.status === UserStatus.ACTIVE;
  const handleAccountSuspension = async () => {
    try {
      setIsLoading(true);
      const url = `/users/${user.id}/${
        isStatusActive ? "suspend" : "reactivate"
      }`;
      const response = await api.post(url);
      if (response.status === 200 && response.data) {
        const returnedUser = response.data?.user;
        if(returnedUser){
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          queryClient.setQueryData(["users", selectedFilter], (old: unknown) => {
            if (!old) return old;
          
          
            return {
              ...(old as any),
              pages: (old as any).pages.map((page: unknown) => ({
                ...(page as any),
                data: (page as any).data.map((validUser: User) => 
                  validUser.id === user.id ? returnedUser : validUser
                ),
              })),
            };
          });
          
      }
        showToast(
          response.data.message ||
            `User ${isStatusActive ? "Suspended" : "Reactivated"} successfully`,
          "success"
        );
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error(`Unable to suspend user account: ${error}`);
      const { message } = handleAxiosError(error);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const name = `${user.firstName} ${user.lastName}`;
  return (
    <>
      <button disabled={isLoading} onClick={clickHandler}>
        {isLoading ? (
          <Loader className="custom-loader dark-btn" />
        ) : (
          <EllipsisVertical className="more" />
        )}
      </button>
      {isOpen && !isLoading && (
        <div
          className="options-menu"
          onClick={() => {
            setIsOpen(true);
            setIsModalOpen(true);
          }}
        >
          {isStatusActive ? "Suspend user" : "Reactivate user"}
        </div>
      )}
      {isModalOpen && (
        <AlertDialog closeModal={closeModal} confirmHandler={handleAccountSuspension}>
          You are about to{" "}
          <span className={isStatusActive ? "error" : "success"}>
            {isStatusActive ? "Suspend" : "Reactivate"}
          </span>{" "}
          user {name}. Kindly confirm this action.
        </AlertDialog>
      )}
    </>
  );
};

export default UsersTableMoreOption;
