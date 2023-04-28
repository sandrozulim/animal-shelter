import classes from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

function Button({ children, className, onClick }: ButtonProps) {
  const btnClasses = className ? `${classes["btn"]} ${className}` : classes["btn"];

  return (
    <button className={btnClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
