import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import ButtonBase from "@mui/material/ButtonBase";

export default function OffersListItem() {
  
  return (
    <Grid container spacing={2}>
      <Grid item></Grid>
      <Grid item xs={12} sm container spacing={4}>
        <Grid item xs container direction="column">
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
              John Smith
            </Typography>
            <Typography variant="body2" gutterBottom>
              <Rating name="user-rating" size="small" value={4} readOnly />
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              Date: February 4, 2022
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div">
            $500.00
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
