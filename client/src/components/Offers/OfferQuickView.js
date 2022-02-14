import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";
import CurrencyFormat from 'react-currency-format';
import { Chip } from "@mui/material";

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
          <h3>Details</h3>
          <Divider />
          <h3>Title: {props.offer.title}</h3>
          {/* <h3>Category: {props.listing.category}</h3> */}
          <h3>Amount: <CurrencyFormat value={props.offer.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h3>
          <h3>Date: {props.date}</h3>
          <h3>Status: {props.offer.accepted ?
            <Chip label="Offer Accepted" color="success" variant="outlined" />
            : (props.offer.pending ?
              <Chip label="Pending" color="warning" variant="outlined" />
              : <Chip label="Rejected" color="error" variant="outlined" />)}
        </h3>
        </Item>
      </Stack>
    </div>
  );
}
