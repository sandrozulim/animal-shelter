import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import Modal from "../../components/Modal/Modal";
import AnimalCard from "../../components/AnimalCard/AnimalCard";
import Spinner from "../../components/Spinner/Spinner";
import Select from "../../components/Select/Select";
import Input from "../../components/Input/Input";
import { BASE_API_URL } from "../../constants/constants";
import { TAnimal } from "../../models/models";
import classes from "./AnimalsPage.module.scss";

type filtersChangeEvent = React.ChangeEvent<HTMLSelectElement> &
  React.ChangeEvent<HTMLInputElement>;

function AnimalsPage() {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [animals, setAnimals] = useState<TAnimal[]>([]);
  const [filters, setFilters] = useState({ species: "all", adopted: "all", name: "" });

  useEffect(() => {
    const url = `${BASE_API_URL}/animals`;

    const getData = async () => {
      const res = await sendRequest({ url, method: "GET" });
      if (res) setAnimals(res.data);
    };

    getData();
  }, [sendRequest]);

  const filterChangeHandler = (e: filtersChangeEvent) => {
    const { value, name } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredAnimalList = animals.filter((animal) => {
    let speciesFilter = true;
    let adoptedFilter = true;
    let nameFilter = true;

    if (filters.species !== "all") {
      speciesFilter = animal.species === filters.species;
    }

    if (filters.adopted !== "all") {
      adoptedFilter = animal.adopted === (filters.adopted === "adopted");
    }

    if (filters.name !== "") {
      nameFilter = animal.name.toLowerCase().includes(filters.name.toLowerCase());
    }

    return speciesFilter && adoptedFilter && nameFilter;
  });

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <div className={classes["container"]}>
        <form className={classes["filters"]}>
          <fieldset className={classes["filters__group"]}>
            <Input
              id="search"
              label="Search by name"
              name="name"
              value={filters.name}
              onChange={filterChangeHandler}
            />

            <Select
              name="species"
              id="species"
              label="Species"
              options={["all", "cat", "dog"]}
              value={filters.species}
              onChange={filterChangeHandler}
            />

            <Select
              name="adopted"
              id="adopted"
              label="Adopted"
              options={["all", "adopted", "not adopted"]}
              value={filters.adopted}
              onChange={filterChangeHandler}
            />
          </fieldset>
        </form>

        <section className={classes["animals"]}>
          <ul className={classes["animals__list"]}>
            {filteredAnimalList.map((animal) => (
              <li className={classes["animals__item"]} key={animal.id}>
                <AnimalCard data={animal} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default AnimalsPage;
