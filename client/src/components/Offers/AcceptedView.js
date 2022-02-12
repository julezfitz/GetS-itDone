import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useState, useContext } from "react";
import { UserContext } from "../Application.js";
import NewRatingModal from "../Ratings/NewRating";
import { Box, Button } from "@mui/material";



export default function OffersListItem(props) {

  const [newRatingOpen, setNewRatingOpen] = useState(false);

  const { userDetails } = useContext(UserContext);

  const handleNewRatingOpen = () => setNewRatingOpen(true);
  const handleNewRatingClose = () => setNewRatingOpen(false);

  return (
    <Grid container spacing={2}>
      <Grid item></Grid>
      <Grid item xs={12} sm container spacing={3}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              Congrats! You chose {props.acceptedOffer.firstName} {props.acceptedOffer.lastName} to complete your
              job. You can reach them at <a href={`mailto:${props.acceptedOffer.email}`}>{props.acceptedOffer.email}</a> to
              make arrangements.
            </Typography>
            <Grid item xs >

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <>
                  <Button
                    onClick={handleNewRatingOpen}
                    size={"medium"}
                    type='submit'
                    color='primary'
                    variant='contained'
                    sx={{ marginLeft: 16 }}
                  >
                    Leave A Review
                  </Button>
                  <NewRatingModal
                    open={newRatingOpen}
                    rateeId={props.acceptedOffer.bidderId}
                    raterId={userDetails.id}
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