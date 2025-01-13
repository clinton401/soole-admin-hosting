"use client";

import React, { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  content?: string;
  preamble?: string;
  preambleStyle?: React.CSSProperties;
  onConfirm?: () => void;
  onCancel?: () => void;
  onAdd?: () => void;
  children?: ReactNode;
  actionButtons?: "confirm-cancel" | "add";
  showCloseButton?: boolean;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  title,
  preamble,
  content,
  preambleStyle,
  onConfirm,
  onCancel,
  onAdd,
  children,
  actionButtons = "confirm-cancel",
  showCloseButton = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
      {showCloseButton && (
          <button className="close-button" onClick={onCancel}>
            &times;
          </button>
        )}
        {title && <h3 className="modal-title">{title}</h3>}
        {content && <p className="modal-content">{content}</p>}
        {preamble && (
          <p className="modal-preamble" style={preambleStyle}>
            {preamble}
          </p>
        )}
        {children && <div className="modal-children">{children}</div>}
        <div className="modal-actions">
          {actionButtons === "confirm-cancel" && (
            <>
              <button className="modal-button confirm" onClick={onConfirm}>
                Confirm
              </button>
              <button className="modal-button cancel" onClick={onCancel}>
                Cancel
              </button>
            </>
          )}
          {actionButtons === "add" && (
            <button className="modal-button add" onClick={onAdd}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
