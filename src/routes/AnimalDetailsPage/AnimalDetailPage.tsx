import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import AnimalForm from "../../components/AnimalForm/AnimalForm";
import AnimalPicture from "../../components/AnimalPicture/AnimalPicture";
import AnimalDescription from "../../components/AnimalDescription/AnimalDescription";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineArrowLeft } from "react-icons/ai";
import { BsHouseHeart } from "react-icons/bs";
import { UserContext } from "../../contexts/UserContext";
import { API_ENDPOINTS } from "../../constants/constants";
import { TAnimal, TAnimalFormValues } from "../../models/models";
import classes from "./AnimalDetailsPage.module.scss";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";

function AnimalDetailPage() {
  const [animal, setAnimal] = useState<TAnimal | null>(null);
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [isEditModeOpen, setIsEditModeOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { animalId } = useParams();
  const userCtx = useContext(UserContext);

  const url = `${API_ENDPOINTS.ANIMALS}/${animalId}`;

  useEffect(() => {
    const getData = async () => {
      const response = await sendRequest({ url, method: "GET" });
      if (response) setAnimal(response.data);
    };

    getData();
  }, [sendRequest, animalId, url]);

  const adoptAnimalHandler = async () => {
    const response = await sendRequest({ url, method: "PATCH", data: { adopted: true } });
    if (response) setAnimal(response.data);
  };

  const editAnimalHandler = async (formValues: TAnimalFormValues) => {
    const response = await sendRequest({ url, method: "PUT", data: formValues });

    if (response) {
      setAnimal(response.data);
    }

    setIsEditModeOpen(false);
  };

  const deleteAnimalHandler = async () => {
    const response = await sendRequest({ url, method: "DELETE" });
    if (response) {
      setIsConfirmDialogOpen(false);
      navigate("/animals");
    }
  };

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      {isEditModeOpen && animal && (
        <Modal title="Edit" onClose={() => setIsEditModeOpen(false)}>
          <AnimalForm onSubmit={editAnimalHandler} animal={animal} />
        </Modal>
      )}

      {isConfirmDialogOpen && (
        <ConfirmationDialog
          question="Are you sure you want to delete?"
          onReject={() => setIsConfirmDialogOpen(false)}
          onConfirm={() => deleteAnimalHandler()}
        />
      )}

      {animal && (
        <article className={classes["animal-details"]}>
          <AnimalPicture animal={animal} height="15rem" />

          <section className={classes["animal-details__controls"]}>
            <Button onClick={() => navigate(-1)} className={classes["animal-details__back-btn"]}>
              <AiOutlineArrowLeft />
            </Button>

            <Button onClick={adoptAnimalHandler} disabled={animal.adopted}>
              <BsHouseHeart />
            </Button>

            {userCtx.isAdmin && (
              <Button onClick={() => setIsConfirmDialogOpen(true)}>
                <AiOutlineDelete />
              </Button>
            )}
            {userCtx.isAdmin && (
              <Button onClick={() => setIsEditModeOpen(true)}>
                <AiOutlineEdit />
              </Button>
            )}
          </section>

          <section className={classes["animal-details__info"]}>
            <AnimalDescription animal={animal} />
          </section>
        </article>
      )}
    </>
  );
}

export default AnimalDetailPage;
