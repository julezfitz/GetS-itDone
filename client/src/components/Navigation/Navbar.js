import React, { useState } from "react";
import "./Navigation.scss";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import Searchbar from "./Searchbar";
import Register from "../Register/Register";

export default function Navbar(props) {
  
  const [showRegister, setShowRegister] = useState(false);

  const openRegister = () => {
    setShowRegister(prev => !prev);
  };
  
  return (
    <nav className="navbar">
      <ul className="site-name">
        <p>Get S*it Done</p>
      </ul>
      <ul className="search">
        <Searchbar/>
      </ul>
      <ul className="navbar-nav">
        <div className="nav-item">
          <button className="icon-button" onClick={openRegister}>R</button>
          <Register showRegister={showRegister} setShowRegister={setShowRegister} />
        </div>
        <NavItem icon="P">
          <DropdownMenu />
        </NavItem>
      </ul>
    </nav>
  );
}