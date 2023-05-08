import { TAnimal } from "../../models/models";
import { Link } from "react-router-dom";
import AnimalPicture from "../AnimalPicture/AnimalPicture";
import classes from "./AnimalCard.module.scss";

type AnimalCardProps = {
  data: TAnimal;
};

function AnimalCard({ data }: AnimalCardProps) {
  return (
    <Link to={data.id.toString()}>
      <article className={classes["animal"]}>
        <AnimalPicture animal={data} height="12rem" />
        <h3 className={classes["animal__name"]}>{data.name}</h3>
      </article>
    </Link>
  );
}

export default AnimalCard;
