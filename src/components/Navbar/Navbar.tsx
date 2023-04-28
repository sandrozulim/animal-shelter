import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import Button from "../Button/Button";
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
    return isActive ? `${classes["link"]} ${classes["active"]}` : classes["link"];
  };

  const links = navList.map((item) => (
    <li className={classes["nav-item"]} key={item.path}>
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

      <nav className={`${classes["nav-container"]} ${isExpanded ? classes["show"] : ""}`}>
        <ul className={classes["nav-list"]}>{links}</ul>
      </nav>
    </>
  );
}

export default Navbar;
