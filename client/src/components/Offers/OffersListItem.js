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
    <Grid container spacing={1}>
      <Grid item></Grid>
      <Grid item xs={6} sm container spacing={1}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              {offer.firstName} {offer.lastName}
            </Typography>
            <Typography variant="body2" component={'span'} gutterBottom>
              <Grid container={true} >
                <Rating name="user-rating" size="small" value={parseInt(offer.averageRating)} readOnly />
                <Typography variant="string" component="div">&nbsp;  (</Typography>
                <Link onClick={handleUserRatingsOpen} color="inherit" underline="hover" variant="string" component="button">{offer.ratingCount} {offer.ratingCount > 1 ? "ratings" : "rating"}</Link>
                <Typography variant="string" component="div">)</Typography>
              </Grid>
              <UserRatingsModal open={userRatingsOpen} handleClose={handleUserRatingsClose} user={offer} />
            </Typography>
          </Grid>
          <br></br>
        </Grid>

        {props.offerDeclined ? (<Typography variant="subtitle1" component="div"> Declined</Typography>) : (
          <Grid item xs container direction="row" alignItems='right' justifyContent='right' spacing={0}>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                <Button
                  size={"small"}
                  type='submit'
                  color='success'
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
                  color='error'
                  variant='contained'
                  sx={{ marginTop: 2, marginRight:0 }}
                  onClick={handleDecline}
                >
                  Decline
                </Button>
              </Typography>
            </Grid>
          </Grid>

        )}
      </Grid>
    </Grid>
  );
}
