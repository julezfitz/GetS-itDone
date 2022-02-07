import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";

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
  const [rating, setRating] = React.useState('');

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const [starRating, setStarRating] = React.useState(0);
  const [starRatingHover, setStarRatingHover] = React.useState(-1);

  const labels = {
    1: "Useless",
    2: "Poor",
    3: "Okay",
    4: "Good",
    5: "Excellent",
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
              </Box>
              <Divider />
              <TextField
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
              />
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}