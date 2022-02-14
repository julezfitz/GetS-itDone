import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../logo.png";

function Logo() {
  return (
    //   <Box sx={{ maxWidth: "150px" }}>
    //     <Tooltip>
    //       <IconButton sx={{ p: 0, color: "white" }}>
    //        <img src={logo} alt="Logo" />
    //       </IconButton>
    //     </Tooltip>
    //   </Box>
      <Link to={"/"} style={{ marginRight: "3rem", color: "white" }}>
        Get S*it Done
      </Link>
  );
}

export default Logo;
