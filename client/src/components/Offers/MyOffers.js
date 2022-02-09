import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyOfferItem from "./MyOfferItem";
import OfferQuickView from './OfferQuickView';
import axios from "axios";
import { UserContext } from "../Application.js";

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

  console.log(offers);

  const [offer, setOffer] = useState("")

	const handleOfferChange = function () {
    setOffer(this);
	}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>
            {offers.map((offer) => {
              return <MyOfferItem onClick={handleOfferChange.bind(offer)} offer={offer} />
            })}
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <OfferQuickView offer={offer}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}