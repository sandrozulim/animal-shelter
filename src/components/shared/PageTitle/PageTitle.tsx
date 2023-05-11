import classes from "./PageTitle.module.scss";

type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return (
    <div className={classes["title"]}>
      <h2 className={classes["title__text"]}>{title}</h2>
    </div>
  );
}

export default PageTitle;
