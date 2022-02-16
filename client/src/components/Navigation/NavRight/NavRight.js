import { useEffect, useState } from "react";
import { Box, Button, Badge, Tooltip, IconButton, Avatar } from "@mui/material";
import NewListingModal from "../../Listings/New";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import UserMenu from "../UserMenu";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

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

	const getNotifications = () => {
		axios
			.get(`http://localhost:8001/notifications`, {
				params: { userId: userDetails.id },
			})
			.then((results) => {
				setNotifications(results.data);
			});
	}

	useEffect(() => {
		getNotifications();
	}, []);

	const navigate = useNavigate()

	const routeChange = (path) =>{ 
		navigate(path);
		window.scrollTo(0, 0)
	  }

	//toast trigger
	const notify = () => {

		for (const notice in notifications) {
			if (notifications[notice].notificationMessage === "Your offer has been declined.") {
				toast.error(<div onClick={() => {handleNotificationDismiss(notifications[notice].notificationId); 
					routeChange(`/offers`);}} style={{fontSize:'medium'}} id={notifications[notice].notificationId}>
						<b>Listing: "{notifications[notice].title}"</b>  
						<p>{notifications[notice].notificationMessage}</p></div>)
			}
			if (notifications[notice].notificationMessage === "Your offer has been accepted.") {
				toast.success(<div onClick={() => {handleNotificationDismiss(notifications[notice].notificationId); 
					routeChange(`/offers`);}} style={{fontSize:'medium'}} id={notifications[notice].notificationId}>
						<b>Listing: "{notifications[notice].title}"</b>  
						<p>{notifications[notice].notificationMessage}</p></div>)
			}
			if (notifications[notice].notificationMessage === "You have a new offer!") {
				toast.info(<div onClick={() => {handleNotificationDismiss(notifications[notice].notificationId); 
					routeChange(`/listings`);}} style={{fontSize:'medium'}} id={notifications[notice].notificationId}>
						<b>Listing: "{notifications[notice].title}"</b>  
						<p>{notifications[notice].notificationMessage}</p></div>)
			}
		}
	}

	const handleNotificationDismiss = (e) => {
		//get notification id
		console.log("handle notifications")
		let notificationId = e;

		//axios call here to set read status of notification to true
		axios.put(`http://localhost:8001/notifications/${notificationId}`).then(() => {
			setNotifications([]);
			getNotifications();
		})
	}

	return (
		<Box
			className="loggedIn-navRight"
			style={{ display: "flex", alignItems: "center" }}
		>
			<Box sx={{ maxWidth: "250px", display: { xs: "none", md: "flex" } }}>
				<>
					<Button
						variant="outlined"
						color="secondary"
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

					<Badge badgeContent={notifications.length} color="error" >
						<ToastContainer
							position="top-right"
							autoClose={10000}
							theme="dark"
							type="success"
							closeButton={false}
						/>
						<NotificationsIcon onClick={notify} />
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
