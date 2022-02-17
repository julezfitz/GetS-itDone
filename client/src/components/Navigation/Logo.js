import React from "react";
import { Box, Tooltip, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../logo.png";

function Logo() {
  return (
    <>
      <Box sx={{ paddingRight:"10px", maxWidth: "150px" }}>
        <Avatar src={logo} alt="Logo" sx={{ width: 70, height: 70 }}/>
      </Box>
      <Box sx={{ maxWidth: "250px" }}>
        <Link to={"/"} style={{ marginRight: "3rem", color: "white" }}>
          GetS*itDone
        </Link>
      </Box>
    </>
  );
}

export default Logo;
