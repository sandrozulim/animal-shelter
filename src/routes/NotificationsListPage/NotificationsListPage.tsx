import { useEffect, useState, useCallback } from "react";
import Spinner from "../../components/shared/Spinner/Spinner";
import Modal from "../../components/shared/Modal/Modal";
import Button from "../../components/shared/Button/Button";
import NotificationItem from "../../components/Notifications/NotificationItem/NotificationItem";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import useHttp from "../../hooks/useHttp";
import { Link } from "react-router-dom";
import { TNotification } from "../../types/types";
import { API_ENDPOINTS } from "../../constants/constants";
import classes from "./NotificationsListPage.module.scss";

function NotificationsListPage() {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [notifications, setNotifications] = useState<TNotification[]>([]);

  const getNotifications = useCallback(async () => {
    const url = API_ENDPOINTS.NOTIFICATIONS;
    const response = await sendRequest({ url, method: "GET" });
    if (response) setNotifications(response.data);
  }, [sendRequest]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const sortedNotifications: TNotification[] = notifications.sort(
    (a: TNotification, b: TNotification) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  );

  const notificationDeleteHandler = async (id: number) => {
    const url = `${API_ENDPOINTS.NOTIFICATIONS}/${id}`;
    const response = await sendRequest({ url, method: "DELETE" });
    if (response) getNotifications();
  };

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <section>
        <PageTitle title="Notifications" />

        <Link to={"/new-notification"}>
          <Button className={classes["new-notification"]}>New Notification</Button>
        </Link>

        <ul className={classes["notifications-list"]}>
          {sortedNotifications.map((notification) => (
            <li key={notification.id}>
              <NotificationItem data={notification} onDelete={notificationDeleteHandler} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default NotificationsListPage;
