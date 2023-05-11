import { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Toggle from "../../shared/Toggle/Toggle";
import { GrUserAdmin } from "react-icons/gr";
import { UserContext } from "../../../contexts/UserContext";
import classes from "./Header.module.scss";

function Header() {
  const { isAdmin, setIsAdmin } = useContext(UserContext);

  const navList = [
    { path: "about", name: "About" },
    { path: "/", name: "Animals", index: true },
    { path: "donations", name: "Donations" },
    { path: "notifications", name: "Notifications" },
  ];

  return (
    <header className={classes["header"]}>
      <h1 className={classes["header__title"]}>Shelter</h1>

      <Navbar navList={navList} />

      <Toggle
        className={classes["header__toggle"]}
        id="admin"
        label={<GrUserAdmin />}
        checked={isAdmin}
        onChange={() => setIsAdmin(!isAdmin)}
      />
    </header>
  );
}

export default Header;
