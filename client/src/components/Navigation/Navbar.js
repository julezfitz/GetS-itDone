import React from "react";
import "./Navigation.scss";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
// import SearchBar from "../../helpers/SearchBar";

export default function Navbar(props) {
  return (
    <nav className="navbar">
      {/* <p>Get S*it Done</p> */}
      <ul className="navbar-nav">
        <NavItem icon="L"/>
        <NavItem icon="S"/>
        <NavItem icon="P">
          <DropdownMenu />
        </NavItem>
      </ul>
    </nav>
  );
}