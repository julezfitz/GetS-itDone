import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyFormat from "react-currency-format";
import EditListingModal from "./EditListing";

export default function MyListingItem(props) {
  
  const [edit, setEdit] = useState(false);
  const [editListingOpen, setEditListingOpen] = useState(false);

  const handleEditListingOpen = () => {
    setEdit(true);
    setEditListingOpen(true);
  }
  const handleEditListingClose = () => {
    setEdit(false);
    setEditListingOpen(false);
  }

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, m: 2, flexGrow: 1 }}
      style={{ cursor: "pointer" }}
    >
      <Grid container spacing={2} onClick={props.onClick}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                style={{ marginTop: 10 }}
              >
                {props.listing.title}
              </Typography>
            </Grid>
          </Grid>

          <Grid>
            <Typography
              variant="subtitle1"
              component="div"
              style={{ marginTop: 10 }}
            >
              <CurrencyFormat
                value={props.listing.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Typography>
          </Grid>
            <Grid>
              <IconButton
                size="large"
                color="inherit"
                style={{ marginLeft: 15 }}
                value={props.listing.id}
                onClick={handleEditListingOpen}
              >
                <EditIcon />
              </IconButton>
              <EditListingModal
						    open={editListingOpen}
						    handleClose={handleEditListingClose}
                listing={props.listing}
                handleUpdatedChange={props.handleUpdatedChange}
                edit={edit}
					    />
            </Grid>
            <Grid>
              <IconButton
                size="large"
                color="inherit"
                style={{ marginLeft: 5 }}
                value={props.listing.id}
                onClick={props.handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
