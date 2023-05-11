import classes from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({ children, className, onClick, disabled = false }: ButtonProps) {
  const btnClasses = className ? `${classes["btn"]} ${className}` : classes["btn"];

  return (
    <button className={btnClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
