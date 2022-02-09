import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import SearchList from "./Search/SearchList";
import MyListings from "./Listings/MyListings";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";
import { GlobalStyles } from "../styles/globalStyles";
import { Box } from "@mui/material";
import ListingDetails from "./Listings/ListingDetails";

export const UserContext = createContext();

export default function Application() {
	//Do not remove - allows axios to receive cookies
	axios.defaults.withCredentials = true;

	const [globalState, setGlobalState] = useState({
		user: {
			isLoggedIn: false,
			details: {},
		},
	});

	const toggleLoggedIn = userDetails => {
		setGlobalState(prev => ({
			...prev,
			user: {
				isLoggedIn: !globalState.user.isLoggedIn,
				details: userDetails,
			},
		}));
	};

	const userControls = {
		toggleLoggedIn,
		isLoggedIn: globalState.user.isLoggedIn,
		userDetails: globalState.user.details,
	};

	// ********************
	// useEffect(() => {
	// 	axios.get(`http://localhost:8001/user/session`).then(res => console.log);
	// }, []);

	useEffect(() => {
		//Initial check to see if a cookie is set, change user state according to response
		if (!globalState.user.isLoggedIn) {
			axios
				.get(`http://localhost:8001/user/session`)
				.then(res => res.data.isAuthenticated && toggleLoggedIn(res.data.user))
				.catch(err => console.log(err));
		}
	}, []);

	const [search, setSearch] = useState("");

	const handleSearch = function (e) {
		setSearch(e.target.value);
	};

	return (
		<UserContext.Provider value={userControls}>
			<GlobalStyles />

			<section>
				<Navbar onSearch={handleSearch} />
			</section>
			<main className={`content-wrapper`}>
				<Box className='content-inner'>
					<section>
						<Routing keywords={search} search={search} />
						<p className='main__text'>All results for: Home</p>
						<div>
							<span>Category:</span>
							<span>Sort By: Date</span>
						</div>
					</section>
				</Box>
			</main>
		</UserContext.Provider>
	);
}
