import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";
import { GlobalStyles } from "../styles/globalStyles";
import { Container } from "@mui/material";
import RegisterModal from "./User/Registration/Register";
import LoginModal from "./User/Login";
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
			pending: true,
			entries: {
				currentModal: null,
			},
			isLoggedIn: false,
			details: {},
		},
		offers: [],
	});

	const toggleLoggedIn = userDetails => {
		setGlobalState(prev => ({
			...prev,
			user: {
				pending: false,
				entries: {
					currentModal: null,
				},
				isLoggedIn: !globalState.user.isLoggedIn,
				details: userDetails,
			},
		}));
	};

	const getUserOffers = () => {
		axios
			.get(
				`http://localhost:8001/offers?bidderId=${globalState.user.details.id}`
			)
			.then(results => {
				setGlobalState(prev => ({
					...prev,
					offers: results.data,
				}));
			});
	};

	const setModalOpen = entryPoint => {
		setGlobalState(prev => ({
			...prev,
			user: {
				entries: {
					currentModal: entryPoint,
				},
				isLoggedIn: prev.user.isLoggedIn,
				details: prev.user.details,
			},
		}));
	};

	const [search, setSearch] = useState("");

	const handleSearch = function (e) {
		setSearch(e.target.value);
	};

	const userControls = {
		
		toggleLoggedIn,
		userPending: globalState.user.pending,
		isLoggedIn: globalState.user.isLoggedIn,
		userDetails: globalState.user.details,
		offers: globalState.offers,
		getUserOffers,
		setModalOpen,
		searchValue: search,
		handleSearch,
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
		if (globalState.user?.details?.id) {
			getUserOffers();
		}
	}, [globalState.user?.details?.id]);

	return (
		<UserContext.Provider value={userControls}>
			<GlobalStyles isLoggedIn={globalState.user.isLoggedIn} />
			<LoadingScreen/>
			<div className='modals'>
				<LoginModal
					open={globalState.user.entries.currentModal === "logIn"}
					setModalOpen={setModalOpen}
				/>
				<RegisterModal
					open={globalState.user.entries.currentModal === "register"}
					setModalOpen={setModalOpen}
				/>
			</div>
			<Navbar onSearch={handleSearch} searchValue={search} />

			<main
				className={`content-wrapper ${
					globalState.user.isLoggedIn ? "nav-offset" : ""
				}`}
			>
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
