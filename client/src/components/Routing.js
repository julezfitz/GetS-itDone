import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoggedOutHome from "./LoggedOut/Landing/LoggedOut";
import { UserContext } from "./Application";
import SearchList from "./Search/SearchList";
import MyListings from "./Listings/MyListings";
import MyOffers from "./Offers/MyOffers";
import OffersList from "./Offers/OffersList";
import MyProfile from "./User/MyProfile";
import SearchWrapper from "./Search/SearchWrapper";
import Heading from "./Heading/Heading";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import TransitionWrapper from "./Transition/TransitionWrapper";

function Routing({ keywords, search, togglePending, emptySearch, location }) {
	const [headingTitle, setHeadingTitle] = useState(null);
	const { isLoggedIn, userPending } = useContext(UserContext);

	const pageInfo = [
		{
			headingTitle: "Search",
			path: "/",
		},
		{
			headingTitle: "My Offers",
			path: "/offers",
		},
		{
			headingTitle: "My Profile",
			path: "/profile",
		},
		{
			headingTitle: "My Listings",
			path: "/listings",
		},
	];

	useEffect(() => {
		for (let page of pageInfo) {
			if (page.path === location.pathname) {
				setHeadingTitle(page.headingTitle);
			}
		}
	}, [location]);

	return (
		<>
			{isLoggedIn && (
				<>
					<Heading
						size='medium'
						className='page-heading'
						color='light'
						style={{ marginBottom: 0, marginTop: "2rem" }}
					>
						{headingTitle}
					</Heading>
					<hr style={{ marginBottom: "5rem", marginTop: "1rem" }}></hr>
				</>
			)}
			<AnimatePresence exitBeforeEnter initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route
						path='/'
						element={
							isLoggedIn ? (
								search ? (
									<SearchWrapper
										keywords={keywords}
										togglePending={togglePending}
										emptySearch={emptySearch}
									/>
								) : (
									<SearchWrapper
										togglePending={togglePending}
										emptySearch={emptySearch}
									/>
								)
							) : (
								<>
									<LoggedOutHome />
									<Heading
										color='light'
										style={{
											fontSize: "1.8rem",
											justifyContent: "center",
											marginBottom: "5rem",
											position: "sticky",
											top: "0",
										}}
									>
										Browse listings
									</Heading>
									<SearchWrapper />
								</>
							)
						}
					/>
					<Route
						path='/profile'
						element={
							isLoggedIn ? <MyProfile /> : !userPending && <Navigate to='/' />
						}
					/>

					<Route
						path='/listings'
						element={
							isLoggedIn ? <MyListings /> : !userPending && <Navigate to='/' />
						}
					/>

					<Route
						path='/offers'
						element={
							isLoggedIn ? <MyOffers /> : !userPending && <Navigate to='/' />
						}
					/>

					<Route
						path='/listings/:id'
						element={
							isLoggedIn ? <OffersList /> : !userPending && <Navigate to='/' />
						}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default Routing;
