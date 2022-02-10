import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function SearchListItem(props) {

  const handleListingChange = () => {
    let listing = props.listing;
    props.onChoice(listing);
  }

  return (
    <Paper onClick={handleListingChange} sx={{ p: 2, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img
              alt="complex"
              src={props.listing.image_1}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.listing.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.listing.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                {props.listing.created}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {props.listing.price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}