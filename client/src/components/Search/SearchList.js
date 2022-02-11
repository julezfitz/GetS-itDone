import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SearchListItem from "./SearchListItem";
import ListingDetails from "../Listings/ListingDetails";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  width: "100%"
}));

//If no chip is selected we can fetch all listings

export default function SearchList({ keywords, listings }) {

  const [listing, setListing] = useState({});

  const handleListingChange = (e) => {
    console.log(e);
    setListing(e);
  }

  return (
    <Item className='search-results'>
      <ListingDetails listing={listing} className="search-results__item">
        {listings.map(listing => {
          return (
            <SearchListItem key={Math.random().toString(36).substr(2, 9)} onChoice={handleListingChange} listing={listing} />
          );
        })}
      </ListingDetails>

    </Item>
  );
}
