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

function Routing({ keywords, search, togglePending, emptySearch }) {
	const [headingTitle, setHeadingTitle] = useState(null);
	const { isLoggedIn } = useContext(UserContext);
	const location = useLocation();

	const pageInfo = [
		{
			headingTitle: "Search Results",
			path: "/",
		},
		{
			headingTitle: "Offers",
			path: "/offers",
		},
		{
			headingTitle: "Profile",
			path: "/profile",
		},
		{
			headingTitle: "Listings",
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
				<Heading size='medium' className='page-heading'>
					My {headingTitle}
				</Heading>
			)}
			<Routes>
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
								<SearchWrapper />
							</>
						)
					}
				/>

				<Route
					path='/profile'
					element={isLoggedIn ? <MyProfile /> : <Navigate to='/' />}
				/>

				<Route
					path='/listings'
					element={isLoggedIn ? <MyListings /> : <Navigate to='/' />}
				/>

				<Route
					path='/offers'
					element={isLoggedIn ? <MyOffers /> : <Navigate to='/' />}
				/>

				<Route
					path='/listings/:id'
					element={isLoggedIn ? <OffersList /> : <Navigate to='/' />}
				/>
			</Routes>
		</>
	);
}

export default Routing;
