import React from "react";
import "./Navigation.scss";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import Searchbar from "./Searchbar";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="site-name">
        <p>Get S*it Done</p>
      </ul>
      <ul className="search">
          <Searchbar/>
        </ul>
      <ul className="navbar-nav">
        <NavItem icon="P">
          <DropdownMenu />
        </NavItem>
      </ul>
    </nav>
  );
}