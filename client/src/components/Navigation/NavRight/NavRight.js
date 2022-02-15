import { useEffect, useState } from "react";
import { Box, Button, Badge, Tooltip, IconButton, Avatar } from "@mui/material";
import NewListingModal from "../../Listings/New";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import UserMenu from "../UserMenu";
import axios from "axios";

export default function NavRight({
	newListingOpen,
	handleNewListingOpen,
	handleNewListingClose,
	handleOpenUserMenu,
	handleCloseUserMenu,
	userDetails,
	anchorElUser,
	toggleLoggedIn,
	settings,
}) {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:8001/notifications`, {
				params: { userId: userDetails.id },
			})
			.then((results) => {
				setNotifications(results.data);
			});
	}, []);

	return (
		<Box
			className="loggedIn-navRight"
			style={{ display: "flex", alignItems: "center" }}
		>
			<Box sx={{ maxWidth: "250px", display: { xs: "none", md: "flex" } }}>
				<>
					<Button
						variant="contained"
						color="secondary"
						size="large"
						key="CreateNewListing"
						onClick={handleNewListingOpen}
						sx={{
							my: 2,
							color: "white",
							display: "flex",
							alignItems: "center",
						}}
					>
						<AddIcon /> New Listing
					</Button>
					<NewListingModal
						open={newListingOpen}
						handleClose={handleNewListingClose}
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
					size="large"
					aria-label="show 4 new notifications"
					color="inherit"
				>
					<Badge badgeContent={notifications.length} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
			</Box>
			<Box sx={{ maxWidth: "150px" }}>
				<Tooltip title="Menu">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar
							alt={userDetails.firstName}
							src={userDetails.image}
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
		</Box>
	);
}
