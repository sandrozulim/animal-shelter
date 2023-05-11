import { useState } from "react";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Button from "../../components/shared/Button/Button";
import Input from "../../components/shared/Input/Input";
import Map from "../../components/shared/Map/Map";
import TextArea from "../../components/shared/TextArea/TextArea";
import { EMAIL_VALIDATION_REGEX } from "../../constants/constants";
import Modal from "../../components/shared/Modal/Modal";
import classes from "./AboutPage.module.scss";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function AboutPage() {
  const initialFormValues = {
    name: "",
    nameIsInvalid: false,
    mail: "",
    mailIsInvalid: false,
    message: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.nameIsInvalid && !formValues.mailIsInvalid) {
      setFormValues(initialFormValues);
      setIsFormOpen(false);
      setIsFormSubmitted(true);
    }
  };

  const inputChangeHandler = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    let isInvalid;

    if (name === "name") {
      isInvalid = value.length < 2;
    }

    if (name === "mail") {
      isInvalid = !EMAIL_VALIDATION_REGEX.test(value);
    }

    setFormValues({ ...formValues, [name]: value, [`${name}IsInvalid`]: isInvalid });
  };

  return (
    <>
      <section className={classes["container"]}>
        <PageTitle title="About us" />

        <p className={classes["container__about"]}>
          Welcome to our animal shelter! We are a dedicated team of animal lovers who are passionate
          about helping animals in need. Our mission is to provide a safe and caring environment for
          all animals who come into our care, and to find loving, forever homes for as many of them
          as possible.
        </p>

        <div className={classes["container__contact"]}>
          <Map />

          <div className={classes["container__contact-info"]}>
            <p>Lorem Ipsum </p>
            <p>Lorem ipsum dolor sit amet</p>
            <p>loremipsum@dummy.com</p>

            <Button onClick={() => setIsFormOpen(true)}>Contact us</Button>
            {isFormSubmitted && (
              <p className={classes["container__submitted-msg"]}>Form Submitted!</p>
            )}
          </div>
        </div>
      </section>

      {isFormOpen && (
        <Modal title="Say Hello :)" onClose={() => setIsFormOpen(false)}>
          <form className={classes["contact-form"]} onSubmit={submitHandler}>
            <Input
              name="name"
              label="Name"
              id="name"
              value={formValues.name}
              onChange={inputChangeHandler}
              isInvalid={formValues.nameIsInvalid}
              errorMsg="Must be at least 2 characters"
              required
            />

            <Input
              name="mail"
              label="Mail"
              id="mail"
              value={formValues.mail}
              onChange={inputChangeHandler}
              isInvalid={formValues.mailIsInvalid}
              errorMsg="Must be valid e-mail address"
              required
            />

            <TextArea
              name="message"
              id="message"
              label="Message"
              value={formValues.message}
              onChange={inputChangeHandler}
              required
            />

            <Button disabled={formValues.mailIsInvalid || formValues.nameIsInvalid}>Submit</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AboutPage;
