import classes from "./Select.module.scss";

type SelectProps = React.ComponentPropsWithoutRef<"select"> & {
  options: string[];
  id: string;
  label: string;
};

function Select({ options = [], id, label, ...rest }: SelectProps) {
  const optionList = options.map((option) => {
    return (
      <option className={classes["select__option"]} key={option} value={option}>
        {option}
      </option>
    );
  });

  return (
    <div className={classes["select"]}>
      {label && <label htmlFor={id}>{label}</label>}

      <select className={classes["select__input"]} id={id} {...rest}>
        {optionList}
      </select>
    </div>
  );
}

export default Select;
