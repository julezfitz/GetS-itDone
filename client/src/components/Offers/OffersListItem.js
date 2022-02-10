import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Button, Alert } from "@mui/material";
import UserRatings from "../Ratings/UserRatings";

export default function OffersListItem(props) {
  //to do on this page - add rating count and hyperlink it to the ratings view

  const handleAccept = () => {
    props.accept(props.offer);
  }

  const handleDecline = () => {
    props.decline(props.offer);
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item></Grid>
      <Grid item xs={12} sm container spacing={3}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              {props.offer.firstName} {props.offer.lastName}
            </Typography>
            <Typography variant="body2" gutterBottom>
            <Grid container={true} onClick={handleOpen}>
              <Rating name="user-rating" size="small" value={props.offer.averageRating} readOnly />
              <Typography variant="string" component="div">&nbsp;  (</Typography>
              <Typography variant="string" color="blue" component="div">{props.offer.ratingCount} {props.offer.ratingCount > 1 ? "ratings" : "rating"  }</Typography>
            <Typography variant="string" color="black" component="div">)</Typography>
            <UserRatings open={open} onClose={handleClose} user={props.offer}></UserRatings>
            </Grid>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Date: February 4, 2022
            </Typography>
          </Grid>
          <br></br>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            <Button
              size={"small"}
              type='submit'
              color='primary'
              variant='contained'
              value={props.offer}
              sx={{ marginTop: 5 }}
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              size={"small"}
              type='submit'
              color='primary'
              variant='contained'
              sx={{ marginTop: 5 }}
              onClick={handleDecline}
            >
              Decline
            </Button>
            {/* {errors &&
								errors.map(err => {
									return (
										<Alert severity='error' sx={{ marginTop: ELEMENTSPACING }}>
											{err.message}
										</Alert>
									);
								})} */}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
