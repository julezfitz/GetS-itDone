import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
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
              <Grid container={true} >
                <Rating name="user-rating" size="small" value={parseInt(offer.averageRating)} readOnly />
                <Typography variant="string" component="div">&nbsp;  (</Typography>
                <Link onClick={handleUserRatingsOpen} variant="string" component="button">{offer.ratingCount} {offer.ratingCount > 1 ? "ratings" : "rating"}</Link>
                <Typography variant="string" color="black" component="div">)</Typography>
              </Grid>
              <UserRatingsModal open={userRatingsOpen} handleClose={handleUserRatingsClose} user={offer} />
            </Typography>
          </Grid>
          <br></br>
        </Grid>


        {props.offerDeclined ? (<Typography variant="subtitle1" component="div"> Declined</Typography>) : (
          <Grid item xs container direction="row" spacing={0}>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                <Button
                  size={"small"}
                  type='submit'
                  color='primary'
                  variant='contained'
                  value={offer}
                  sx={{ marginTop: 2, marginRight: 1 }}
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle1" component="div">
                <Button
                  size={"small"}
                  type='submit'
                  color='primary'
                  variant='contained'
                  sx={{ marginTop: 2 }}
                  onClick={handleDecline}
                >
                  Decline
                </Button>
              </Typography>
            </Grid>
          </Grid>

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
  );
}
