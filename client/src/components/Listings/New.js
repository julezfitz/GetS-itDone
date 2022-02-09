import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CategoryList from "../Categories/CategoryList";
import { Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Application.js";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function NewListingModal({ open, handleClose }) {

	const { userDetails } = useContext(UserContext);

	const [newListing, setNewListing] = useState({});

	let newListingDetails;
	
	const [category, setCategory] = useState("");

	const handleCategoryChange = (category) => {
		setCategory(category);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		//add image urls to this once they are added to the form
		newListingDetails = {
			"creatorId": userDetails.id,
			"title": e.target.elements.title.value,
			"description": e.target.elements.description.value,
			"price": e.target.elements.price.value,
			"city": e.target.elements.city.value,
			"province": e.target.elements.province.value,
			"postalCode": e.target.elements.postalCode.value,
		}
		console.log(category);
	};
	// .then(() => {
	// 	axios.post(`http://localhost:8001/listings`, newListingDetails)
	// })
	//.then((result) => {
	// 	console.log(result.data);
	// let categoryForListing = { "categoryId": category, "listingId": result.data.id}
	//	return axios.post(`http://localhost:8001/categories/listings`, categoryForListing)
	//.then((result) => {
	//	console.log(result.data);
	// })

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Create New Listing
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						<Box
							component='form'
							onSubmit={handleSubmit}
							sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
							noValidate
							autoComplete='off'
						>
							<div>
								<TextField required id='outlined-required' name='title' label='Title' />
								<CategoryList onSelect={handleCategoryChange} />
								<TextField
									required
									id='outlined-required'
									label='Description'
									name='description'
								/>
								<TextField required id='outlined-password-input' name='city' label='City' />
								<TextField
									required
									id='outlined-password-input'
									label='Postal Code'
									name='postalCode'
								/>
								<TextField
									required
									id='outlined-password-input'
									label='Price'
									name='price'
								/>
							</div>
							<Button size='large' type="submit" value="Submit" variant='contained' fullWidth>
								Create
							</Button>
						</Box>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
