import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SearchListItem from "./SearchListItem";
import ListingDetails from "../Listings/ListingDetails";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

export default function SearchList({ keywords, togglePending }) {
  console.log(keywords);
	const [listings, setListings] = useState([]);

	useEffect((() => {
    
		axios
			.get(`http://localhost:8001/listings/`, { params: { keywords } })
			.then(result => {
				setListings(result.data);
			});
  }), [keywords]);
  
console.log(listings);

	return (
		<Item className="search-results">
			{listings.map(listing => {
				return (
					<ListingDetails listing={listing} className="search-results__item">
						<SearchListItem listing={listing} key={listing.id}/> 
            {/* added key here again */}
					</ListingDetails>
				);
			})}
		</Item>
	);
}
