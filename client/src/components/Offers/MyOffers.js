import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MyOfferItem from "./MyOfferItem";
import OfferQuickView from "./OfferQuickView";
import axios from "axios";
import { UserContext } from "../Application.js";
import { format } from "date-fns";
import { Divider } from "@mui/material";
import ApplicationAcceptedView from "./ApplicationAcceptedView";
import { Link } from 'react-router-dom'
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function MyOffers() {
  const { userDetails } = useContext(UserContext);

  const [offers, setOffers] = useState([]);
  const [listingOffers, setListingOffers] = useState([]);
  const [deletedItem, setDeletedItem] = useState("");

  const [offer, setOffer] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`http://localhost:8001/offers?bidderId=${userDetails.id}`, {
        signal: controller.signal,
      })
      .then((result) => {
        setOffers(result.data);

        setOffer(result.data[0]);
        if(result.data[0]) {
        let date = new Date(result.data[0].created);
        let formattedDate = format(date, "dd/MM/yyyy");
        setDate(formattedDate);
        }
      });
    return () => controller.abort();
  }, [userDetails, deletedItem]);


  const handleOfferChange = function () {
    let date = new Date(this.created);
    let formattedDate = format(date, "dd/MM/yyyy");
    setDate(formattedDate);

    setOffer(this);
  };

  const handleDelete = (offer) => {
    axios.delete(`http://localhost:8001/offers/${offer.offerId}`).then((result) => {
      console.log(result.data);
      setDeletedItem(offer);
      setOffer("");
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}
        sx={{
          transition: "300ms ease",
          "&:hover > .MuiGrid-item": {
            opacity: 0.5,
          },

          ".MuiGrid-item:hover": {
            opacity: 1,
          },
          ".MuiGrid-item:hover .MuiTypography-root": {
            color: "white !important",
          },
        }}>
          {offers.length > 0 ?
            <Item>
              {offers.map((offer) => {
                return (
                  <MyOfferItem
                    key={Math.random().toString(36).substr(2, 9)}
                    onClick={handleOfferChange.bind(offer)}
                    offer={offer}
                    handleDelete={handleDelete.bind(null, offer)}
                  />
                );
              })}
            </Item>
            : <Item>
              <Typography variant='h4' component='h2'>
                You have no offers to show. Check out <Link style={{ color: 'orange' }} to="/">available listings</Link> to get started.
              </Typography>
            </Item>
          }
        </Grid>
        <Grid item xs={8}>
          {offers.length > 0 && <Item>
            <OfferQuickView offer={offer} date={date} />
            {offer.accepted && (
              <Item>
                <h2>Confirmed</h2>
                <Divider />
                <ApplicationAcceptedView
                  listingId={offer.listingId}
                  acceptedOffer={offer}
                />
              </Item>
            )}
          </Item>}
        </Grid>
      </Grid>
    </Box>
  );
}
