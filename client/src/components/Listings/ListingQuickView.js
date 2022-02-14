import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import CurrencyFormat from 'react-currency-format';

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
          <h3>Details</h3>
          <Divider />
          <h3>Title: {props.listing.title}</h3>
          <h3>Category: {props.listing.category}</h3>
          <h3>Amount: <CurrencyFormat value={props.listing.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
          <h3>Date Posted: {props.date}</h3>
        </Item>
      </Stack>
    </div>
  );
}
