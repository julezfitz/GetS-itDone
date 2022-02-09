import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function MyOffersItem(props) {
  return (
    <Paper sx={{ p: 2, flexGrow: 1 }} style={{ cursor: "pointer" }}>
      <Grid container spacing={2}
              onClick={props.onClick}
              >
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              {props.offer.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Typography variant="subtitle1" component="div">
            {props.offer.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}