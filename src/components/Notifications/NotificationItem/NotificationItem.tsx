import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import Button from "../../shared/Button/Button";
import ConfirmationDialog from "../../shared/ConfirmationDialog/ConfirmationDialog";
import { TNotification } from "../../../types/types";
import { AiOutlineDelete } from "react-icons/ai";
import classes from "./NotificationItem.module.scss";

type NotificationItemProps = {
  data: TNotification;
  onDelete: (id: number) => void;
};

function NotificationItem({ data, onDelete }: NotificationItemProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { isAdmin } = useContext(UserContext);

  const notificationHeaderClasses = `${classes["notification__header"]} ${
    data.important ? classes["notification__header--important"] : ""
  }`;

  return (
    <div className={classes["notification"]}>
      <div className={notificationHeaderClasses}>
        <h3 className={classes["notification__title"]}>{data.title}</h3>
        <span className={classes["notification__date"]}>{data.date}</span>
      </div>

      {isAdmin && (
        <div className={classes["notification__control"]}>
          <Button onClick={() => setIsConfirmDialogOpen(true)}>
            <AiOutlineDelete />
          </Button>
        </div>
      )}

      {isConfirmDialogOpen && (
        <ConfirmationDialog
          question="Are you sure you want to delete selected item?"
          onConfirm={() => onDelete(data.id)}
          onReject={() => setIsConfirmDialogOpen(false)}
        />
      )}

      <p className={classes["notification__text"]}>{data.text}</p>
    </div>
  );
}

export default NotificationItem;
