import { ComponentPropsWithoutRef } from "react";
import classes from "./CheckBox.module.scss";

type CheckBoxProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  id: string;
};

function CheckBox({ label, id, ...rest }: CheckBoxProps) {
  return (
    <div className={classes["checkbox-container"]}>
      <input className={classes["checkbox"]} type="checkbox" id={id} {...rest} />

      <label className={classes["label"]} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
