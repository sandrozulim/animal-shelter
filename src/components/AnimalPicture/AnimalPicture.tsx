import { TAnimal } from "../../models/models";
import classes from "./AnimalPicture.module.scss";

type AnimalPictureProps = {
  animal: TAnimal;
  height?: string;
};

function AnimalPicture({ animal, height = "" }: AnimalPictureProps) {
  return (
    <figure style={{ height: height }} className={classes["animal-picture"]}>
      {animal.adopted && <span className={classes["animal-picture__adopted-msg"]}>Adopted</span>}
      <img src={animal.image} alt={animal.name} />
    </figure>
  );
}

export default AnimalPicture;
