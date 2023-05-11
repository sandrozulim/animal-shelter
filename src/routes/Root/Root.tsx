import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import classes from "./Root.module.scss";

function Root() {
  return (
    <>
      <Header />

      <main className={classes["main-content"]}>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
