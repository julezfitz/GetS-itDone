import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
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

function Routing() {
	const { isLoggedIn } = useContext(UserContext);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={isLoggedIn ? <SearchList /> : <LoggedOutHome />}
				/>
				<Route path='/create' element={<Create />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/search' element={<Search />} />
				<Route path='/listings' element={<UserListings />} />
				<Route path='/listings/:id' element={<UpdateListing />} />
				<Route path='/update/:id' element={<SingleListing />} />
			</Routes>
		</>
	);
}

export default Routing;
