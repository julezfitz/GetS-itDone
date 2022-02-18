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

export default function EditListingModal({
  open,
  handleClose,
  listing,
  handleUpdatedChange,
  edit,
}) {
  const { userDetails } = useContext(UserContext);

  const [editListing, setEditListing] = useState({
    creatorId: userDetails.id,
    listingId: listing.id,
    title: listing.title,
    description: listing.description,
    category: listing.category,
    price: listing.price,
    city: listing.city,
    postalCode: listing.postal_code,
    image_1: listing.image_1,
    image_2: listing.image_2,
    image_3: listing.image_3,
  });

  let editListingDetails;

  const [newCategory, setNewCategory] = useState("");

  const handleCategoryChange = (category) => {
    setNewCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let price = parseInt(e.target.elements.price.value);

    //add image urls to this once they are added to the form
    editListingDetails = {
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

    let listingId = editListing.listingId;

    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/listings/${listingId}`,
        editListingDetails
      )
      .then((result) => {
        if (newCategory) {
          let categoryForListing = {
            categoryId: newCategory,
            listingId: result.data.id,
          };

          axios
            .put(
              `${process.env.REACT_APP_SERVER_URL}/categories/listings`,
              categoryForListing
            )
            .then((result) => {
              handleUpdatedChange();
            });
        } else {
          handleUpdatedChange();
        }
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 15, top: 15 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 5, textAlign: "center", fontFamily: "Inter" }}
          >
            Edit Listing
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ "& .MuiTextField-root": { m: 1 }, position: "relative" }}
            noValidate
            autoComplete="off"
          >
            <FormGroup row sx={formGroupStyle}>
              <TextField
                required
                id="outlined-required"
                name="title"
                label="Title"
                defaultValue={editListing.title}
              />
            </FormGroup>
            <FormGroup row sx={formGroupStyle}>
              <CategoryList
                onSelect={handleCategoryChange}
                label={editListing.category}
                edit={edit}
              />
            </FormGroup>
            <FormGroup row sx={formGroupStyle}>
              <TextField
                required
                id="1c"
                multiline
                rows={2}
                label="Description"
                name="description"
                defaultValue={editListing.description}
              />
            </FormGroup>
            <FormGroup row sx={formGroupStyle}>
              <TextField
                required
                id="2c"
                name="city"
                label="City"
                defaultValue={editListing.city}
              />
              <TextField
                required
                id="3c"
                label="Postal Code"
                name="postalCode"
                defaultValue={editListing.postalCode}
              />
            </FormGroup>
            <FormGroup row sx={formGroupStyle}>
              <TextField
                required
                id="4c"
                label="Price"
                name="price"
                defaultValue={editListing.price}
              />
            </FormGroup>
            <FormGroup row sx={formGroupStyle}>
              <TextField
                id="5c"
                name="image_1"
                label="Image URL"
                defaultValue={editListing.image_1}
              />
            </FormGroup>
            <FormGroup row sx={formGroupStyle}>
              <TextField
                id="6c"
                name="image_2"
                label="Image URL 2"
                defaultValue={editListing.image_2}
              />
              <TextField
                id="7c"
                name="image_3"
                label="Image URL 3"
                defaultValue={editListing.image_3}
              />
            </FormGroup>

            <Button
              size="large"
              type="submit"
              value="Submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 5 }}
            >
              Save Listing Details
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
