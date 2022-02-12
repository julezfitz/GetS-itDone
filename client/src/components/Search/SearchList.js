import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SearchListItem from "./SearchListItem";
import ListingDetails from "../Listings/ListingDetails";
import Heading from "../Heading/Heading";
import { Box } from "@mui/material";
import { Grid, Item } from "@mui/material";

// const Item = styled(Paper)(({ theme }) => ({
// 	...theme.typography.body2,
// 	padding: theme.spacing(1),
// 	color: theme.palette.text.secondary,
// 	width: "100%",
// }));

//If no chip is selected we can fetch all listings

export default function SearchList({ keywords, listings }) {
	const [listing, setListing] = useState({});

	const handleListingChange = e => {
		setListing(e);
	};

	return (
		<Box className='search-results' sx={{ width: "100%" }}>
			<ListingDetails listing={listing} className='search-results__item'>
				<Grid container spacing={4}>
					{listings.map(listing => {
						return (
							<Grid item xs={12} md={12} lg={6} key={Math.random().toString(36).substr(2, 9)}>
								<SearchListItem
									key={Math.random().toString(36).substr(2, 9)}
									onChoice={handleListingChange}
									listing={listing}
								/>
							</Grid>
						);
					})}
				</Grid>
			</ListingDetails>
		</Box>
	);
}
