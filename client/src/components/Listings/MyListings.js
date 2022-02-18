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
import TransitionWrapper from "../Transition/TransitionWrapper";
import Typography from "@mui/material/Typography";
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

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
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		if (userDetails) {
			axios
				.get(`${process.env.REACT_APP_SERVER_URL}/listings?creatorId=${userDetails.id}`)
				.then(result => {
					setListings(result.data);

					setListing(result.data[0]);

					if (result.data[0]) {
						let date = new Date(result.data[0].created);
						let formattedDate = format(date, 'dd/MM/yyyy');
						setDate(formattedDate);
					}
				});
		}
	}, [userDetails, deletedItem, updated]);

	const handleListingChange = function () {
		let date = new Date(this.created);
		let formattedDate = format(date, 'dd/MM/yyyy');
		setDate(formattedDate);

		setListing(this);
	};

	const handleDelete = (listing) => {
		axios.delete(`${process.env.REACT_APP_SERVER_URL}/listings/${listing.id}`)
			.then(result => {
				setDeletedItem(listing);
				setListing("");
			});
	}

	const handleUpdatedChange = function () {
		updated ? setUpdated(false) : setUpdated(true);
	};

	return (
		<TransitionWrapper>
			<Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
				<Grid container spacing={2} columns={16}>
					<Grid item xs={8}
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
						}}>
						{listings.length > 0 ?
							<Item>
								{listings.map(listing => {
									return (
										<MyListingItem
											onClick={handleListingChange.bind(listing)}
											key={Math.random().toString(36).substr(2, 9)}
											listing={listing}
											handleDelete={handleDelete.bind(null, listing)}
											handleUpdatedChange={handleUpdatedChange}
										/>
									);
								})}
							</Item>
							: <Item>
								<Grid container direction="row">
									<Grid item xs={13.7}>
										<Typography variant='h4' component='h2'>
											You have no listings to show. Click the + New Listing button above to get started.
										</Typography>
									</Grid>
									<Grid item xs={2}>
										<ArrowUpwardRoundedIcon
											size="large"
											color="inherit"
											fontSize="inherit"
											style={{ color: 'orange', fontSize: "80px", marginTop:10 }}
										></ArrowUpwardRoundedIcon>
									</Grid>
								</Grid>
							</Item>
						}
					</Grid>
					<Grid item xs={8}>
						{listings.length > 0 && <Item>
							<ListingQuickView listing={listing} date={date} />
							<OffersList listingId={listing.id} />
						</Item>
						}
					</Grid>
				</Grid>
			</Box>
		</TransitionWrapper>
	);
}
