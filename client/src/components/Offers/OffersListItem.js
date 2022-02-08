import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

export default function OffersListItem() {
  return (
      <Grid container spacing={2}>
        <Grid item>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Clean My Yard
              </Typography>
              <Typography variant="body2" gutterBottom>
                I know it'll be challenging but I'd like someone to come and
                clean up my beach. I will also need you to rake the beach so
                that it is even.
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