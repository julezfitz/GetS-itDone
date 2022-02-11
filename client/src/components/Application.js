import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";
import { GlobalStyles } from "../styles/globalStyles";
import { Container } from "@mui/material";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

export const UserContext = createContext();

export default function Application() {
	//Do not remove - allows axios to receive cookies
	axios.defaults.withCredentials = true;

	//pending: true while we wait for server to respond with essential data - (do not load components until everything is in place)
	//isLoggedIn: represents the user's logged in state
	//details: the user's details, set to null if user is logged out

	const [globalState, setGlobalState] = useState({
		user: {
			isLoggedIn: false,
			details: {},
		},
		offers: []
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

	const getUserOffers = () => {
		axios.get(`http://localhost:8001/offers?bidderId=${globalState.user.details.id}`)
			.then((results) => {
				setGlobalState(prev => ({
					...prev,
					offers: results.data,
				}))
			})
	}

	const userControls = {
		toggleLoggedIn,
		isLoggedIn: globalState.user.isLoggedIn,
		userDetails: globalState.user.details,
		offers: globalState.offers,
		getUserOffers
	};

	useEffect(() => {
		// setPending(globalState.user.isLoggedIn ? false : true);

		//Initial check to see if a cookie is set, change user state according to response
		if (!globalState.user.isLoggedIn) {
			axios
				.get(`http://localhost:8001/user/session`)
				.then(res => res.data.isAuthenticated && toggleLoggedIn(res.data.user))
				.catch(err => console.log(err));
		}
	}, []);

	//	set global state of user's offers
	useEffect(() => {
		if (globalState.user.details.id) {
			axios.get(`http://localhost:8001/offers?bidderId=${globalState.user.details.id}`)
				.then((results) => {
					setGlobalState(prev => ({
						...prev,
						offers: results.data,
					}))
				})
		}
	}, [globalState.user.details.id]);

	const [search, setSearch] = useState("");

	const handleSearch = function (e) {
		setSearch(e.target.value);
	};

	return (
		<UserContext.Provider value={userControls}>
			<GlobalStyles isLoggedIn={globalState.user.isLoggedIn} />

			<Navbar onSearch={handleSearch} searchValue={search} />

			<main className={`content-wrapper nav-offset`}>
				<Container maxWidth='xl' sx={{ height: "100%" }}>
					<Routing
						keywords={search}
						search={search}
						emptySearch={() => setSearch("")}
					/>
					{/* <p className='main__text'>All results for: Home</p>
						<div>
							<span>Category:</span>
							<span>Sort By: Date</span>
						</div> */}
				</Container>
			</main>
		</UserContext.Provider>
	);
}
