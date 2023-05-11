import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Input from "../../components/shared/Input/Input";
import TextArea from "../../components/shared/TextArea/TextArea";
import CheckBox from "../../components/shared/CheckBox/CheckBox";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Button from "../../components/shared/Button/Button";
import Modal from "../../components/shared/Modal/Modal";
import Spinner from "../../components/shared/Spinner/Spinner";
import useHttp from "../../hooks/useHttp";
import { API_ENDPOINTS } from "../../constants/constants";
import { TNotificationFormValues } from "../../types/types";
import classes from "./NewNotificationPage.module.scss";
import { useNavigate } from "react-router-dom";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function NewNotificationPage() {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [formValues, setFormValues] = useState<TNotificationFormValues>({
    title: "",
    text: "",
    important: false,
  });

  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const inputsChangeHandler = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const finalDate = `${year}-${month}-${day}`;

    const newNotification = { ...formValues, date: finalDate };

    const url = API_ENDPOINTS.NOTIFICATIONS;
    const response = await sendRequest({ url, method: "POST", data: newNotification });
    if (response) navigate("/notifications");
  };

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <PageTitle title="New Notification" />

      <form onSubmit={formSubmitHandler}>
        <Input
          name="title"
          id="title"
          label="Title"
          max={20}
          required
          value={formValues.title}
          onChange={inputsChangeHandler}
        />

        <TextArea
          name="text"
          id="text"
          label="Text"
          minLength={10}
          maxLength={200}
          value={formValues.text}
          onChange={inputsChangeHandler}
        />

        {isAdmin && (
          <CheckBox
            id="important"
            label="Important"
            checked={formValues.important}
            onChange={(e) => setFormValues({ ...formValues, important: e.target.checked })}
          />
        )}

        <Button className={classes["submit-btn"]}>Submit</Button>
      </form>
    </>
  );
}

export default NewNotificationPage;
