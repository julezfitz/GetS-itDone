import React from "react";
import { Link } from "react-router-dom";

function Logo() {
	return (
		<Link to={"/"} style={{ marginRight: "3rem", color: "white" }}>
			Get S*it Done
		</Link>
	);
}

export default Logo;
