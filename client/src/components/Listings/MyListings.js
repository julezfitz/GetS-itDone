import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyListingItem from "./MyListingItem";
import ListingQuickView from './ListingQuickView';
import OffersList from "../Offers/OffersList";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MyListings() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            <MyListingItem />
            <MyListingItem />
            <MyListingItem />
            <MyListingItem />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ListingQuickView />
            <OffersList />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
