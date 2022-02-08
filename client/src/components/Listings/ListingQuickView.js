import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

export default function ListingQuickView(props) {
  const [state, setState] = React.useState({
    right: false,
  });

  console.log(props.listing);

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
          <h3>Amount: {props.listing.price}</h3>
          <h3>Date: {props.listing.created}</h3>
        </Item>
      </Stack>
    </div>
  );
}
