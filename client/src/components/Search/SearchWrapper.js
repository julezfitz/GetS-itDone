import React, { useState, useEffect } from "react";
import SearchList from "./SearchList";
import CategoriesBar from "./Categories/CategoriesBar";
import { Box } from "@mui/material";
import axios from "axios";

function SearchWrapper({ keywords, emptySearch, setCleared }) {
	const [listings, setListings] = useState([]);
	const [categories, setCategories] = useState([]);
	const [currentCategories, setCurrentCategories] = useState([]);
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

	const handleClearSelection = () => {
		emptySearch();
		setSelectedChip({
			id: null,
			name: null,
		});
	};

	useEffect(() => {
		//If no chip is selected we can fetch all listings
		if (!selectedChip.id) {
			axios
				.get(`http://localhost:8001/listings/`, { params: { keywords } })
				.then(result => {
					setListings(result.data);

					const categoryNames = result.data.map(listing => listing.category);

					const filteredCategories = categories.filter(category => {
						return categoryNames.includes(category.category);
					});

					setCurrentCategories(filteredCategories);
				});
		}
	}, [keywords, selectedChip]);

	useEffect(() => {
		//Call for categories

		//Only display all categories if no chip is selected
		if (!selectedChip.id) {
			axios
				.get("http://localhost:8001/categories")
				.then(res => {
					setCategories(res.data);
					setCurrentCategories(res.data);
				})
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
		justifyContent: "center",
		position: "relative",
		width: "100%"

	};

	return (
		<Box className='search-view-wrapper' sx={wrapperStyle}>
			<SearchList keywords={keywords} listings={listings} />
			<CategoriesBar
				categories={currentCategories}
				selectedChip={selectedChip}
				handleSelectedChip={handleSelectedChip}
				handleClearSelection={handleClearSelection}
				emptySearch={emptySearch}
			/>
		</Box>
	);
}

export default SearchWrapper;
