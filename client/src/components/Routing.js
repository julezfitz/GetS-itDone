import React, { useContext, useEffect, useState, useRef } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoggedOutHome from "./LoggedOut/Landing/LoggedOut";
import { UserContext } from "./Application";

import MyListings from "./Listings/MyListings";
import MyOffers from "./Offers/MyOffers";
import OffersList from "./Offers/OffersList";
import MyProfile from "./User/MyProfile";
import SearchWrapper from "./Search/SearchWrapper";
import Heading from "./Heading/Heading";
import { AnimatePresence, motion } from "framer-motion";
import { Divider } from "@mui/material";
import useSplit from "../helpers/hooks/useSplit";
import { headingAnimation } from "../helpers/animations/animations";
import gsap from "gsap";

function Routing({ keywords, search, emptySearch, location }) {
	const [headingTitle, setHeadingTitle] = useState(null);
	const { isLoggedIn, userPending } = useContext(UserContext);
	const searchListRefs = useRef([]);
	const splitHeadingRef = useRef(null);
	const timelineRef = useRef(gsap.timeline());
	const [isSplit, words, chars, splitCount] = useSplit(
		[splitHeadingRef.current],
		{ type: "chars", charsClass: "char" }
	);

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
						style={{
							marginBottom: 0,
							marginTop: "2rem",

							overflow: "hidden",
						}}
						ref={splitHeadingRef}
					>
						{headingTitle}
					</Heading>
					<Divider
						sx={{ marginBottom: "5rem", marginTop: "1rem" }}
						color='white'
					/>
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
										emptySearch={emptySearch}
									/>
								) : (
									<SearchWrapper emptySearch={emptySearch} />
								)
							) : (
								<>
									<LoggedOutHome />
									<div
										className='scroll-wrapper'
										data-scroll
										data-scroll-speed={2}
									>
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
									</div>
									search ? (
									<SearchWrapper
										keywords={keywords}
										emptySearch={emptySearch}
									/>
								) : (
									<SearchWrapper
										emptySearch={emptySearch}
									/>
								)
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
