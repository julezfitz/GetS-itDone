import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Application.js";
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

export default function NewRatingModal({ open, handleClose }) {
  const [rating, setRating] = useState('');

  const { userDetails } = useContext(UserContext);

  const handleChange = (event) => {
    setRating(event.target.value);
    console.log(event.target.value);
  };

  const [starRating, setStarRating] = useState(0);
  const [starRatingHover, setStarRatingHover] = useState(-1);

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Okay",
    4: "Good",
    5: "Excellent",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // newRatingDetails = {
    //   "raterId": userDetails.id,
    //   "rateeId": ,
    //   "listingId": ,
    //   "rating": starRating,
    //   "comment": e.target.elements.comments.value,
    // }

    // axios.post(`http://localhost:8001/ratings`, newRatingDetails)
    // .then((results) => {
    // 	console.log(results.data);
    // })
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rating
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Typography component="legend">
                Your feedback matters. Rate your experience with Jane Doe.
              </Typography>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  required
                  value={starRating}
                  precision={1}
                  onChange={(event, newValue) => {
                    setStarRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setStarRatingHover(newHover);
                  }}
                />
                {starRating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {
                      labels[
                      starRatingHover !== -1 ? starRatingHover : starRating
                      ]
                    }
                  </Box>
                )}
                <Button size='large' type="submit" value="Submit" variant='contained' fullWidth>
                  Submit
                </Button>
              </Box>
              <Divider />
              <TextField
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                name='comments'
              />
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}