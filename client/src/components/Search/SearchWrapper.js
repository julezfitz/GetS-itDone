import React, { useState, useEffect } from "react";
import SearchList from "./SearchList";
import CategoriesBar from "./Categories/CategoriesBar";
import { Box } from "@mui/material";
import axios from "axios";

function SearchWrapper({ keywords }) {
	const [listings, setListings] = useState([]);
	const [categories, setCategories] = useState([]);

	const [selectedChip, setSelectedChip] = useState({
		id: null,
		name: null,
	});

	const handleSelectedChip = (categoryId, categoryName) => {
		setSelectedChip({
			id: categoryId,
			name: categoryName,
		});
	};

	useEffect(() => {
		axios
			.get(`http://localhost:8001/listings/`, { params: { keywords } })
			.then(result => {
				setListings(result.data);
			});
	}, [keywords]);

	useEffect(() => {
		//Call for categories

		//Only display all listings if no chip is selected
		if (!selectedChip.id) {
			console.log('in here!')
			axios
				.get("http://localhost:8001/categories")
				.then(res => setCategories(res.data))
				.catch(err => console.log(err));
		}

		//Update listings according to chip selection
		if (selectedChip.id) {
			const categoryId = selectedChip.id;

			axios
				.get(`http://localhost:8001/listings/?category=${categoryId}`)
				.then(res => setListings(res.data))
				.catch(err => console.log(err));
		}
	}, [selectedChip]);

	const wrapperStyle = {
		display: "flex",
	};

	return (
		<Box className='search-view-wrapper' sx={wrapperStyle}>
			<SearchList keywords={keywords} listings={listings} />
			<CategoriesBar
				categories={categories}
				selectedChip={selectedChip}
				handleSelectedChip={handleSelectedChip}
			/>
		</Box>
	);
}

export default SearchWrapper;
