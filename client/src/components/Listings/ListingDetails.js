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
import { Button, Alert, Avatar, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { UserContext } from "../Application.js";
import CurrencyFormat from "react-currency-format";
import Link from "@mui/material/Link";
import { Chip } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

export default function ListingDetails(props) {
	const theme = useTheme();

	//General styles
	const PADDING = "2rem 3rem";

	const [state, setState] = React.useState({
		right: false,
	});

	const { getUserOffers, userDetails, offers } = React.useContext(UserContext);

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
		color: theme.palette.text.secondary,
	}));

	const [listingCreator, setCreator] = React.useState({});
	const [date, setDate] = React.useState("");
	const [userRatingsOpen, setUserRatingsOpen] = React.useState(false);
	const [currentOffer, setCurrentOffer] = React.useState("");

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
	}, [currentOffer, props.listing]);

	const handleOffer = listingId => {
		axios
			.post(`http://localhost:8001/offers`, {
				listingId: parseInt(listingId.target.value),
				bidderId: parseInt(userDetails.id),
			})
			.then(result => {
				setCurrentOffer(props.listing);
				getUserOffers();
			});
	};

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
						BackdropProps={{ style: { opacity: 0.98 } }}
						anchor={anchor}
						variant='temporary'
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						PaperProps={{
							style: {
								width: "550px",
								justifyContent: "center",
							},
						}}
					>
						<Stack spacing={0.4}>
							<Box className='padding-box' sx={{ padding: PADDING }}>
								{/* <Grid container spacing={7} wrap='nowrap'> */}
								{/* <Grid item xs={8}> */}
								<Typography variant='h2' sx={{}}>
									{props.listing.title}
								</Typography>
								<Divider color='white' style={{ marginBottom: "4rem" }} />
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									{/* <Box
										sx={{
											border: "1px solid white",
											borderRadius: "30px",
											padding: "0.3rem 0.7rem",
										}}
									> */}
									{/* <Typography>Category</Typography> */}
									<Chip
										size='small'
										label={props.listing.category}
										sx={{ padding: "0.8rem 0.2rem" }}
									/>

									{/* <Typography>{props.listing.category}</Typography> */}

									{/* </Box> */}
									<Typography component='span' variant='h5'>
										<CurrencyFormat
											value={props.listing.price}
											displayType={"text"}
											thousandSeparator={true}
											prefix={"$"}
										/>
									</Typography>
								</Box>
							</Box>
							{/* </Grid> */}

							{/* <Grid item xs={4}>
									<Box m={2} pt={3}>
										<Typography
											variant='subtitle2'
											color='grey'
											component='div'
										>
											Posted {date} &nbsp; | &nbsp; <b>{props.listing.city}</b>
										</Typography>
									</Box>
								</Grid> */}
							{/* </Grid> */}
							<Item sx={{ height: "16rem" }}>
								<ImageCarousel listing={props.listing} />
							</Item>
							<Item>
								<Box className='padding-box' sx={{ padding: PADDING }}>
									{/* <Typography>Category: {props.listing.category}</Typography> */}

									{/* <Grid container spacing={0}> */}
									{/* <Grid item xs={9}> */}

									{/* </Grid> */}

									{/* <Grid item xs={2}> */}
									{/* <Box m={-5} pt={-5}> */}
									{/* check to see if the user owns the job */}

									{/* </Box> */}

									{/* <h4 xs={3}>Posted By:</h4> */}

									<CardHeader
										sx={{ paddingLeft: 0 }}
										avatar={
											<Avatar
												alt='Profile Image'
												src={props.listing.image}
												sx={{ width: "70px", height: "70px" }}
											/>
										}
										title={
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												{/* <Grid
													container={true}
													direction='row'
													spacing={1}
													style={{ marginLeft: 0, marginBottom: 8 }}
													wrap='nowrap'
													onClick={handleUserRatingsOpen}
												> */}
												<Typography fontSize='medium'>
													{props.listing.first_name} {props.listing.last_name}
												</Typography>
												{/* </Grid> */}
												{/* <Grid
													container={true}
													direction='row'
													spacing={1}
													wrap='nowrap'
													onClick={handleUserRatingsOpen}
												> */}
												<Box>
													<Rating
														name='user-rating'
														size='large'
														style={{
															marginLeft: 5,
															marginTop: 0,
															color: theme.palette.secondary.mainGradient,
														}}
														value={parseInt(listingCreator.average)}
														readOnly
													/>
													<Box sx={{ display: "flex", position: "absolute" }}>
														<Typography variant='string' component='div'>
															&nbsp; (
														</Typography>
														{/* </Grid> */}
														<UserRatingsModal
															open={userRatingsOpen}
															handleClose={handleUserRatingsClose}
															user={listingCreator}
														/>
														<Link
															onClick={handleUserRatingsOpen}
															color='inherit'
															underline='hover'
															variant='string'
															component='button'
														>
															{listingCreator.ratingsCount}{" "}
															{listingCreator.ratingsCount > 1
																? "ratings"
																: "rating"}
														</Link>
														<Typography variant='string' component='div'>
															)
														</Typography>
													</Box>
												</Box>
											</Box>
										}
									/>
									<Box>
										<p>{props.listing.description}</p>
									</Box>
									{props.listing.creator_id === userDetails.id ? (
										<Typography
											variant='subtitle2'
											color='grey'
											component='div'
										>
											You Own This Listing
										</Typography>
									) : /* check if the user has already offered to do this job */
									offers.some(
											({ listingId }) => listingId === props.listing.id
									  ) ? (
										<Typography
											variant='subtitle2'
											color='grey'
											component='div'
										>
											Application received
										</Typography>
									) : (
										<Button
											sx={{ marginTop: "4rem" }}
											size={"large"}
											type='submit'
											color='secondary'
											variant='contained'
											value={props.listing.id}
											onClick={handleOffer}
										>
											Place Offer
										</Button>
									)}
								</Box>
							</Item>
						</Stack>
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
