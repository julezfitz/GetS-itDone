import React from "react";
import "./Application.scss";
import { Routes, Route, Link } from "react-router-dom";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Update from "./pages/Update";

export default function Application() {
	return (
		<div className='App'>
			<header className='App-header'>
				<p>
					Edit <code>src/App.js</code> and save reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
      <div className="demo-links">
        <Link to={"/"}>Dashboard view</Link>
        <Link to="/create">Create view</Link>
        <Link to="/profile">Profile view</Link>
        <Link to="/update/:id">Update view</Link>
      </div>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/create' element={<Create />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/update/:id/' element={<Update />} />
			</Routes>
		</div>
	);
}
