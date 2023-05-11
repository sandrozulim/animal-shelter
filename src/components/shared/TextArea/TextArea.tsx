import classes from "./TextArea.module.scss";

type TextAreaProps = React.ComponentPropsWithoutRef<"textarea"> & {
  id: string;
  label?: string;
};

function TextArea({ id, label, ...rest }: TextAreaProps) {
  return (
    <div className={classes["textarea"]}>
      {label && <label htmlFor={id}>{label}</label>}

      <textarea className={classes["textarea__input"]} id={id} {...rest} />
    </div>
  );
}

export default TextArea;
