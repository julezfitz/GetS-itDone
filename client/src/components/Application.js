import React, { useState, useEffect } from "react";
import Navbar from "./Navigation/Navbar";
import SearchList from "./Search/SearchList";
import axios from "axios";
import Routing from "./Routing";
import "normalize.css";
import { createContext } from "react";

export const UserContext = createContext();

export default function Application() {
	const [globalState, setGlobalState] = useState({
		user: {
			isLoggedIn: false,
			details: {},
		},
	});

	const toggleLoggedIn = () => {
		setGlobalState(prev => ({
			...prev,
			user: { isLoggedIn: !globalState.user.isLoggedIn },
		}));
	};

	const userControls = {
		toggleLoggedIn,
		isLoggedIn: globalState.user.isLoggedIn,
	};

	// // ********************
	// const [state, dispatch] = useReducer(reducer, {
	// 	day: "Monday",
	// 	days: [],
	// 	appointments: {},
	// 	interviewers: {},
	//   });
	
	// useEffect(() => {
	// 	axios.get(`http://localhost:8001/user/session`, {
	// 		params: {
	// 			email: , 
	// 			password: 
	// 		}
	// 	}).then(result => {
	// 		console.log(result);
	// 		dispatch({
	// 		});
	// 	});// // 
	// }, []);
	// ********************

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
					<SearchList />
				</section>
			</div>
		</UserContext.Provider>
	);
}
