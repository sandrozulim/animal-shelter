import Navbar from "../Navbar/Navbar";
import classes from "./Header.module.scss";

function Header() {
  const navList = [
    { path: "about", name: "About" },
    { path: "animals", name: "Animals" },
    { path: "donations", name: "Donations" },
    { path: "notifications", name: "Notifications" },
  ];

  return (
    <header className={classes["header"]}>
      <h1 className={classes["title"]}>Shelter</h1>
      <Navbar navList={navList} />
    </header>
  );
}

export default Header;
