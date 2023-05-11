import { ImSpinner9 } from "react-icons/im";
import classes from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={classes["spinner"]}>
      <ImSpinner9 className={classes["spinner__icon"]} />
    </div>
  );
}

export default Spinner;
