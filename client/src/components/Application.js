import React from "react";
import "./Application.scss";
import { Routes, Route, Link } from "react-router-dom";

export default function Application() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Routes>
        <Route path="/"/>
        <Route path="/create"/>
        <Route path="/update/:id/"/>
        <Route path="/update/:id/"/>
      </Routes>
    </div>
  );
}
