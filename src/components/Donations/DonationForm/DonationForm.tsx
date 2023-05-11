import { useState } from "react";
import Select from "../../shared/Select/Select";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import TextArea from "../../shared/TextArea/TextArea";
import { TDonations, TDonationsFormValues } from "../../../types/types";
import classes from "./DonationForm.module.scss";

type InputsChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

type DonationFormProps = {
  donation?: TDonations;
  onSubmit: (formValues: TDonationsFormValues) => void;
};

function DonationForm({ donation, onSubmit }: DonationFormProps) {
  const initFormValues: TDonationsFormValues = {
    type: donation ? donation.type : "food",
    value: donation ? donation.value : 0,
    description: donation ? donation.description : "",
  };

  const [formValues, setFormValues] = useState(initFormValues);

  const inputsChangeHandler = (e: InputsChangeEvent) => {
    const { name, value } = e.target;

    setFormValues((state) => {
      return { ...state, [name]: value };
    });
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initFormValues);
  };

  return (
    <form className={classes["form"]} onSubmit={formSubmitHandler}>
      <Select
        options={["food", "medications", "toys"]}
        name="type"
        id="type"
        label="Type"
        value={formValues.type}
        onChange={inputsChangeHandler}
        required
      />
      <Input
        name="value"
        id="value"
        label="Value"
        type="number"
        min={1}
        value={formValues.value}
        onChange={inputsChangeHandler}
        required
      />
      <TextArea
        name="description"
        id="description"
        label="Description"
        value={formValues.description}
        onChange={inputsChangeHandler}
        maxLength={30}
      />

      <Button className={classes["form__submit-btn"]}>Submit</Button>
    </form>
  );
}

export default DonationForm;
