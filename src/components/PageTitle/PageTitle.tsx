import classes from "./PageTitle.module.scss";

type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return <h2 className={classes["title"]}>{title}</h2>;
}

export default PageTitle;
