import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function Application() {

	useEffect(() => {
		axios.post("http://localhost:8001/user/session", {
			email: 'matthewparisien4@gmail.com',
			password: 'password'
		})
	}, [])

	return (
		<div className='App'>
			<NavBar />
			{/* <div className='demo-links'>
				<Link to={"/"}>Dashboard view</Link>
				<Link to='/create'>Create view</Link>
				<Link to='/profile'>Profile view</Link>
				<Link to={`/update/${2}`}>Update listing view</Link>
			</div> */}
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
