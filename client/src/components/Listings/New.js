import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CategoryList from "../Categories/CategoryList";
import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Application.js";
import { FormGroup } from "@mui/material";
import { toast } from 'react-toastify';
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 450,
	bgcolor: "background.paper",
	border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 10,
};

const formGroupStyle = {
	"& .MuiTextField-root": { flexGrow: 1 },
};

export default function NewListingModal({ open, handleClose }) {
	const { userDetails } = useContext(UserContext);

	// const [newListing, setNewListing] = useState({});

	let newListingDetails;

	const [category, setCategory] = useState("");

	const handleCategoryChange = category => {
		setCategory(category);
	};

	const handleSubmit = e => {
		e.preventDefault();

		let price = parseInt(e.target.elements.price.value);

		//add image urls to this once they are added to the form
		newListingDetails = {
			creatorId: userDetails.id,
			title: e.target.elements.title.value,
			description: e.target.elements.description.value,
			price: price,
			city: e.target.elements.city.value,
			province: userDetails.province,
			country: userDetails.country,
			postalCode: e.target.elements.postalCode.value,
			image_1: e.target.elements.image_1.value,
			image_2: e.target.elements.image_2.value,
			image_3: e.target.elements.image_3.value,
		};

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/listings`, newListingDetails)
      .then((result) => {
        let categoryForListing = {
          categoryId: category,
          listingId: result.data.id,
        };
        return axios.post(
          `${process.env.REACT_APP_SERVER_URL}/categories/listings`,
          categoryForListing
        );
      })
      .then((result) => {
        handleClose();
        notifyPost();
      });
  };

  const notifyPost = () => {
				toast.success(<div style={{fontSize:'medium'}}>
						<p>Success - Your listing is now live!</p></div>)
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
				<IconButton onClick={handleClose} sx={{ position: 'absolute', right: 15, top: 15, }}>
        	<CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 5, textAlign: "center", fontFamily: "Inter" }}
        >
          Create New Listing
        </Typography>

				<Box
					component='form'
					onSubmit={handleSubmit}
					sx={{ "& .MuiTextField-root": { m: 1 }, position: "relative" }}
					noValidate
					autoComplete='off'
				>
					<FormGroup row sx={formGroupStyle}>
						<TextField
							required
							id='outlined-required'
							name='title'
							label='Title'
						/>
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<CategoryList onSelect={handleCategoryChange} />
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<TextField
							required
							multiline
							rows={2}
							id='1c'
							label='Description'
							name='description'
						/>
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<TextField required id='2c' name='city' label='City' />
						<TextField required id='3c' label='Postal Code' name='postalCode' />
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<TextField required id='4c' label='Price' name='price' />
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<TextField id='5c' name='image_1' label='Image URL' />
					</FormGroup>
					<FormGroup row sx={formGroupStyle}>
						<TextField id='6c' name='image_2' label='Image URL 2' />
						<TextField id='7c' name='image_3' label='Image URL 3' />
					</FormGroup>

					<Button
						size='large'
						type='submit'
						value='Submit'
						variant='contained'
						color='secondary'
						fullWidth
						sx={{ mt: 5 }}
					>
						Create Listing
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
