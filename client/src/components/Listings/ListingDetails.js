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
import UserRatings from "../Ratings/UserRatings";

export default function ListingDetails(props) {
  //Make the listing details full width on mobile

  //probably need to do an api call here to get all the details -- Julie
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

  console.log(props.listing)

  //api call for ratings happens inside ratings

  // const [ratings, setRatings] = React.useState({});
  // const [average, setAverage] = React.useState({});
  const [listingCreator, setCreator] = React.useState({});


  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          // setRatings(result.data);
          // let averageCalc = result.data.reduce((total, next) => total + parseInt(next.rating), 0) / result.data.length;
          // setAverage(averageCalc.toFixed(1));
        })
    }
  }), [props.listing])

  console.log(listingCreator);

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
            <Stack spacing={2}>
              <h1>{props.listing.title}</h1>
              <Item>
                <h3>Amount Offered: $ {props.listing.price}</h3>
              </Item>
              <Item sx={{ height: "20rem" }}>
                <ImageCarousel listing={props.listing} />
              </Item>
              <Divider />
              <Item>
                <h3>Category: {props.listing.category}</h3>
                <h4>Poster: {props.listing.first_name} {props.listing.last_name}</h4>
                <Grid container={true} onClick={handleOpen}>
                  <Rating name="user-rating" size="small" value={parseInt(listingCreator.average)} readOnly />
                  <Typography variant="string" component="div">&nbsp;  (</Typography>
                  <Typography variant="string" color="blue" component="div">{listingCreator.ratingsCount} {listingCreator.ratingsCount > 1 ? "ratings" : "rating"}</Typography>
                  <Typography variant="string" color="black" component="div">)</Typography>
                  <UserRatings open={open} onClose={handleClose} user={listingCreator}></UserRatings>
                </Grid>
                <h3>Description</h3>
                <p>{props.listing.description}</p>
                <h4>{props.listing.created}</h4>
              </Item>
            </Stack>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
