import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import classes from "./Navbar.module.scss";

type NavbarProps = {
  navList: { path: string; name: string }[];
};

type LinkClasses = {
  isActive: boolean;
};

function Navbar({ navList }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const linkClasses = ({ isActive }: LinkClasses): string => {
    return isActive
      ? `${classes["link"]} ${classes["active"]}`
      : classes["link"];
  };

  const links = navList.map((item) => (
    <li className={classes["nav-item"]} key={item.path}>
      <NavLink
        className={linkClasses}
        onClick={() => setIsExpanded(false)}
        to={item.path}
      >
        {item.name}
      </NavLink>
    </li>
  ));

  const icons = isExpanded ? (
    <AiOutlineClose
      onClick={() => setIsExpanded(!isExpanded)}
      className={classes["nav-icon"]}
    />
  ) : (
    <AiOutlineMenu
      onClick={() => setIsExpanded(!isExpanded)}
      className={classes["nav-icon"]}
    />
  );

  return (
    <>
      {icons}

      <nav
        className={`${classes["nav-container"]} ${
          isExpanded ? classes["show"] : ""
        }`}
      >
        <ul>{links}</ul>
      </nav>
    </>
  );
}

export default Navbar;
