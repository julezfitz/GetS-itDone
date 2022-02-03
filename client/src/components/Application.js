import React, { useState } from "react";
import "./Application.scss";
import Navbar from './Navigation/Navbar';
import Register from "./Register/Register";

export default function Application() {
  const [showRegister, setShowRegister] = useState(false)

  const openRegister = () => {
    setShowRegister(prev => !prev);
  }

  return (
    <div className="app">
      <Navbar/>
      <div className="container">
        <button className="button" onClick={openRegister}>Register Modal</button>
        <Register showRegister={showRegister} setShowRegister={setShowRegister} />
      </div>
    </div>
  );
}