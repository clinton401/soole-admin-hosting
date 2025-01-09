"use client";

import React, { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  content?: string;
  preamble?: string;
  onConfirm: () => void;
  onCancel: () => void;
  preambleStyle?: React.CSSProperties;
}

const Modal: FC<ModalProps> = ({ isOpen, title, preamble, content, onConfirm, onCancel, preambleStyle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-content">{content}</p>
        <p className="modal-preamble" style={preambleStyle}>{preamble}</p>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
