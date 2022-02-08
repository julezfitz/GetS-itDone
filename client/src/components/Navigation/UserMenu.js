import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuList, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const MENULINKSTYLES = {
	textDecoration: "none",
	color: "inherit",
	height: "100%",
	width: "100%",
	textAlign: "left",
	padding: "0.6rem 2rem"

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
			console.log("in here!");
			axios
				.post("http://localhost:8001/user/logout", {})
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
				<MenuItem key={i} onClick={handleCloseUserMenu} sx={{padding: 0}}>
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
