import React from "react";
import { Menu, MenuItem, MenuList } from "@mui/material";

function UserMenu({ settings }) {
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
							setting.title === "Log Out" ? handleLogOut(toggleLoggedIn) : ""
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
