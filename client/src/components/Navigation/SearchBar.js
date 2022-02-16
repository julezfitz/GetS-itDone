import React, { useEffect, useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import { useNavigate } from "react-router";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchButton = styled(Button)(({ theme }) => ({
	border: "1px solid white",
	color: "white",
	position: "relative",
	height: "2.5rem",
	alignItems: "center",
	justifyContent: "center",
	padding: "0",

	"& a": {
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},

	"&:hover": {
		backgroundColor: "white",
		color: "black",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

function SearchBar({ onSearch, value }) {

	const searchRef = useRef(null);

	const navigate = useNavigate();

	const handleSearchSubmit = e => {
		e.preventDefault();
		navigate("/");
	};

	useEffect(() => {
		console.log(searchRef)
	}, [searchRef])

	return (
		<>
			<Box component='form' onSubmit={handleSearchSubmit} method='POST'>
				<Search sx={{ borderRadius: "50px", transition: "300ms ease" }} ref={searchRef}>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						autoFocus
						placeholder='Search…'
						inputProps={{ "aria-label": "search" }}
						onChange={onSearch}
						value={value}
					/>
				</Search>
			</Box>
		</>
	);
}

export default SearchBar;
