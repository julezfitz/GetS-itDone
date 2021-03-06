import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import NewRatingModal from "../Ratings/NewRating";
import { Box, Button } from "@mui/material";

export default function OffersListItem(props) {

  const [newRatingOpen, setNewRatingOpen] = useState(false);

  const handleNewRatingOpen = () => setNewRatingOpen(true);
  const handleNewRatingClose = () => setNewRatingOpen(false);

  let rateeObject = {
    "rateeId": props.acceptedOffer.bidderId,
    "firstName": props.acceptedOffer.firstName,
    "lastName": props.acceptedOffer.lastName
  }

  return (
    <Grid container spacing={2}>
      <Grid item></Grid>
      <Grid item xs={12} sm container spacing={3}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              Congrats! You chose {props.acceptedOffer.firstName} {props.acceptedOffer.lastName} to complete your
              job. You can reach them at <a href={`mailto:${props.acceptedOffer.email}`} style={{color:'orange'}}>{props.acceptedOffer.email}</a> to
              make arrangements.
            </Typography>
            <Grid item xs >

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <>
                  <Button
                    onClick={handleNewRatingOpen}
                    size={"medium"}
                    type='submit'
                    color='secondary'
                    variant="outlined"
                    sx={{ marginLeft: '38%', marginTop: 1 }}
                  >
                    Leave A Review
                  </Button>
                  <NewRatingModal
                    open={newRatingOpen}
                    ratee={rateeObject}
                    listingId={props.listingId}
                    handleClose={handleNewRatingClose}
                  />
                </>
              </Box>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}