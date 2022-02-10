import React, { useState, useEffect } from "react";
import SearchList from "./SearchList";
import CategoriesBar from "./Categories/CategoriesBar";
import { Box } from "@mui/material";
import axios from "axios";

function SearchWrapper({ keywords }) {
	const [listings, setListings] = useState([]);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:8001/listings/`, { params: { keywords } })
			.then(result => {
				setListings(result.data);
			});

		axios
			.get("http://localhost:8001/categories")
			.then(res => setCategories(res.data))
			.catch(err => console.log(err));
	}, [keywords]);

	const wrapperStyle = {
		display: "flex",
	};

	return (
		<Box className='search-view-wrapper' sx={wrapperStyle}>
			<SearchList keywords={keywords} listings={listings} />
			<CategoriesBar categories={categories} />
		</Box>
	);
}

export default SearchWrapper;
