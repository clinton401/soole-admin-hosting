import { FC, Dispatch, SetStateAction } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { formatDate } from "../../../lib/utils";
import useToggleStar from "../../../hooks/use-toggle-star";
import { ComplaintConversation, ComplaintStatus } from "./InboxConvoParentComp";
import showToast from "../../../hooks/use-toast";
import {useRouter} from "next/navigation"

const ConvoCard: FC<{
  conversation: ComplaintConversation;
  toBeDeleted: string[];
  setToBeDeleted: Dispatch<SetStateAction<string[]>>;
  type: "total" | "bin" | "starred";
}> = ({ conversation, toBeDeleted, setToBeDeleted, type }) => {
  const { mutate: toggleStar } = useToggleStar();
  const {push} = useRouter()
  const handleCheckboxChange = (id: string) => {
    setToBeDeleted((prev) =>
      prev.includes(id) ? prev.filter((convId) => convId !== id) : [...prev, id]
    );
  };
  const isResolved = conversation.status === ComplaintStatus.RESOLVED;
  const createdAt = new Date(conversation.createdAt);
  const handleCheckBox = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };
  const handleStar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleStar(
      {
        convoId: conversation.id,
        value: !conversation.starred,
      },
      {
        onError: (error) => {
          console.error("Error toggling star:", error);
          showToast(
            error?.message ||
              `Unable to ${
                !conversation.starred ? "unstar" : "star"
              } conversation `, "error"
          );
        },
      }
    );
  };

  const handleRedirect = () => {
    push(`/inbox/${type === "total" ? "all" : type}/${conversation.id}`)
  };
  return (
    <div className="convo-card" onClick={handleRedirect}>
      <div className="checkbox-star">
        <input
          type="checkbox"
          checked={toBeDeleted.includes(conversation.id)}
          onChange={() => handleCheckboxChange(conversation.id)}
          onClick={handleCheckBox}
        />
        {type !== "bin" && (
          <button onClick={handleStar}>
            {conversation.starred ? (
              <FaStar className="starred" />
            ) : (
              <CiStar className="star" />
            )}
          </button>
        )}
        <p className="truncate">{conversation.userName}</p>
      </div>
      <div className="title">
        {type === "total" &&  <span className={isResolved ? "resolved" : "unresolved"}>
          {isResolved ? "Resolved" : "Unresolved"}
        </span>}
       
        <p className="truncate">{conversation.complaint} </p>
      </div>
      <p className="time">{formatDate(createdAt)}</p>
    </div>
  );
};

export default ConvoCard;
