import React, { useState, useCallback, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import SearchListItem from "./SearchListItem";
import ListingDetails from "../Listings/ListingDetails";
import { Box } from "@mui/material";
import { Grid, Item } from "@mui/material";
import { Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import { useInView } from "react-intersection-observer";

// const Item = styled(Paper)(({ theme }) => ({
// 	...theme.typography.body2,
// 	padding: theme.spacing(1),
// 	color: theme.palette.text.secondary,
// 	width: "100%",
// }));

//If no chip is selected we can fetch all listings

export default function SearchList({ keywords, listings }) {
	const theme = useTheme();

	const listRefs = useRef([]);
	const [inViewRef, inView] = useInView();

	const addToRefs = el => {
		if (el && !listRefs.current.includes(el)) {
			listRefs.current.push(el);
		}
	};

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
						listings.map((listing, i) => {
							return (
								<Grid
									item
									xs={12}
									md={12}
									lg={6}
									key={Math.random().toString(36).substr(2, 9)}
									ref={addToRefs}
								>
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
