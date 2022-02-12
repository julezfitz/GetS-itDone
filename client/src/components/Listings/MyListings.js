import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyListingItem from "./MyListingItem";
import ListingQuickView from "./ListingQuickView";
import OffersList from "../Offers/OffersList";
import axios from "axios";
import { UserContext } from "../Application.js";
import { format } from 'date-fns'

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	color: theme.palette.text.secondary,
}));

export default function MyListings() {
	const { userDetails } = useContext(UserContext);

	const [listings, setListings] = useState([]);
	const [listing, setListing] = useState("");
	const [date, setDate] = useState("");
	const [deletedItem, setDeletedItem] = useState("");

	useEffect(() => {
		if (userDetails) {
			axios
				.get(`http://localhost:8001/listings?creatorId=${userDetails.id}`)
				.then(result => {
					setListings(result.data);
				});
		}
	}, [userDetails, deletedItem]);

	const handleListingChange = function () {
		let date = new Date(this.created);
		let formattedDate = format(date, 'dd/MM/yyyy');
		setDate(formattedDate);

		setListing(this);
	};

	const handleDelete = (listing) => {
		console.log(listing.id);
		axios.delete(`http://localhost:8001/listings/${listing.id}`)
			.then(result => {
				console.log(result.data);
				setDeletedItem(listing);
				setListing("");
			});
	}



	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} columns={16}>
				<Grid item xs={8}>
					<Item>
						{listings.map(listing => {
							return (
								<MyListingItem
									onClick={handleListingChange.bind(listing)}
									key={Math.random().toString(36).substr(2, 9)}
									listing={listing}
									handleDelete={handleDelete.bind(null, listing)}
								/>
							);
						})}
					</Item>
				</Grid>
				<Grid item xs={8}>
					<Item>
						<ListingQuickView listing={listing} date={date} />
						<OffersList listingId={listing.id} />
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
}
