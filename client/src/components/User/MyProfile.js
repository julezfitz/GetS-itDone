import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { UserContext } from "../Application.js";
import Error from "./Error";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MyProfile() {
  const { userDetails } = useContext(UserContext);

  const [updateState, setUpdateState] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    city: userDetails.city,
    province: userDetails.province,
    postalCode: userDetails.postalCode,
    country: userDetails.country,
    password: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setErrors(null);
    setUpdateState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUpdate(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      axios
        .put(`http://localhost:8001/user?userId=${userDetails.id}`, updateState)
        .then((res) => {
          console.log(res);
          // 	res.data.registration.errors.length >= 1 &&
          // 		setErrors(res.data.registration.errors);
        })
        .catch((err) => setErrors(err))
        .finally(setLoading(false), setUpdate(false));
    }
  }, [loading]);

  return (
    <Item className="search-results">
      <Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          My Profile
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box
            component="form"
            onSubmit={update ? handleUpdateSubmit : handleEditSubmit}
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
          >
            {update ? (
              <>
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    name="firstName"
                    value={updateState.firstName}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    name="lastName"
                    value={updateState.lastName}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    name="email"
                    value={updateState.email}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    name="password"
                    value={updateState.password}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="City"
                    name="city"
                    value={updateState.city}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Province"
                    name="province"
                    value={updateState.province}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Postal Code"
                    name="postalCode"
                    value={updateState.postalCode}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Country"
                    name="country"
                    value={updateState.country}
                    onChange={handleChange}
                  />
                  <TextField
                    id="outlined-required"
                    label="Profile Picture"
                    name={updateState.image}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  size="large"
                  type="submit"
                  value="Submit"
                  variant="contained"
                >
                  Update
                </Button>
              </>
            ) : (
              <>
                <div>
                  <TextField
                    disabled
                    id="outlined-required"
                    name="firstName"
                    value={userDetails.firstName}
                  />
                  <TextField
                    disabled
                    id="outlined-required"
                    name="lastName"
                    value={userDetails.lastName}
                  />
                  <TextField
                    disabled
                    id="outlined-required"
                    name="email"
                    value={userDetails.email}
                  />
                  <TextField
                    disabled
                    id="outlined-required"
                    name="city"
                    value={userDetails.city}
                  />
                  <TextField
                    disabled
                    id="outlined-required"
                    name="province"
                    value={userDetails.province}
                  />
                  <TextField
                    disabled
                    id="outlined-required"
                    name="country"
                    value={userDetails.country}
                  />
                </div>
                <Button
                  size="large"
                  type="submit"
                  value="Submit"
                  variant="contained"
                >
                  Edit
                </Button>
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
  );
}