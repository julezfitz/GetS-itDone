import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import OffersListItem from "./OffersListItem";
import { Divider } from "@mui/material";
import { UserContext } from "../Application.js";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function OffersList(props) {

  const [listingOffers, setListingOffers] = useState([]);

  useEffect((() => {
    axios.get(`http://localhost:8001/listings/${props.listingId}/offers`).then((result) => {
      console.log(result.data);
      setListingOffers(result.data.offers);
    })
  }), [props.listingId])

  return (
    <Item>
      <h3>Offers</h3>
      <Divider />
      {listingOffers.map((offer) => {
        return <OffersListItem offer={offer}/>
      })}
    </Item>
  );
}
