import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Button, Alert } from "@mui/material";
import UserRatingsModal from "../Ratings/UserRatings";

export default function OffersListItem(props) {
  const handleAccept = () => {
    props.accept(props.offer);
  }

  const handleDecline = () => {
    props.decline(props.offer);
  }

  const [userRatingsOpen, setUserRatingsOpen] = useState(false);

  const handleUserRatingsOpen = () => setUserRatingsOpen(true);
  const handleUserRatingsClose = () => setUserRatingsOpen(false);

  const [offer, setOffer] = useState({});

  useEffect((() => {
    setOffer(props.offer)
  }), [props.offer])

  return (
    <Grid container spacing={2}>
      <Grid item></Grid>
      <Grid item xs={12} sm container spacing={3}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              {offer.firstName} {offer.lastName}
            </Typography>
            <Typography variant="body2" component={'span'} gutterBottom>
              <Grid container={true} onClick={handleUserRatingsOpen}>
                <Rating name="user-rating" size="small" value={parseInt(offer.averageRating)} readOnly />
                <Typography variant="string" component="div">&nbsp;  (</Typography>
                <Typography variant="string" color="blue" component="div">{offer.ratingCount} {offer.ratingCount > 1 ? "ratings" : "rating"}</Typography>
                <Typography variant="string" color="black" component="div">)</Typography>
              </Grid>
              <UserRatingsModal open={userRatingsOpen} handleClose={handleUserRatingsClose} user={offer} />
            </Typography>
          </Grid>
          <Grid item>
            <Typography component={'span'} variant="body2" color="text.secondary">
              {/* Date: February 4, 2022 */}
            </Typography>
          </Grid>
          <br></br>
        </Grid>
        <Grid item>
          {props.offerDeclined ? (<Typography variant="subtitle1" component="div"> Declined</Typography>) : (
            <Typography variant="subtitle1" component="div">
              <Button
                size={"small"}
                type='submit'
                color='primary'
                variant='contained'
                value={offer}
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
              </Typography>
            )}
              {/* {errors &&
								errors.map(err => {
									return (
										<Alert severity='error' sx={{ marginTop: ELEMENTSPACING }}>
											{err.message}
										</Alert>
									);
								})} */}
        </Grid>
      </Grid>
    </Grid>
  );
}
