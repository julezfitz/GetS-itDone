import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { UserContext } from "../Application.js";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

export default function MyProfile() {
  const { userDetails } = useContext(UserContext);

  const [update, setUpdate] = useState(false);

	// useEffect((() => {
    
	// 	axios
	// 		.post(`http://localhost:8001/users?userId=${userDetails.id}`)
	// 		.then(result => {
	// 		});
  // }));
  
	return (
		<Item className="search-results">
			<Box>
					<Typography id='modal-modal-title' variant='h6' component='h2' sx={{ textAlign: "center" }}>
						My Profile
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						<Box
							component='form'
							// onSubmit={handleSubmit}
							sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
							noValidate
							autoComplete='off'
						>
							<div>
								<TextField disabled id='outlined-required' name='firstName' value={userDetails.firstName} />
								<TextField disabled id='outlined-required' name='lastName' value={userDetails.lastName} />
								<TextField disabled id='outlined-required' name='email' value={userDetails.email} />
								<TextField disabled id='outlined-required' name='city' value={userDetails.city} />
                <TextField disabled id='outlined-required' name='province' value={userDetails.province} />
                <TextField disabled id='outlined-required' name='country' value={userDetails.country} />
							</div>
							<Button size='large' type="submit" value="Submit" variant='contained'>
								Update
							</Button>
						</Box>
					</Typography>
				</Box>
		</Item>
	);
}