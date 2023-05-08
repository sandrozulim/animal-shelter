import { useState } from "react";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";
import CheckBox from "../CheckBox/CheckBox";
import TextArea from "../TextArea/TextArea";
import { TAnimal, TAnimalFormValues } from "../../models/models";
import classes from "./AnimalForm.module.scss";

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type AnimalFormProps = {
  onSubmit: (value: TAnimalFormValues) => void;
  animal?: TAnimal;
  className?: string;
};

function AnimalForm({ onSubmit, animal, className }: AnimalFormProps) {
  const initFormValues: TAnimalFormValues = {
    name: animal ? animal.name : "",
    age: animal ? animal.age : 0,
    species: animal ? animal.species : "",
    microchipped: animal ? animal.microchipped : false,
    adopted: animal ? animal.adopted : false,
    checkup: animal ? animal.checkup : "",
    description: animal ? animal.description : "",
    image: animal ? animal.image : "",
  };

  const [formValues, setFormValues] = useState(initFormValues);

  const inputsChangeHandler = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues(initFormValues);
  };

  return (
    <form className={className ? `${className}` : ""} onSubmit={submitFormHandler}>
      <Input
        name="name"
        id="name"
        label="Name"
        value={formValues.name}
        onChange={inputsChangeHandler}
        required
      />

      <Input
        type="number"
        name="age"
        id="age"
        label="Age"
        value={formValues.age}
        onChange={inputsChangeHandler}
        required
      />

      <Select
        name="species"
        id="species"
        label="Species"
        options={["dog", "cat"]}
        value={formValues.species}
        onChange={inputsChangeHandler}
        required
      />

      <Input
        name="checkup"
        type="date"
        id="last-checkup"
        label="Last checkup"
        value={formValues.checkup}
        onChange={inputsChangeHandler}
        required
      />

      <Input
        name="image"
        id="image"
        label="Image"
        value={formValues.image}
        onChange={inputsChangeHandler}
      />

      <TextArea
        name="description"
        id="description"
        label="Description"
        value={formValues.description}
        onChange={inputsChangeHandler}
      />
      <div className={classes["checkbox-container"]}>
        <CheckBox
          id="microchipped"
          label="Microchipped"
          checked={formValues.microchipped}
          onChange={(e) => setFormValues({ ...formValues, microchipped: e.target.checked })}
        />

        <CheckBox
          id="adopted"
          label="Adopted"
          checked={formValues.adopted}
          onChange={(e) => setFormValues({ ...formValues, adopted: e.target.checked })}
        />
      </div>

      <Button className={classes["submit-btn"]}>Submit</Button>
    </form>
  );
}

export default AnimalForm;
