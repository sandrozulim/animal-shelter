import { ComponentPropsWithoutRef } from "react";
import classes from "./Toggle.module.scss";

type ToggleProps = ComponentPropsWithoutRef<"input"> & {
  label: React.ReactNode;
  id: string;
  className?: string;
};

function Toggle({ label, id, className, ...rest }: ToggleProps) {
  const toggleClasses = className
    ? `${classes["toggle-container"]} ${className}`
    : classes["toggle-container"];

  return (
    <div className={toggleClasses}>
      <input className={classes["input"]} id={id} type="checkbox" {...rest} />

      <label className={classes["label"]} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Toggle;
