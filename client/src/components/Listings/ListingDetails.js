import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ImageCarousel from "./Image Carousel/ImageCarousel";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import UserRatingsModal from "../Ratings/UserRatings";
import { formatDistance } from "date-fns";

export default function ListingDetails(props) {
	const [state, setState] = React.useState({
		right: false,
	});

	const toggleDrawer = (anchor, open) => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const Item = styled(Paper)(({ theme }) => ({
		...theme.typography.body2,
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	}));

	const [listingCreator, setCreator] = React.useState({});
	const [date, setDate] = React.useState("");

	const [userRatingsOpen, setUserRatingsOpen] = React.useState(false);

	const handleUserRatingsOpen = () => setUserRatingsOpen(true);
	const handleUserRatingsClose = () => setUserRatingsOpen(false);

	React.useEffect(() => {
		if (props.listing.creator_id) {
			axios
				.get(`http://localhost:8001/ratings/`, {
					params: { rateeId: props.listing.creator_id },
				})
				.then(result => {
					setCreator({
						ratings: result.data,
						average:
							result.data.reduce(
								(total, next) => total + parseInt(next.rating),
								0
							) / result.data.length.toFixed(1),
						firstName: props.listing.first_name,
						lastName: props.listing.last_name,
						bidderId: props.listing.creator_id,
						ratingsCount: result.data.length,
					});
				});
			let timeAgo = formatDistance(
				new Date(props.listing.created),
				new Date(),
				{ addSuffix: true }
			);
			setDate(timeAgo);
		}
	}, [props.listing]);

	return (
		<div>
			{["right"].map(anchor => (
				<React.Fragment key={anchor}>
					<div
						style={{ cursor: "pointer" }}
						onClick={toggleDrawer(anchor, true)}
					>
						{props.children}
					</div>
					<Drawer
						anchor={anchor}
						variant='temporary'
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						PaperProps={{
							style: { top: "70px", width: "500px", padding: "3rem" },
						}}
					>
						<Stack spacing={0.1} sx={{ overflow: "scroll" }}>
							<h2>{props.listing.title}</h2>
							<h4>Category: {props.listing.category}</h4>
							<Item>
								<h4>Amount Offered: $ {props.listing.price}</h4>
							</Item>
							<Item sx={{ height: "20rem" }}>
								<ImageCarousel listing={props.listing} />
							</Item>
							<Divider />
							<Item>
								<h4>Description</h4>
								<p>{props.listing.description}</p>
								<h4>
									Poster: {props.listing.first_name} {props.listing.last_name}
								</h4>
								<Grid
									container={true}
									direction='row'
									spacing={1}
									wrap='nowrap'
									onClick={handleUserRatingsOpen}
								>
									<Typography variant='string' component='div'>
										&nbsp;
									</Typography>
									<Rating
										name='user-rating'
										size='small'
										value={parseInt(listingCreator.average)}
										readOnly
									/>
									<Typography variant='string' component='div'>
										&nbsp; (
									</Typography>
									<Typography variant='string' color='blue' component='div'>
										{listingCreator.ratingsCount}{" "}
										{listingCreator.ratingsCount > 1 ? "ratings" : "rating"}
									</Typography>
									<Typography variant='string' color='black' component='div'>
										)
									</Typography>
								</Grid>
								<UserRatingsModal
									open={userRatingsOpen}
									handleClose={handleUserRatingsClose}
									user={listingCreator}
								/>
								<h4>Posted {date}</h4>
							</Item>
						</Stack>
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
