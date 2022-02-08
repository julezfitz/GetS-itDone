import React, { useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import {
	Profile,
	Search,
	UserOffers,
	UserListings,
	SingleListing,
	UpdateListing,
	Create,
	LoggedOutHome,
} from "./Views/index";
import { UserContext } from "./Application";
import SearchList from "./Search/SearchList";
import MyListings from "./Listings/MyListings";

function Routing() {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={isLoggedIn ? <SearchList /> : <LoggedOutHome />}
				/>

				<Route
					path='/profile'
					element={isLoggedIn ? <Profile /> : <Navigate to='/' />}
				/>
				<Route path='/search' element={<Search />} />
				<Route
					path='/listings'
					element={isLoggedIn ? <MyListings /> : <Navigate to='/' />}
				/>
			</Routes>
		</>
	);
}

export default Routing;
