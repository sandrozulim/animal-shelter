import DonationItem from "../DonationItem/DonationItem";
import useHttp from "../../../hooks/useHttp";
import Modal from "../../shared/Modal/Modal";
import Spinner from "../../shared/Spinner/Spinner";
import { TDonations } from "../../../types/types";
import { API_ENDPOINTS } from "../../../constants/constants";
import classes from "./DonationsCategory.module.scss";

type DonationsCategoryProps = {
  category: "requesting" | "offering" | "donated";
  donations: TDonations[];
  refreshDonations: () => void;
};

function DonationsCategory({ category, donations, refreshDonations }: DonationsCategoryProps) {
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const filteredDonations = donations.filter((donation) => donation.category === category);

  async function deleteDonation(id: number) {
    const url = `${API_ENDPOINTS.DONATIONS}/${id}`;
    const response = await sendRequest({ url, method: "DELETE" });
    if (response) refreshDonations();
  }

  async function markAsDonated(id: number) {
    const url = `${API_ENDPOINTS.DONATIONS}/${id}`;
    const response = await sendRequest({ url, method: "PATCH", data: { category: "donated" } });
    if (response) refreshDonations();
  }

  async function repeatDonation(donation: TDonations) {
    const url = API_ENDPOINTS.DONATIONS;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newDonation } = donation;
    newDonation.category = "requesting";

    const response = await sendRequest({
      url,
      method: "POST",
      data: newDonation,
    });

    if (response) refreshDonations();
  }

  return (
    <>
      {isLoading && <Spinner />}

      {error && (
        <Modal title="Error" onClose={clearError}>
          <p>{error}</p>
        </Modal>
      )}

      <article className={classes["donations-list"]}>
        <table className={classes["donations-list__table"]}>
          <caption className={classes["donations-list__table-caption"]}>{category}</caption>
          <thead className={classes["donations-list__table-header"]}>
            <tr>
              <th>Type</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation) => (
              <DonationItem
                key={donation.id}
                data={donation}
                category={donation.category}
                actionHandler={{ deleteDonation, markAsDonated, repeatDonation }}
              />
            ))}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default DonationsCategory;
