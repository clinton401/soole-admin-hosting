import { FC } from "react";
import { formatDate } from "../../../lib/utils";
import { ComplaintMessage } from "../(message)/inbox/sent/page";
import {useRouter} from "next/navigation"

const SentConvoCard: FC<{
  message: ComplaintMessage;
}> = ({ message }) => {
  const {push} = useRouter()
  
  const createdAt = new Date(message.createdAt);

  const handleRedirect = () => {
    push(`/inbox/sent/${message.conversationId}`)
  };
  return (
    <div className="convo-card" onClick={handleRedirect}>
    
      <div className="sent-title">
       
       
        <p className="truncate">{message.message} </p>
      </div>
      <p className="time">{formatDate(createdAt)}</p>
    </div>
  );
};

export default SentConvoCard;
