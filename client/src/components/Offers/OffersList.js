import React from "react";
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import OffersListItem from "./OffersListItem";
import { Divider } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function OffersList() {
  return (
    <Item>
      <h3>Offers</h3>
      <Divider />
      <OffersListItem />
      <OffersListItem />
      <OffersListItem />
      <OffersListItem />
    </Item>
  );
}
