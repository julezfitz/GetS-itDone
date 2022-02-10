import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RegisterModal from "../User/Register";
import LoginModal from "../User/Login";
import NewListingModal from "../Listings/New";
import NewRatingModal from "../Ratings/NewRating";
import { Link } from "react-router-dom";
import { UserContext } from "../Application";

import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import SearchBar from "./SearchBar";

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
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [registerOpen, setRegisterOpen] = React.useState(false);
	const [loginOpen, setLoginOpen] = React.useState(false);
	const [newListingOpen, setNewListingOpen] = React.useState(false);
	const [newRatingOpen, setNewRatingOpen] = React.useState(false);

	const { isLoggedIn, userDetails, toggleLoggedIn } = useContext(UserContext);

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

	const loggedInProps = {
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
	};

	return (
		<AppBar position='fixed'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Link to={"/"}>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
						>
							Get S*it Done
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
					>
						Get S*it Done
					</Typography>
					<SearchBar onSearch={props.onSearch} value={props.searchValue} />
					<Box sx={{ flexGrow: 1 }} />

					{isLoggedIn ? (
						<LoggedInNav {...loggedInProps} />
					) : (
						<LoggedOutNav {...loggedOutProps} />
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
