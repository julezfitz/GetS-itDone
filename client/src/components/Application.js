import React, { useState, useEffect } from "react";
import "./Application.scss";
import Navbar from "./Navigation/Navbar";
import Register from "./User/Register";
import Login from "./User/Login";
import SearchList from "./Search/SearchList";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";

export default function Application() {
	const [showRegister, setShowRegister] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	const openLogin = () => {
		setShowLogin(prev => !prev);
	};

	const openRegister = () => {
		setShowRegister(prev => !prev);
	};

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
import axios from "axios";

export default function Application() {
	useEffect(() => {
		axios
			.get("http://localhost:8001/user/2")
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}, []);
	*/

	return (
		<div>
			<section className='app-nav'>
				<Navbar
					openRegister={openRegister}
					showRegister={showRegister}
					setShowRegister={setShowRegister}
					openLogin={openLogin}
					showLogin={showLogin}
					setShowLogin={setShowLogin}
				/>
				<Register
					showRegister={showRegister}
					setShowRegister={setShowRegister}
				/>
				<Login showLogin={showLogin} setShowLogin={setShowLogin} />
			</section>
			<main>
				<Routing />
				<section className='main'>
					<p className='main__text'>All results for: Home</p>
					<hr className='main__x-separator main--centered' />
					<div>
						<span className='main__text'>Category:</span>
						<span className='main__text'>Sort By: Date</span>
					</div>
					<SearchList />
				</section>
			</main>
		</div>
	);
}
