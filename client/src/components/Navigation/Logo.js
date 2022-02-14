import React from "react";
import { Box, Tooltip, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../logo.png";

function Logo() {
  return (
    <>
      <Box sx={{ paddingRight:"5px", maxWidth: "150px" }}>
        <Avatar src={logo} alt="Logo" />
      </Box>
      <Box sx={{ maxWidth: "250px" }}>
        <Link to={"/"} style={{ marginRight: "3rem", color: "white" }}>
          Get S*it Done
        </Link>
      </Box>
    </>
  );
}

export default Logo;
