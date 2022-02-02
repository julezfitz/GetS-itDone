import React, { useState } from "react";
import "./Application.scss";
import { Routes, Route, Link } from "react-router-dom";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Update from "./pages/Update";
import Search from "./pages/Search";
import NavBar from "./Navigation/Navbar";

export default function Application() {
	return (
		<div className='App'>
			<NavBar/>
			{/* <div className='demo-links'>
				<Link to={"/"}>Dashboard view</Link>
				<Link to='/create'>Create view</Link>
				<Link to='/profile'>Profile view</Link>
				<Link to={`/update/${2}`}>Update listing view</Link>
			</div> */}
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/create' element={<Create />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/search' element={<Search />} />
				<Route path='/update/:id' element={<Update />} />
			</Routes>
		</div>
	);
}
