import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Button} from "@mui/material";

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

export default function RegisterModal({ open, handleClose }) {
  const [firstName, setFirstName] = useState("");

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
            Register an Account
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
                <TextField required id="outlined-required" label="Last Name" />
                <TextField required id="outlined-required" label="Email" />
                <TextField required id="outlined-required" label="City/Town" />
                <TextField required id="outlined-required" label="Postal Code" />
                <TextField required id="outlined-required" label="Country" />
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <TextField
                  required
                  id="outlined-password-input"
                  label="Password Confirmation"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <Button size="large" variant="contained" fullWidth>
                  Create Account
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}