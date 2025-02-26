import { FC } from "react";
import { Loader } from "lucide-react";

const SubmitButton: FC<{ isPending: boolean, text: string }> = ({ isPending, text }) => {
  return (
    <button type="submit" disabled={isPending}>
      {isPending ? <Loader className="custom-loader" /> : text}{" "}
    </button>
  );
};

export default SubmitButton;
