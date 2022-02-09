import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

export default function OfferQuickView(props) {

  console.log(props.offer);

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
          <h3>Amount: {props.offer.price}</h3>
          <h3>Date: {props.offer.created}</h3>
        </Item>
      </Stack>
    </div>
  );
}
