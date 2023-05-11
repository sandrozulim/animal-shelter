import { useState, useEffect, useContext, useCallback } from "react";
import useHttp from "../../hooks/useHttp";
import DonationsCategory from "../../components/Donations/DonationCategory/DonationsCategory";
import PageTitle from "../../components/shared/PageTitle/PageTitle";
import Spinner from "../../components/shared/Spinner/Spinner";
import Modal from "../../components/shared/Modal/Modal";
import Button from "../../components/shared/Button/Button";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { TDonations } from "../../types/types";
import { API_ENDPOINTS } from "../../constants/constants";
import classes from "./DonationsListPage.module.scss";

function DonationsListPage() {
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const [donations, setDonations] = useState<TDonations[]>([]);
  const { isAdmin } = useContext(UserContext);

  const getDonations = useCallback(async () => {
    const url = API_ENDPOINTS.DONATIONS;
    const response = await sendRequest({ url, method: "GET" });
    if (response) setDonations(response.data);
  }, [sendRequest]);

  useEffect(() => {
    getDonations();
  }, [getDonations]);

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <section className={classes["donation-page"]}>
        <PageTitle title="Donations" />

        <div className={classes["donation-page__controls"]}>
          <Link to="/new-donation">
            <Button>{isAdmin ? "New Request" : "New Donation"}</Button>
          </Link>
        </div>

        <DonationsCategory
          category="requesting"
          donations={donations}
          refreshDonations={getDonations}
        />
        <DonationsCategory
          category="offering"
          donations={donations}
          refreshDonations={getDonations}
        />
        <DonationsCategory
          category="donated"
          donations={donations}
          refreshDonations={getDonations}
        />
      </section>
    </>
  );
}

export default DonationsListPage;
