import { useEffect, useState } from "react";
import { Box, Button, Badge, Tooltip, IconButton, Avatar } from "@mui/material";
import NewListingModal from "../Listings/New";
import NewRatingModal from "../Ratings/NewRating";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UserMenu from "./UserMenu";
import axios from "axios";
import { UserContext } from "../Application.js";

function LoggedInNav({
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
}) {

	const [notifications, setNotifications] = useState([]);

	useEffect(() => {

		axios.get(`http://localhost:8001/notifications`, { params: { userId: userDetails.id } })
			.then((results) => {
				console.log(results.data);
				setNotifications(results.data);
			})
	}, []);

	return (
		<>
			<Box sx={{ maxWidth: "250px", display: { xs: "none", md: "flex" } }}>
				<>
					<Button
						key='CreateNewListing'
						onClick={handleNewListingOpen}
						sx={{ my: 2, color: "white", display: "block" }}
					>
						Create New Listing
					</Button>
					<NewListingModal
						open={newListingOpen}
						handleClose={handleNewListingClose}
					/>
				</>
			</Box>
			<Box sx={{ maxWidth: "250px", display: { xs: "none", md: "flex" } }}>
				<>
					<Button
						key='NewRating'
						onClick={handleNewRatingOpen}
						sx={{ my: 2, color: "white", display: "block" }}
					>
						New Rating
					</Button>
					<NewRatingModal
						open={newRatingOpen}
						handleClose={handleNewRatingClose}
					/>
				</>
			</Box>
			<Box
				sx={{
					maxWidth: "150px",
					padding: "0 24px",
					display: { xs: "none", md: "flex" },
				}}
			>
				<IconButton
					size='large'
					aria-label='show 4 new notifications'
					color='inherit'
				>
					<Badge badgeContent={notifications.length} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
			</Box>
			<Box sx={{ maxWidth: "150px" }}>
				<Tooltip title='Open settings'>
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt={userDetails.firstName}
							src='/static/images/avatar/2.jpg'
						/>
					</IconButton>
				</Tooltip>
				<UserMenu
					settings={settings}
					handleCloseUserMenu={handleCloseUserMenu}
					anchorElUser={anchorElUser}
					toggleLoggedIn={toggleLoggedIn}
				/>
			</Box>
		</>
	);
}

export default LoggedInNav;
