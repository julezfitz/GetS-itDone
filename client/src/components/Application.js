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


/*
Matt's work below -- 

import "../styles/scss/Application.scss";
import { Routes, Route, Link } from "react-router-dom";
import {
	Profile,
	Search,
	UserOffers,
	UserListings,
	SingleListing,
	UpdateListing,
	Create,
} from "./Views/index";
import NavBar from "./Navigation/Navbar";

export default function Application() {
	return (
		<div className='App'>
			<NavBar />
			{ -- comment here -- <div className='demo-links'>
				<Link to={"/"}>Dashboard view</Link>
				<Link to='/create'>Create view</Link>
				<Link to='/profile'>Profile view</Link>
				<Link to={`/update/${2}`}>Update listing view</Link>
			</div> }
			<main className='content-wrapper'>
				<Routes>
					<Route path='/' element={<UserOffers />} />
					<Route path='/create' element={<Create />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/search' element={<Search />} />
					<Route path='/listings' element={<UserListings />} />
					<Route path='/listings/:id' element={<UpdateListing />} />
					<Route path='/update/:id' element={<SingleListing />} />
				</Routes>
			</main>
		</div>
	);
}
*/
