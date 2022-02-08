import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuList, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function UserMenu({ settings, anchorElUser, handleCloseUserMenu }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (loading) {
			axios
				.post("http://localhost:8001/user/logout")
				.then(res => console.log(res))
				.catch(err => console.log(err));
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
				<MenuItem key={i} onClick={handleCloseUserMenu}>
					<Link
						key={i}
						to={setting.path}
						className='menuLink'
						style={{ textDecoration: "none", color: "inherit" }}
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
