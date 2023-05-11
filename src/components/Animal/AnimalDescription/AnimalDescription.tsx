import classes from "./AnimalDescription.module.scss";
import { TAnimal } from "../../../types/types";

type AnimalDescriptionProps = {
  animal: TAnimal;
};

function AnimalDescription({ animal }: AnimalDescriptionProps) {
  return (
    <div className={classes["description"]}>
      <h3 className={classes["description__name"]}>{animal.name}</h3>
      <p>Species: {animal.species}</p>
      <p>Age: {animal.age}</p>
      <p>Microchipped: {animal.microchipped ? "Yes" : "No"}</p>
      <p>Adopted: {animal.adopted ? "Yes" : "No"}</p>
      <p>Last checkup: {animal.checkup}</p>
      <p>Description: {animal.description}</p>
    </div>
  );
}

export default AnimalDescription;
