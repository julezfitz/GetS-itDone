import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const MENULINKSTYLES = {
	textDecoration: "none",
	color: "inherit",
	height: "100%",
	width: "100%",
	textAlign: "left",
	padding: "0.6rem 2rem",
	transition: "300ms ease",
};

function UserMenu({
	settings,
	anchorElUser,
	handleCloseUserMenu,
	toggleLoggedIn,
}) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) {
			axios
				.post(`${process.env.REACT_APP_SERVER_URL}/user/logout`, {})
				.then(
					res => res.data.authentication.isLoggedOut && toggleLoggedIn(null)
				)
				.catch(err => console.log(err))
				.finally(setLoading(false));
		}
	}, [loading]);

	return (
		<Menu
			sx={{ mt: "45px" }}
			id='menu-appbar'
			anchorEl={anchorElUser}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={Boolean(anchorElUser)}
			onClose={handleCloseUserMenu}
		>
			{settings.map((setting, i) => (
				<MenuItem
					key={i}
					onClick={handleCloseUserMenu}
					sx={{
						padding: 0,
						"& p": { textAlign: "left" },
						transition: "300ms ease",
					}}
				>
					<Link
						key={i}
						to={setting.path}
						className='menuLink'
						style={MENULINKSTYLES}
						onClick={() =>
							setting.title === "Log Out" ? setLoading(true) : ""
						}
					>
						<Typography textAlign='center'>{setting.title}</Typography>
					</Link>
				</MenuItem>
			))}
		</Menu>
	);
}

export default UserMenu;
