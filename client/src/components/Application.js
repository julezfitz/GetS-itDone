import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import SearchList from "./Search/SearchList";
import MyListings from './Listings/MyListings';
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";

export const UserContext = createContext();

export default function Application() {
	//Do not remove - allows axios to receive cookies
	axios.defaults.withCredentials = true;

	const [globalState, setGlobalState] = useState({
		user: {
			isLoggedIn: false,
			details: {},
		},
	});

	const toggleLoggedIn = userDetails => {
		console.log(globalState.user.isLoggedIn);
		setGlobalState(prev => ({
			...prev,
			user: {
				isLoggedIn: !globalState.user.isLoggedIn,
				details: userDetails,
			},
		}));
	};

	const userControls = {
		toggleLoggedIn,
		isLoggedIn: globalState.user.isLoggedIn,
		userDetails: globalState.user.details,
	};

	// // ********************
	//Julie working out how to make calls to db to set state for multiple things
	// const [categories, setCategories] = useState({
	//   status: "loading",
	//   data: null,
	//   errors: null
	// });

	// useEffect(() => {
	// 	axios.get(`http://localhost:8001/categories`).then(result => {
	//     setDataInfo({
	//     status: "fetched",
	//     data: result.data,
	//     error: null
	//   });
	// 	}).catch((err) => {
	//   console.error('Failed to fetch remote data: ', err);
	//   return setCategories({
	//     status: "error",
	//     data: null,
	//     error: err
	//   });;// //
	// }, []);
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

	return (
		<UserContext.Provider value={userControls}>
			<div>
				<section>
					<Navbar />
				</section>
				<section>
					<Routing />
					<p className='main__text'>All results for: Home</p>
					<div>
						<span>Category:</span>
						<span>Sort By: Date</span>
					</div>
					{/* <SearchList /> */}
					<MyListings />
				</section>
			</div>
		</UserContext.Provider>
	);
}
