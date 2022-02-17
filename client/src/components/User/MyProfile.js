import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../Application.js";
import Error from "./Error";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TransitionWrapper from "../Transition/TransitionWrapper.js";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

export default function MyProfile() {
	const { userDetails, refreshUserDetails } = useContext(UserContext);

	// const [updateState, setUpdateState] = useState({
	//   firstName: userDetails.firstName,
	//   lastName: userDetails.lastName,
	//   email: userDetails.email,
	//   city: userDetails.city,
	//   province: userDetails.province,
	//   postalCode: userDetails.postalCode,
	//   country: userDetails.country,
	//   password: "",
	//   image: "",
	// });

	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(false);
	const [errors, setErrors] = useState(null);

	// const handleChange = (e) => {
	//   setErrors(null);
	//   setUpdateState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	// };

	const handleEditSubmit = e => {
		e.preventDefault();
		setUpdate(true);
	};

	const handleUpdateSubmit = e => {
		e.preventDefault();
		setLoading(true);
		axios
			.put(`http://localhost:8001/user/${userDetails.id}`, {
				firstName: e.target.elements.firstName.value,
				lastName: e.target.elements.lastName.value,
				email: e.target.elements.email.value,
				password: e.target.elements.password.value, //needs to add in password hashing for this to work
				city: e.target.elements.city.value,
				province: e.target.elements.province.value,
				postalCode: e.target.elements.postalCode.value,
				country: e.target.elements.country.value,
				image: e.target.elements.image.value,
			})
			.then(res => {
				refreshUserDetails();
			})
			.catch(err => setErrors(err))
			.finally(setLoading(false), setUpdate(false));
	};

	const imageStyle = {
		height: 250,
		width: 250,
		borderRadius: "50%",
		margin: "15px",
	};

	return (
		<TransitionWrapper>
			<Item className='search-results'>
				<Box sx={{padding: "3.4rem 2rem"}}>
					<Typography
						component={"span"}
						id='modal-modal-description'
						sx={{ mt: 2 }}
					>
						<Box
							component='form'
							onSubmit={update ? handleUpdateSubmit : handleEditSubmit}
							sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
							noValidate
							autoComplete='off'
						>
							{update ? (
								<>
									<div>
										<TextField
											required
											id='1p'
											label='First Name'
											name='firstName'
											defaultValue={userDetails.firstName}
										/>
										<TextField
											required
											id='2p'
											label='Last Name'
											name='lastName'
											defaultValue={userDetails.lastName}
										/>
										<TextField
											required
											id='3p'
											label='Email'
											name='email'
											defaultValue={userDetails.email}
										/>
										<TextField
											required
											id='4p'
											label='Password'
											name='password'
											type='password'
											defaultValue={userDetails.password}
										/>
										<TextField
											required
											id='5p'
											label='City'
											name='city'
											defaultValue={userDetails.city}
										/>
										<TextField
											required
											id='6p'
											label='Province'
											name='province'
											defaultValue={userDetails.province}
										/>
										<TextField
											required
											id='7p'
											label='Postal Code'
											name='postalCode'
											defaultValue={userDetails.postalCode}
										/>
										<TextField
											required
											id='8p'
											label='Country'
											name='country'
											defaultValue={userDetails.country}
										/>
										<TextField
											id='9p'
											label='Profile Picture URL'
											name='image'
											defaultValue={userDetails.image}
										/>
									</div>
									<Grid
										container
										direction='row'
										justifyContent='start'
										alignItems='center'
										sx={{marginTop: 3}}
									>
										<Grid item sx={{ m: 1 }}>
											<Button
												size='large'
												type='submit'
												value='Submit'
												color='secondary'
												variant='contained'
											>
												Update
											</Button>
										</Grid>
										<Grid item sx={{ m: 1 }}>
											<Button
												size='large'
												color='secondary'
												variant='contained'
												onClick={() => setUpdate(false)}
											>
												Cancel
											</Button>
										</Grid>
									</Grid>
								</>
							) : (
								<>
									<Grid container>
										<Grid item xs={3.5}>
											{userDetails.image ? (
												<Card>
													<CardMedia
														image={userDetails.image}
														title='profileImage'
														component='img'
														style={imageStyle}
													/>
												</Card>
											) : (
												<Avatar
													alt={userDetails.firstName}
													src='/static/images/avatar/1.jpg'
													sx={{
														width: 200,
														height: 200,
														fontSize: 70,
														marginTop: 2,
														marginLeft: 5,
													}}
												/>
											)}
										</Grid>
										<Grid item xs={5}>
											<Grid container direction='column'>
												<div>&nbsp;</div>
												<Typography variant='h3' component='h2'>
													{userDetails.firstName} {userDetails.lastName}
												</Typography>
												<Divider />
												<div>&nbsp;</div>
												<Typography variant='h6' component='span'>
													<b>{userDetails.email}</b>
												</Typography>
												<Typography variant='h6' component='div'>
													{userDetails.city}, {userDetails.province}
												</Typography>
												<Typography variant='h6' component='div'>
													{userDetails.country}
												</Typography>
											</Grid>
											<div>&nbsp;</div>
											<Button
												size='large'
												type='submit'
												value='Submit'
												color='secondary'
												variant='contained'
											>
												Edit
											</Button>
										</Grid>
									</Grid>
								</>
							)}
							{errors &&
								errors.map((err, i) => {
									return <Error key={i} errorMessage={err.message} />;
								})}
						</Box>
					</Typography>
				</Box>
			</Item>
		</TransitionWrapper>
	);
}
