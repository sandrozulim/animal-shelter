import { useContext } from "react";
import Spinner from "../../components/shared/Spinner/Spinner";
import Modal from "../../components/shared/Modal/Modal";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import DonationForm from "../../components/Donations/DonationForm/DonationForm";
import useHttp from "../../hooks/useHttp";
import { UserContext } from "../../contexts/UserContext";
import { API_ENDPOINTS } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { TDonationsFormValues } from "../../types/types";

function NewDonationPage() {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const createNewDonationHandler = async (formValues: TDonationsFormValues) => {
    const url = API_ENDPOINTS.DONATIONS;
    const updatedCategory = isAdmin ? "requesting" : "offering";

    const response = await sendRequest({
      url,
      method: "POST",
      data: { ...formValues, category: updatedCategory },
    });

    if (response) navigate("/donations");
  };

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <PageTitle title={isAdmin ? "Request Donation" : "Offer Donation"} />
      <DonationForm onSubmit={createNewDonationHandler} />
    </>
  );
}

export default NewDonationPage;
