import React, { useEffect, useState } from "react";
import "./Application.scss";
import Navbar from "./Navigation/Navbar";
import Register from "./User/Register";
import Login from "./User/Login";
import SearchList from "./Search/SearchList";
import axios from "axios";

export default function Application() {
	const [showRegister, setShowRegister] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	const openLogin = () => {
		setShowLogin(prev => !prev);
	};

	const openRegister = () => {
		setShowRegister(prev => !prev);
	};
	


	useEffect(() => {
		axios
			.put(`http://localhost:8001/user/${2}`, {
				firstName: "Johnny",
				lastName: "Smith",
				email: "jsmith@email.com",
				password: "password",
				city: "Toronto",
				province: "Ontario",
				postalCode: "A5T3BF",
				country: "Canada",
				image: "https://images.unsplash.com/profile.svg",
			})
			.then(res => console.log(res));
	}, []);

	return (
		<div>
			<section className='app-nav'>
				<Navbar
					openRegister={openRegister}
					showRegister={showRegister}
					setShowRegister={setShowRegister}
					openLogin={openLogin}
					showLogin={showLogin}
					setShowLogin={setShowLogin}
				/>
				<Register
					showRegister={showRegister}
					setShowRegister={setShowRegister}
				/>
				<Login showLogin={showLogin} setShowLogin={setShowLogin} />
			</section>
			<main>
				<section className='main'>
					<p className='main__text'>All results for: Home</p>
					<hr className='main__x-separator main--centered' />
					<div>
						<span className='main__text'>Category:</span>
						<span className='main__text'>Sort By: Date</span>
					</div>
					<SearchList />
				</section>
			</main>
		</div>
	);
}
