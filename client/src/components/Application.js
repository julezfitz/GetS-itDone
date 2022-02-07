import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import SearchList from "./Search/SearchList";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";

export default function Application() {
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
			<section>
				<Navbar />
			</section>
			<section>
				<Routing />
				<p className='main__text'>All results for: Home</p>
				<div>
					<span>Category:</span>
					<span>Sort By: Date</span>
				</div>
				<SearchList />
			</section>
		</div>
	);
}
