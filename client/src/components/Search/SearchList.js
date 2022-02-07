import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SearchListItem from "./SearchListItem";
import ListingDetails from '../Listings/ListingDetails';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function SearchList() {
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