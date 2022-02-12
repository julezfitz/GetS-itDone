import React, { useState, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { UserContext } from "../Application";
import LoggedInNav from "./LoggedInNav";
import NavLeft from "./NavLeft/NavLeft";
import SearchBar from "./SearchBar";
import NavRight from "./NavRight/NavRight";

const pages = ["Register", "Login"];

const settings = [
	{
		title: "My Profile",
		path: "/profile",
	},
	{
		title: "My Listings",
		path: "/listings",
	},
	{
		title: "My Offers",
		path: "/offers",
	},
	{
		title: "Log Out",
		path: "/",
	},
];

export default function ResponsiveAppBar(props) {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [registerOpen, setRegisterOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [newListingOpen, setNewListingOpen] = useState(false);
	const [newRatingOpen, setNewRatingOpen] = useState(false);

	const { isLoggedIn, userDetails, toggleLoggedIn, setModalOpen } =
		useContext(UserContext);

	const handleRegisterOpen = () => setRegisterOpen(true);
	const handleRegisterClose = () => setRegisterOpen(false);

	const handleLoginOpen = () => setLoginOpen(true);
	const handleLoginClose = () => setLoginOpen(false);

	const handleNewListingOpen = () => setNewListingOpen(true);
	const handleNewListingClose = () => setNewListingOpen(false);

	const handleNewRatingOpen = () => setNewRatingOpen(true);
	const handleNewRatingClose = () => setNewRatingOpen(false);

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const navRightProps = {
		newListingOpen,
		newRatingOpen,
		handleNewListingOpen,
		handleNewListingClose,
		handleNewRatingOpen,
		handleNewRatingClose,
		handleOpenUserMenu,
		handleCloseUserMenu,
		userDetails,
		anchorElUser,
		toggleLoggedIn,
		settings,
	};

	const loggedOutProps = {
		handleRegisterOpen,
		handleRegisterClose,
		registerOpen,
		loginOpen,
		handleLoginOpen,
		handleLoginClose,
		setModalOpen,
		isLoggedIn,
	};

	return (
		<AppBar position='fixed'>
			<Container maxWidth='xl'>
				<Toolbar
					disableGutters
					sx={{ justifyContent: `${isLoggedIn ? "space-between" : "start"}` }}
				>
					{/* {isLoggedIn ? (
						<SearchBar onSearch={props.onSearch} value={props.searchValue} />
					) : null} */}

					{isLoggedIn ? (
						<>
							<NavLeft isLoggedIn={isLoggedIn} />
							<NavRight {...navRightProps}/>
						</>
					) : (
						// <LoggedInNav {...loggedInProps} />

						<NavLeft {...loggedOutProps} />
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
