import { FC, ReactNode } from "react";
import { X } from "lucide-react";

type AlertDialogProps = {
  closeModal: () => void;
  confirmHandler: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
};

const AlertDialog: FC<AlertDialogProps> = ({
  children,
  showCloseButton = false,
  closeModal,
  confirmHandler
}) => {
  return (
    <section className="alert-dialog" onClick={closeModal}>
      <div className="dialog-container">
        {showCloseButton && (
          <button className="close-button" >
            <X />
          </button>
        )}
        <div
         
          className="dialog-menu-container"
        >
          <div className="dialog-menu"  onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            <h3>
            {children}
            </h3>

            <div className="dialog-menu-btns">
              <button onClick={() => {
                closeModal();
                confirmHandler();

              }}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertDialog;
