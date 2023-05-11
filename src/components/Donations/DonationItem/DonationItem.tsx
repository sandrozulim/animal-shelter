import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { TDonations } from "../../../types/types";
import { AiOutlineDelete, AiOutlineCheck } from "react-icons/ai";
import { BsRepeat } from "react-icons/bs";
import Button from "../../shared/Button/Button";
import classes from "./DonationItem.module.scss";

type DonationActionHandlerObject = {
  deleteDonation: (id: number) => void;
  markAsDonated: (id: number) => void;
  repeatDonation: (donation: TDonations) => void;
};

type DonationItemProps = {
  data: TDonations;
  category: string;
  actionHandler: DonationActionHandlerObject;
};

function DonationItem({ data, category, actionHandler }: DonationItemProps) {
  const { isAdmin } = useContext(UserContext);

  let donationActions: React.ReactNode;

  if (category === "requesting") {
    donationActions = (
      <>
        <Button onClick={() => actionHandler.markAsDonated(data.id)}>
          <AiOutlineCheck />
        </Button>

        {isAdmin && (
          <Button onClick={() => actionHandler.deleteDonation(data.id)}>
            <AiOutlineDelete />
          </Button>
        )}
      </>
    );
  }

  if (category === "offering" && isAdmin) {
    donationActions = (
      <Button onClick={() => actionHandler.markAsDonated(data.id)}>
        <AiOutlineCheck />
      </Button>
    );
  }

  if (category === "donated" && isAdmin) {
    donationActions = (
      <>
        <Button onClick={() => actionHandler.repeatDonation(data)}>
          <BsRepeat />
        </Button>

        <Button onClick={() => actionHandler.deleteDonation(data.id)}>
          <AiOutlineDelete />
        </Button>
      </>
    );
  }

  return (
    <tr key={data.id}>
      <td>{data.type}</td>
      <td>{data.value}</td>
      <td>{data.description}</td>

      <td>
        <div className={classes["donation-list__actions"]}>{donationActions}</div>
      </td>
    </tr>
  );
}

export default DonationItem;
