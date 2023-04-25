import { ComponentPropsWithoutRef } from "react";
import classes from "./Input.module.scss";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  id: string;
  isInvalid?: boolean;
  errorMsg?: string;
};

function Input(props: InputProps) {
  const { label, id, isInvalid = false, errorMsg, ...rest } = props;

  return (
    <div className={classes["container"]}>
      {label && (
        <label className={classes["label"]} htmlFor={id}>
          {label}
        </label>
      )}

      <input className={classes["input"]} id={id} {...rest} />

      {isInvalid && errorMsg && (
        <p className={classes["error-msg"]}>{errorMsg}</p>
      )}
    </div>
  );
}

export default Input;
