import React, { useState, useEffect, useContext } from "react";
import SearchList from "./SearchList";
import CategoriesBar from "./Categories/CategoriesBar";
import { Box } from "@mui/material";
import axios from "axios";
import { UserContext } from "../Application";
import TransitionWrapper from "../Transition/TransitionWrapper";
// import { useLocomotiveScroll } from "react-locomotive-scroll";
import Typography from "@mui/material/Typography";

function SearchWrapper({ keywords, emptySearch }) {
	const { isLoggedIn, userDetails } = useContext(UserContext);
	const [pending, setPending] = useState(true);
	const [listings, setListings] = useState([]);
	const [currentCategories, setCurrentCategories] = useState([]);
	const [selectedChip, setSelectedChip] = useState({
		id: null,
		name: null,
	});
	const [sortByType, setSortByType] = useState([]);
	const [sortOrder, setSortOrder] = useState([]);
	const [city, setCity] = useState(userDetails ? userDetails.city : "");

	const handleSelectedChip = (categoryId, categoryName) => {
		setSelectedChip({
			id: categoryId,
			name: categoryName,
		});
	};

	const handleClearSelection = () => {
		emptySearch();
		setSortByType([]);
		setSortOrder([]);
		setCity(userDetails?.city ?? "");
		setSelectedChip({
			id: null,
			name: null,
		});
	};
	const handleSortChange = e => {
		setSortByType(e.target.value);
	};
	const handleOrderChange = e => {
		setSortOrder(e.target.value);
	};
	const handleCityChange = e => {
		setCity(e.target.value);
	};

	useEffect(() => {
		if (sortByType.length > 0 || sortOrder.length > 0) {
			// const controller = new AbortController();
			let paramObj = {};
			if (sortByType.length > 0) {
				paramObj["orderBy"] = sortByType;
			}
			if (sortOrder.length > 0) {
				paramObj["sortOrder"] = sortOrder;
			}

			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/listings/`, {
					params: paramObj,
					// signal: controller.signal
				})
				.then(result => {
					if (city) {
						let cityListings = [];
						result.data.map(listing => {
							if (listing.city === city) {
								cityListings.push(listing);
							}
							return cityListings;
						});
						setListings(cityListings);
					} else {
						setListings(result.data);
					}
				});
		} else {
			axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/`).then(result => {
				if (city) {
					let cityListings = [];
					result.data.map(listing => {
						if (listing.city === city) {
							cityListings.push(listing);
						}
						return cityListings;
					});
					setListings(cityListings);
				} else {
					setListings(result.data);
				}
			});
		}
	}, [sortByType, sortOrder, city]);

	useEffect(() => {
		const controller = new AbortController();
		//If no chip is selected we can fetch all listings
		if (!selectedChip.id) {
			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/listings/`, {
					params: { keywords },
					signal: controller.signal,
				})
				.then(result => {
					if (city) {
						let cityListings = [];
						result.data.map(listing => {
							if (listing.city === city) {
								cityListings.push(listing);
							}
							return cityListings;
						});
						setListings(cityListings);
					} else {
						setListings(result.data);
					}
					setPending(false);
				})
				.catch(err => { });
		}
		return () => controller.abort();
	}, [keywords, selectedChip]);

	useEffect(() => {
		const controller = new AbortController();
		//Call for categories
		//Only display all categories if no chip is selected
		if (!selectedChip.id) {

			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/categories`, { signal: controller.signal })
				.then(res => {
					setCurrentCategories(res.data);
				})
				.catch(err => console.log(err));
		}

		//Update listings according to chip selection
		if (selectedChip.id) {
			const categoryId = selectedChip.id;

			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/listings/?category=${categoryId}`, {
					signal: controller.signal,
				})
				.then(res => {
					if (city) {
						let cityListings = [];
						res.data.map(listing => {
							if (listing.city === city) {
								cityListings.push(listing);
							}
							return cityListings;
						});
						setListings(cityListings);
					} else {
						setListings(res.data);
					}
				})
				.catch(err => console.log(err));
		}

		return () => controller.abort();
	}, [selectedChip]);

	const wrapperStyle = {
		display: "flex",
		justifyContent: "center",
		position: "relative",
		width: "100%",
		height: "100%",
	};

	return (
		<TransitionWrapper>
			{city && <Typography style={{ marginTop: -50, position: 'absolute' }} variant='subtitle1' component='div'>Showing search results for: {city}</Typography>}
			<Box className='search-view-wrapper' sx={wrapperStyle}>
				{pending ? (
					""
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
							handleCityChange={handleCityChange}
							isLoggedIn={isLoggedIn}
							city={city}
							sort={sortByType}
							sortOrder={sortOrder}
						/>
					</>
				)}
			</Box>
		</TransitionWrapper>
	);
}

export default SearchWrapper;
