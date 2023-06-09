import useHttp from "../../hooks/useHttp";
import Modal from "../../components/shared/Modal/Modal";
import Spinner from "../../components/shared/Spinner/Spinner";
import AnimalForm from "../../components/Animal/AnimalForm/AnimalForm";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import { useNavigate } from "react-router-dom";
import { TAnimalFormValues } from "../../types/types";
import { API_ENDPOINTS } from "../../constants/constants";
import classes from "./NewAnimalPage.module.scss";

function NewAnimalPage() {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const navigate = useNavigate();

  const createNewAnimalHandler = async (animal: TAnimalFormValues) => {
    const url = API_ENDPOINTS.ANIMALS;
    const response = await sendRequest({ url, method: "POST", data: animal });

    if (response) navigate("/animals");
  };

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <PageTitle title="New Animal" />
      <AnimalForm className={classes["new-animal-form"]} onSubmit={createNewAnimalHandler} />
    </>
  );
}

export default NewAnimalPage;
