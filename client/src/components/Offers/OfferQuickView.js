import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import CurrencyFormat from 'react-currency-format';
import { Chip } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function OfferQuickView(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Stack>
        <Item>
          <h2>Details</h2>
          <Divider />
          <Grid container>

            <Grid item xs={5}>
              <h3>Title:</h3>
              <h3>Amount:</h3>
              <h3>Date:</h3>
              <h3>Status:</h3>
            </Grid>
            <Grid item xs={6}>
              <h3>{props.offer.title}</h3>
              <h3><CurrencyFormat value={props.offer.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
            <h3>{props.date}</h3>
            <h3>{props.offer.accepted ?
              <Chip label="Offer Accepted" color="success" variant="outlined" />
              : (props.offer.pending ?
                <Chip label="Pending" color="warning" variant="outlined" />
                : <Chip label="Rejected" color="error" variant="outlined" />)}
            </h3>
            </Grid>
          </Grid>
        </Item>
      </Stack>
    </div>
  );
}
