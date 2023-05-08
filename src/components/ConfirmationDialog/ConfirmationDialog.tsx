import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import classes from "./ConfirmationDialog.module.scss";

type ConfirmationDialogProps = {
  question: string;
  onReject: () => void;
  onConfirm: () => void;
};

function ConfirmationDialog({ question, onConfirm, onReject }: ConfirmationDialogProps) {
  return (
    <Modal className={classes["dialog"]} title={question} onClose={onReject}>
      <div className={classes["dialog__controls"]}>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onReject}>No</Button>
      </div>
    </Modal>
  );
}

export default ConfirmationDialog;
