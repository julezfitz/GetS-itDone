import React, { forwardRef } from "react";
// import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { format } from "date-fns";
import CurrencyFormat from "react-currency-format";
// import useTheme from "@mui/material/styles/useTheme";
// import { motion, AnimatePresence } from "framer-motion";

function SearchListItem(props, ref) {
	// const theme = useTheme();

	const handleListingChange = () => {
		let listing = props.listing;
		props.onChoice(listing);
	};

	const date = new Date(props.listing.created);
	const formattedDate = format(date, "dd/MM/yyyy");

	return (
		<Paper
			onClick={handleListingChange}
			sx={{
				p: 2,
				flexGrow: 1,
				overflow: "hidden",
				position: "relative",
				transition: "300ms ease",
			}}
		>
			<Grid container spacing={2} sx={{height: 150}}>
				<Grid item >
					<ButtonBase
						className='search-list-image-btn'
						sx={{
							width: 160,
							height: "100%",
							overflow: "hidden",
							position: "absolute",
							left: 0,
							top: 0,
						}}
					>
						<div
							className='search-list-image'
							style={{
								width: "100%",
								height: "100%",
								backgroundImage: `url(${props.listing.image_1})`,
								backgroundSize: "cover",
								backgroundPosition: "50% 50%",
							}}
						></div>
					</ButtonBase>
				</Grid>
				<Grid item xs={12} sm container >
					<Grid item xs container direction='column' spacing={2} sx={{paddingLeft: "9rem"}}>
						<Grid item xs>
							<Typography gutterBottom variant='subtitle1' component='div'>
								{props.listing.title}
							</Typography>
							<Typography
								style={{
									maxWidth: "100%",
									display: "-webkit-box",
									WebkitBoxOrient: "vertical",
									WebkitLineClamp: 2,
									overflow: "hidden",
									textOverflow: "ellipsis",
								}}
								variant='body2'
								gutterBottom
							>
								{props.listing.description}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='body2' color='text.secondary'>
								{props.listing.city} | {formattedDate}
							</Typography>
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant='subtitle1' component='div'>
							<CurrencyFormat
								value={props.listing.price}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"$"}
							/>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default forwardRef(SearchListItem);
