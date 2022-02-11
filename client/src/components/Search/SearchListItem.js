import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { format } from "date-fns";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	position: "absolute",
	width: "100%",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});

export default function SearchListItem(props) {
	const handleListingChange = () => {
		let listing = props.listing;
		props.onChoice(listing);
	};

	const date = new Date(props.listing.created);
	const formattedDate = format(date, "dd/MM/yyyy");

	return (
		<Paper onClick={handleListingChange} sx={{ p: 2, flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item>
					<ButtonBase
						sx={{
							width: 128,
							height: 128,
							overflow: "hidden",
							position: "relative",
							backgroundImage: `url(${props.listing.image_1})`,
							backgroundSize: "cover",
							backgroundPosition: "50% 50%",
              borderRadius: "5px"
						}}
					></ButtonBase>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction='column' spacing={2}>
						<Grid item xs>
							<Typography gutterBottom variant='subtitle1' component='div'>
								{props.listing.title}
							</Typography>
							<Typography variant='body2' gutterBottom>
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
							{props.listing.price}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	);
}
