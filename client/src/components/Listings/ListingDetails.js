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
import { formatDistance } from 'date-fns'
import { Button, Alert, Avatar, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import { UserContext } from "../Application.js";
import CurrencyFormat from 'react-currency-format';


export default function ListingDetails(props) {
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
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  const [listingCreator, setCreator] = React.useState({});
  const [date, setDate] = React.useState("");
  const [userRatingsOpen, setUserRatingsOpen] = React.useState(false);
  const [currentOffer, setCurrentOffer] = React.useState("");

  const handleUserRatingsOpen = () => setUserRatingsOpen(true);
  const handleUserRatingsClose = () => setUserRatingsOpen(false);

  React.useEffect((() => {
    if (props.listing.creator_id) {
      axios.get(`http://localhost:8001/ratings/`, { params: { "rateeId": props.listing.creator_id } })
        .then((result) => {
          setCreator({
            "ratings": result.data,
            "average": result.data.reduce((total, next) => total + parseInt(next.rating), 0) / result.data.length.toFixed(1),
            "firstName": props.listing.first_name,
            "lastName": props.listing.last_name,
            "bidderId": props.listing.creator_id,
            "ratingsCount": result.data.length
          })
        })
      let timeAgo = formatDistance(
        new Date(props.listing.created),
        new Date(),
        { addSuffix: true }
      )
      setDate(timeAgo);

    }
  }), [currentOffer, props.listing])

  const handleOffer = (listingId) => {
    axios.post(`http://localhost:8001/offers`, { listingId: parseInt(listingId.target.value), bidderId: parseInt(userDetails.id) })
      .then((result) => {
        setCurrentOffer(props.listing);
        getUserOffers();
      })
  }

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
              style: { width: "500px", padding: "3rem" },
            }}
          >
            <Stack spacing={0.1}>
              <Grid container spacing={7} wrap='nowrap'>

                <Grid item xs={8}>
                  <h2>{props.listing.title}</h2>
                  <h4>Category: {props.listing.category}</h4>
                  <Typography component='span' variant="h5">
                    <CurrencyFormat value={props.listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Box m={2} pt={3}>
                    <Typography variant="subtitle2" color="grey" component="div">Posted {date} &nbsp; |
                      &nbsp; <b>{props.listing.city}</b></Typography>
                  </Box>
                </Grid>

              </Grid>
              <Item sx={{ height: "20rem" }}>
                <ImageCarousel listing={props.listing} />
              </Item>
              <Divider />
              <Item>
                <h3>Description</h3>

                <Grid container spacing={0}>

                  <Grid item xs={9}>
                    <p>{props.listing.description}</p>
                  </Grid>

                </Grid>

                <Grid container spacing={0} direction='row'>


                  <Grid item xs={2} style={{ display: "flex" }} >
                    <h4 xs={3}>Posted By:</h4>
                  </Grid>

                  <Grid item xs={6} >
                    <CardHeader
                      avatar={<Avatar alt="Profile Image" src={props.listing.image}/>}
                      title={`${props.listing.first_name} ${props.listing.last_name}`}
                    />

                    <Grid item>
                      <Grid container={true} direction="row" spacing={1} wrap='nowrap' onClick={handleUserRatingsOpen}>
                       
                        {/* Please fix the spacing issue below if you know how */}
                       
                        <Typography variant="string" component="div"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</Typography>
                        <Rating name="user-rating" size="small" value={parseInt(listingCreator.average)} readOnly />
                        <Typography variant="string" component="div">&nbsp;  (</Typography>
                        <Typography variant="string" color="blue" component="div">{listingCreator.ratingsCount} {listingCreator.ratingsCount > 1 ? "ratings" : "rating"}</Typography>
                        <Typography variant="string" color="black" component="div">)</Typography>
                      </Grid>
                      <UserRatingsModal open={userRatingsOpen} handleClose={handleUserRatingsClose} user={listingCreator} />
                    </Grid>

                  </Grid>


                </Grid>

                <Grid container>

                  <Grid item xs={2}>
                    <Box m={-5} pt={-5}>
                      {/* check if the user has already offered to do this job */}
                      {(offers.some(({ listingId }) => listingId === props.listing.id)) ?
                        (<Typography variant="subtitle2" color="grey" component="div">Application received</Typography>)
                        :
                        (<Button
                          size={"small"}
                          type='submit'
                          color='secondary'
                          variant='contained'
                          value={props.listing.id}
                          onClick={handleOffer}
                        >Place Offer</Button>)
                      }
                    </Box>
                  </Grid>
                </Grid>



              </Item>
            </Stack>
          </Drawer>
        </React.Fragment>
      ))
      }
    </div >
  );
}
