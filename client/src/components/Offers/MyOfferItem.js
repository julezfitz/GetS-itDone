import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CurrencyFormat from 'react-currency-format';

export default function MyOffersItem(props) {
  return (
    <Paper sx={{ p: 2, flexGrow: 1 }} style={{ cursor: "pointer" }}>
      <Grid container spacing={2} onClick={props.onClick}>
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
              <CurrencyFormat value={props.offer.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="error"
              value={props.offer.id}
              onClick={props.handleDelete}
            >
              Withdraw Offer
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
