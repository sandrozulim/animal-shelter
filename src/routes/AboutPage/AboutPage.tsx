import { useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Map from "../../components/Map/Map";
import classes from "./AboutPage.module.scss";
import TextArea from "../../components/TextArea/TextArea";
import Modal from "../../components/Modal/Modal";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function AboutPage() {
  const initialFormValues = { name: "", mail: "", message: "" };
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormValues(initialFormValues);
    console.log("Form submitted");
  };

  const inputChangeHandler = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
          {/* <Map /> */}
          <div className={classes["container__contact-info"]}>
            <p>Lorem Ipsum </p>
            <p>Lorem ipsum dolor sit amet</p>
            <p>loremipsum@dummy.com</p>
            <Button onClick={() => setIsFormOpen(true)}>Contact us</Button>
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
              required
            />

            <Input
              name="mail"
              label="Mail"
              id="mail"
              value={formValues.mail}
              onChange={inputChangeHandler}
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

            <Button>Submit</Button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AboutPage;
