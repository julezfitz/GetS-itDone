import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CategoryList from "../Categories/CategoryList";
import { Button } from "@mui/material";

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
							sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
							noValidate
							autoComplete='off'
						>
							<div>
								<TextField required id='outlined-required' label='Title' />
								<CategoryList />
								<TextField
									required
									id='outlined-required'
									label='Description'
								/>
								<TextField required id='outlined-password-input' label='City' />
								<TextField
									required
									id='outlined-password-input'
									label='Postal Code'
								/>
								<TextField
									required
									id='outlined-password-input'
									label='Price'
								/>
							</div>
							<Button size='large' variant='contained' fullWidth>
								Create
							</Button>
						</Box>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
