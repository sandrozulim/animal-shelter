import { ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createPortal } from "react-dom";
import classes from "./Modal.module.scss";

type ModalProps = {
  onClose: (isModalOpen: boolean) => void;
  children: ReactNode;
  className?: string;
};

function Modal({ children, onClose, className }: ModalProps) {
  const portalRoot = document.getElementById("portal");

  const modalClasses = className
    ? `${classes["modal"]} ${className}`
    : classes["modal"];

  const portalContent = (
    <>
      <div className={classes["backdrop"]} onClick={() => onClose(false)}></div>
      <div className={modalClasses}>
        <AiOutlineCloseCircle
          onClick={() => onClose(false)}
          className={classes["close-btn"]}
        />
        {children}
      </div>
    </>
  );

  return createPortal(portalContent, portalRoot as Element);
}

export default Modal;
