import React, { useState } from "react";
import "./Navigation.scss";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import Searchbar from "./Searchbar";
import Register from "../User/Register";
import Login from "../User/Login";

export default function Navbar(props) {
  
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const openRegister = () => {
    setShowRegister(prev => !prev);
  };

  const openLogin = () => {
    setShowLogin(prev => !prev);
  };
  
  return (
    <nav className="navbar">
      <ul className="site-name">
        <p>Get S*it Done</p>
      </ul>
      <ul className="search">
        <Searchbar/>
      </ul>
      { props.userName ?
        <ul className="navbar-nav">
          <NavItem icon="P">
            <DropdownMenu />
          </NavItem>
        </ul>
      :
        <ul className="navbar-nav">
          <div className="nav-item">
            <button className="icon-button" onClick={openRegister}>Register</button>
            <Register showRegister={showRegister} setShowRegister={setShowRegister} />
          </div>
        <div className="nav-item">
          <button className="icon-button" onClick={openLogin}>Login</button>
          <Login showLogin={showLogin} setShowLogin={setShowLogin} />
        </div>
        </ul> 
      }
    </nav>
  );
}