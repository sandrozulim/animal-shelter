import { ComponentPropsWithoutRef } from "react";
import classes from "./Input.module.scss";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  labelAfter?: boolean;
  id: string;
  isInvalid?: boolean;
  errorMsg?: string;
  className?: string;
};

function Input(props: InputProps) {
  const { label, labelAfter = false, id, isInvalid = false, errorMsg, className, ...rest } = props;

  const inputClasses = className ? `${classes["input"]} ${className}` : classes["input"];

  return (
    <div className={inputClasses}>
      {label && !labelAfter && (
        <label className={classes["input__label"]} htmlFor={id}>
          {label}
        </label>
      )}

      <input className={classes["input__inp"]} id={id} {...rest} />

      {label && labelAfter && (
        <label className={classes["input__label"]} htmlFor={id}>
          {label}
        </label>
      )}

      {isInvalid && errorMsg && <p className={classes["input__error"]}>{errorMsg}</p>}
    </div>
  );
}

export default Input;
