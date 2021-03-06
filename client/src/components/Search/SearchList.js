import React, { useState } from "react";
import SearchListItem from "./SearchListItem";
import ListingDetails from "../Listings/ListingDetails";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

//If no chip is selected we can fetch all listings

export default function SearchList({ keywords, listings, addToRefs }) {
	const theme = useTheme();

	const [listing, setListing] = useState({});

	const handleListingChange = (e, i) => {
		setListing(e);
	};

	return (
		<Box className='search-results' sx={{ width: "100%" }}>
			<ListingDetails listing={listing} className='search-results__item'>
				<Grid
					container
					spacing={4}
					sx={{
						transition: "300ms ease",
						"&:hover > .MuiGrid-item": {
							opacity: 0.5,
						},

						".MuiGrid-item:hover": {
							opacity: 1,
						},
						".MuiGrid-item:hover .MuiTypography-root": {
							color: "white !important",
						},
					}}
				>
					{listings[0] &&
						listings.map((listing) => {
							// let delayCounter = 0.1;
							return (
								<Grid
									item
									xs={12}
									md={12}
									lg={6}
									key={Math.random().toString(36).substr(2, 9)}
								>
									<SearchListItem
										key={Math.random().toString(36).substr(2, 9)}
										onChoice={handleListingChange}
										listing={listing}
										addToRefs={addToRefs}
									/>
								</Grid>
							);
						})}
				</Grid>
			</ListingDetails>
			{!listings[0] && (
				<Typography
					variant='h5'
					sx={{ mt: 4, color: theme.palette.primary.grey }}
				>
					The are no current search results
				</Typography>
			)}
		</Box>
	);
}
