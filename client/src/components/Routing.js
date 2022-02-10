import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoggedOutHome from "./LoggedOut/Landing/LoggedOut";
import { UserContext } from "./Application";
import SearchList from "./Search/SearchList";
import MyListings from "./Listings/MyListings";
import MyOffers from "./Offers/MyOffers";
import OffersList from "./Offers/OffersList";
import MyProfile from "./User/MyProfile";

function Routing({ keywords, search, togglePending }) {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						isLoggedIn ? (
							search ? (
								<SearchList keywords={keywords} togglePending={togglePending} />
							) : (
								<SearchList togglePending={togglePending} />
							)
						) : (
							<>
								<LoggedOutHome />
								<SearchList />
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
					element={isLoggedIn ? <MyListings /> : () => <Navigate to='/' />}
				/>

				<Route
					path='/offers'
					element={isLoggedIn ? <MyOffers /> : () => <Navigate to='/' />}
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
