import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
import OffersListItem from "./OffersListItem";
import AcceptedView from "./AcceptedView";
import { Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function OffersList(props) {

  const [listingOffers, setListingOffers] = useState([]);
  const [acceptedOffer, acceptOffer] = useState("");
  const [declinedOffer, setDeclinedOffer] = useState("");

  useEffect((() => {
    if (props.listingId) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/listings/${props.listingId}/offers`).then((result) => {
        setListingOffers(result.data.offers);

        //check if any offers have been accepted and set state for acceptedOffer
        let acceptedOffer = (result.data.offers).find(offer => offer.accepted === true);
        acceptedOffer ? acceptOffer(acceptedOffer) : acceptOffer("");

        setDeclinedOffer("")
      })
    }
  }), [props.listingId, declinedOffer])

  const handleAccept = function (offer) {
    acceptOffer(offer);
    axios.put(`${process.env.REACT_APP_SERVER_URL}/offers/${offer.offerId}`, { "accepted": true })
      .then((result) => {
        console.log(result.data);
      })
  }

  const handleDecline = function (offer) {
    axios.put(`${process.env.REACT_APP_SERVER_URL}/offers/${offer.offerId}`, { "accepted": false })
      .then((result) => {
        setDeclinedOffer(offer);
      })
  }

  return (
    <Item>
      <Divider />
      <h2>{acceptedOffer ? "Confirmed" : "Offers"}</h2>
      {(acceptedOffer && <AcceptedView listingId={props.listingId} acceptedOffer={acceptedOffer} />) ||
       ( listingOffers.length > 0 ? (listingOffers.map((offer) => {
          if (!offer.accepted && !offer.pending) {
            return <OffersListItem key={Math.random().toString(36).substr(2, 9)} offerDeclined={true} accept={handleAccept} decline={handleDecline} offer={offer} />
          } else {
            return <OffersListItem key={Math.random().toString(36).substr(2, 9)} accept={handleAccept} decline={handleDecline} offer={offer} />
          }
        })) : <Item style={{fontSize:15}}>You don't have any offers for this listing. Please check back later.</Item>
       )}
    </Item>
  );
}
