import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import CurrencyFormat from 'react-currency-format';
import Grid from "@mui/material/Grid";

export default function ListingQuickView(props) {
  const [state, setState] = React.useState({
    right: false,
  });

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
              <h3>Category:</h3>
              <h3>Amount:</h3>
              <h3>Date Posted:</h3>
            </Grid>
            <Grid item xs={6}>
              <h3>{props.listing.title}</h3>
              <h3>{props.listing.category}</h3>
              <h3><CurrencyFormat value={props.listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
              <h3>{props.date}</h3>
            </Grid>
          </Grid>
        </Item>
      </Stack>
    </div>
  );
}
