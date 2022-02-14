import React, { useState, useEffect } from "react";
import SearchList from "./SearchList";
import CategoriesBar from "./Categories/CategoriesBar";
import { Box } from "@mui/material";
import axios from "axios";
import { LinearProgress } from "@mui/material";

function SearchWrapper({ keywords, emptySearch, setCleared }) {
	const [pending, setPending] = useState(true);
	const [listings, setListings] = useState([]);
	// const [categories, setCategories] = useState([]);
	const [currentCategories, setCurrentCategories] = useState([]);
	const [selectedChip, setSelectedChip] = useState({
		id: null,
		name: null,
	});
	const [sortByType, setSortByType] = useState([]);
	const [sortOrder, setSortOrder] = useState([]);

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

	const handleSortChange = (e) => {
		setSortByType(e.target.value);
	}

	const handleOrderChange = (e) => {
		setSortOrder(e.target.value);
	}

	useEffect(() => {

	}, [])


	useEffect(() => {
		const controller = new AbortController();
		//If no chip is selected we can fetch all listings
		if (!selectedChip.id) {
			axios
				.get(`http://localhost:8001/listings/`,
					{
						params: { keywords },
						signal: controller.signal
					})
				.then(result => {
					setListings(result.data);

					// const categoryNames = result.data.map(listing => listing.category);

					// const filteredCategories = categories.filter(category => {
					// 	return categoryNames.includes(category.category);
					// });

					// setCurrentCategories(filteredCategories);
					// setTimeout(() => {
					setPending(false);
					// }, 900);
				})
				.catch((err) => { })
		}
		return () => controller.abort()
	}, [keywords, selectedChip]);

	useEffect(() => {
		const controller = new AbortController();
		//Call for categories

		//Only display all categories if no chip is selected
		if (!selectedChip.id) {
			axios
				.get("http://localhost:8001/categories", { signal: controller.signal })
				.then(res => {
					// setCategories(res.data);
					setCurrentCategories(res.data);
				})
				.catch(err => console.log(err));
		}

		//Update listings according to chip selection
		if (selectedChip.id) {
			const categoryId = selectedChip.id;

			axios
				.get(`http://localhost:8001/listings/?category=${categoryId}`, { signal: controller.signal })
				.then(res => setListings(res.data))
				.catch(err => console.log(err));
		}

		return () => controller.abort()
	}, [selectedChip]);

	const wrapperStyle = {
		display: "flex",
		justifyContent: "center",
		position: "relative",
		width: "100%",
		height: "100%",
	};

	return (
		<Box className='search-view-wrapper' sx={wrapperStyle}>
			{pending ? (
				<LinearProgress color='primary' sx={{ width: "100%" }} />
			) : (
				<>
					<SearchList keywords={keywords} listings={listings} />
					<CategoriesBar
						categories={currentCategories}
						selectedChip={selectedChip}
						handleSelectedChip={handleSelectedChip}
						handleClearSelection={handleClearSelection}
						emptySearch={emptySearch}
						handleSortChange={handleSortChange}
						handleOrderChange={handleOrderChange}
					/>
				</>
			)}
		</Box>
	);
}

export default SearchWrapper;
