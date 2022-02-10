import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";
import { GlobalStyles } from "../styles/globalStyles";

export const UserContext = createContext();

export default function Application() {
	//Do not remove - allows axios to receive cookies
	axios.defaults.withCredentials = true;

	//pending: true while we wait for server to respond with essential data - (do not load components until everything is in place)
	//isLoggedIn: represents the user's logged in state
	//details: the user's details, set to null if user is logged out

	const [globalState, setGlobalState] = useState({
		pending: true,
		user: {
			pending: true,
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
				pending: prev.user.pending,
			},
		}));
	};

	const togglePending = () => {
		console.log("hello has been pending!");
		setGlobalState(prev => ({
			...prev,
			user: {
				isLoggedIn: prev.user.isLoggedIn,
				details: prev.user.details,
				pending: !prev.user.pending,
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

			<Navbar onSearch={handleSearch} searchValue={search} />

			<main className={`content-wrapper nav-offset`}>
				<div className='content-width-wrapper'>
					<Routing
						keywords={search}
						search={search}
						togglePending={togglePending}
						emptySearch={() => setSearch("")}
					/>
					{/* <p className='main__text'>All results for: Home</p>
						<div>
							<span>Category:</span>
							<span>Sort By: Date</span>
						</div> */}
				</div>
			</main>
		</UserContext.Provider>
	);
}
