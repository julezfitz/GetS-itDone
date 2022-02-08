import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SearchListItem from "./SearchListItem";
import ListingDetails from '../Listings/ListingDetails';
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function SearchList({keywords}) {
  const [listings, setListings] = useState([]);
  useEffect((() => {
    axios.get(`http://localhost:8001/listings/keywords=${keywords}`).then((result) => {
      return setListings(result.data);
    })
  }))

  //loop through listings to create individual listings
  return (
          <Item>
            <ListingDetails>
              <SearchListItem />
            </ListingDetails>
            <ListingDetails>
              <SearchListItem />
            </ListingDetails>
            <ListingDetails>
              <SearchListItem />
            </ListingDetails>
            <ListingDetails>
              <SearchListItem />
            </ListingDetails>
          </Item>
  );
}