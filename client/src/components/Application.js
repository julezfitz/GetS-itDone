import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navigation/Navbar";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";
import { GlobalStyles } from "../styles/globalStyles";
import { Container } from "@mui/material";
import RegisterModal from "./User/Registration/Register";
import LoginModal from "./User/Login/Login";
import LoadingScreen from "./Loading/LoadingScreen";
import Footer from "./Footer/Footer";
import { Box } from "@mui/material";
import Rails from "./Rails/Rails";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { useLocation } from "react-router";

export const UserContext = createContext();

export default function Application() {
	//Do not remove - allows axios to receive cookies
	axios.defaults.withCredentials = true;

	//Track page changes
	const location = useLocation();

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

	//For locomotive scroll
	const scrollRef = useRef(null);

	//function to update user details when the user updates their profile
	const refreshUserDetails = id => {
		const userId = id ?? globalState.user?.details?.id;
		return axios.get(`http://localhost:8001/user/${userId}`).then(results => {
			setGlobalState(prev => ({
				...prev,
				user: {
					...prev.user,
					details: results.data.user,
				},
			}));
		});
	};

	const toggleLoggedIn = userDetails => {
		console.log(userDetails)
		window.scrollTo({ top: 0 });

		setGlobalState(prev => ({
			...prev,
			user: {
				details: userDetails ? userDetails : {},
				entries: {
					currentModal: null,
				},
				isLoggedIn: !globalState.user.isLoggedIn,
				pending: false,
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
				pending: prev.user.pending,
			},
		}));
	};

	const [search, setSearch] = useState("");

	const handleSearch = function (e) {
		setSearch(e.target.value);
	};

	const userControls = {
		userPending: globalState.user.pending,
		toggleLoggedIn,
		isLoggedIn: globalState.user.isLoggedIn,
		userDetails: globalState.user.details,
		offers: globalState.offers,
		getUserOffers,
		refreshUserDetails,
		setModalOpen,
		searchValue: search,
		handleSearch,
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });

		//Initial check to see if a cookie is set, change user state according to response
		if (!globalState.user.isLoggedIn) {
			axios
				.get(`http://localhost:8001/user/session`)
				.then(res =>
					res.data.isAuthenticated
						? refreshUserDetails(res.data.user.id).then(() =>
								toggleLoggedIn(res.data.user)
						  )
						: setGlobalState(prev => ({
								...prev,
								user: {
									...prev.user,
									pending: false,
								},
						  }))
				)
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
		<LocomotiveScrollProvider
			options={{
				smooth: true,
				// ... all available Locomotive Scroll instance options
			}}
			watch={[location.pathname]}
			containerRef={scrollRef}
		>
			<UserContext.Provider value={userControls}>
				<GlobalStyles isLoggedIn={globalState.user.isLoggedIn} />
				<LoadingScreen isActive={globalState.user.pending} />

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
				<div
					className='scroller'
					data-scroll-container
					ref={scrollRef}
					style={{ marginBottom: "10rem" }}
				>
					<Box
						component='main'
						className={`content-wrapper ${
							globalState.user.isLoggedIn ? "nav-offset" : ""
						}`}
					>
						<Container maxWidth='xl' sx={{ height: "100%" }}>
							<Routing
								keywords={search}
								search={search}
								emptySearch={() => setSearch("")}
								location={location}
							/>
							{/* <p className='main__text'>All results for: Home</p>
						<div>
							<span>Category:</span>
							<span>Sort By: Date</span>
						</div> */}
						</Container>
						<Rails />
					</Box>
					<Footer />
				</div>
			</UserContext.Provider>
		</LocomotiveScrollProvider>
	);
}
