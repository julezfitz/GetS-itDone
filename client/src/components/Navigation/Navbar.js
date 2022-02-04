import React, { useState } from "react";
import "./Navigation.scss";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import Searchbar from "./Searchbar";
import Register from "../User/Register";
import Login from "../User/Login";

export default function Navbar(props) {
  
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
            <button className="icon-button" onClick={props.openRegister}>Register</button>
            {/* <Register showRegister={props.showRegister} setShowRegister={props.setShowRegister} /> */}
          </div>
          <div className="nav-item">
            <button className="icon-button" onClick={props.openLogin}>Login</button>
            {/* <Login showLogin={props.showLogin} setShowLogin={props.setShowLogin} /> */}
          </div>
        </ul> 
      }
    </nav>
  );
}