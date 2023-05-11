import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { UserContext } from "../../../contexts/UserContext";
import Button from "../../shared/Button/Button";
import classes from "./Navbar.module.scss";

type NavbarProps = {
  navList: { path: string; name: string; index?: boolean }[];
};

type LinkClasses = {
  isActive: boolean;
};

function Navbar({ navList }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isAdmin } = useContext(UserContext);

  const linkClasses = ({ isActive }: LinkClasses): string => {
    return isActive
      ? `${classes["nav__link"]} ${classes["nav__link--active"]}`
      : classes["nav__link"];
  };

  const links = navList.map((item) => (
    <li className={classes["nav__item"]} key={item.path}>
      <NavLink className={linkClasses} to={item.path} onClick={() => setIsExpanded(false)}>
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <>
      <Button className={classes["nav-icon-btn"]} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <AiOutlineClose /> : <TfiMenuAlt />}
      </Button>

      <nav className={`${classes["nav"]} ${isExpanded ? classes["nav--show"] : ""}`}>
        <ul className={classes["nav__list"]}>
          {links}

          {isAdmin && (
            <li className={classes["nav__item"]} key={"new-animal"}>
              <NavLink
                className={linkClasses}
                to={"new-animal"}
                onClick={() => setIsExpanded(false)}
              >
                {"new animal"}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
