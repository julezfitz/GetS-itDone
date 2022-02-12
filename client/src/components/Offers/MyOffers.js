import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyOfferItem from "./MyOfferItem";
import OfferQuickView from './OfferQuickView';
import axios from "axios";
import { UserContext } from "../Application.js";
import { format } from 'date-fns'
import { Divider } from "@mui/material";
import ApplicationAcceptedView from "./ApplicationAcceptedView";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MyOffers() {

  const { userDetails } = useContext(UserContext);

  const [offers, setOffers] = useState([]);

  useEffect((() => {
    axios.get(`http://localhost:8001/offers?bidderId=${userDetails.id}`).then((result) => {
      setOffers(result.data);
    })
  }), [userDetails])

  const [offer, setOffer] = useState("");
  const [date, setDate] = useState("");

	const handleOfferChange = function () {
    let date = new Date(this.created);
    let formattedDate = format(date, 'dd/MM/yyyy');
    setDate(formattedDate);

    setOffer(this);
	}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            {offers.map((offer) => {
              return <MyOfferItem key={ Math.random().toString(36).substr(2, 9)} onClick={handleOfferChange.bind(offer)} offer={offer} />
            })}
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <OfferQuickView offer={offer} date={date}/>
            <Item>
      <Divider />
      <h3>
        {
        // acceptedOffer ? 
      "Confirmed"}</h3>
      <ApplicationAcceptedView 
      // listingId={props.listingId} acceptedOffer={acceptedOffer} 
      />
      </Item>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
