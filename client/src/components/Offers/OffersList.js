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
  const [acceptedOffer, acceptOffer] = useState("");

  useEffect((() => {
    if (props.listingId) {
      axios.get(`http://localhost:8001/listings/${props.listingId}/offers`).then((result) => {
        setListingOffers(result.data.offers);
      })
    }
  }), [props.listingId])

  const handleAccept = function (offer) {
    acceptOffer(offer);
    axios.put(`http://localhost:8001/offers/${offer.offerId}`, { "accepted": true })
      .then((result) => {
        console.log(result.data);
      })
  }

  const handleDecline = function (offer) {
    axios.put(`http://localhost:8001/offers/${offer.offerId}`, { "accepted": false })
      .then((result) => {
        console.log(result.data);
      })
  }

  console.log(acceptedOffer);

  return (
    <Item>
      <h3>Offers</h3>
      <Divider />
      {listingOffers.map((offer) => {
        return <OffersListItem key={Math.random().toString(36).substr(2, 9)} accept={handleAccept} decline={handleDecline} offer={offer} />
      })}
    </Item>
  );
}
