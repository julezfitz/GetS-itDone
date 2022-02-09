import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoggedOutHome from "./LoggedOut/Landing/LoggedOut";
import { UserContext } from "./Application";
import SearchList from "./Search/SearchList";
import MyListings from "./Listings/MyListings";
import OffersList from "./Offers/OffersList";

function Routing({ keywords, search, togglePending }) {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<>
			<Routes>
				{/* <Route
					path='/'
					element={
						isLoggedIn ? (
							search ? (
								<SearchList keywords={keywords} />
							) : (
								<SearchList />
							)
						) : (
							<>
								<LoggedOutHome />
								<SearchList />
							</>
						)
					}
				/> */}

				{/* <Route
					path='/profile'
					element={isLoggedIn ? <Profile /> : <Navigate to='/' />}
				/> */}

				<Route
					path='/listings'
					element={isLoggedIn ? <MyListings /> : () => <Navigate to='/' />}
				/>

				<Route
					path='/offers'
					element={isLoggedIn ? <OffersList /> : () => <Navigate to='/' />}
				/>

				<Route
					path='/listings/:id'
					element={isLoggedIn ? <OffersList /> : () => <Navigate to='/' />}
				/>
			</Routes>
		</>
	);
}

export default Routing;
