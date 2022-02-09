import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function ListingDetails(props) {
  //probably need to do an api call here to get all the details -- Julie
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            style={{ cursor: "pointer" }}
            onClick={toggleDrawer(anchor, true)}
          >
            {props.children}
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{ style: { top: "70px" } }}
          >
            <Stack spacing={2}>
              <h1>{props.listing.title}</h1>
              <Item>
                <h3>Amount Offered: $500.00</h3>
              </Item>
              <Item>
                {/* <img
              sx={{ maxWidth: '25%', maxHeight: '25%' }}
              src={props.listing.image_1}
              alt="beachPicture"
              loading="lazy"
            /> */}
                THIS WILL BE AN IMAGE
              </Item>
              <Divider />
              <Item>
                <h3>Category: {props.listing.category}</h3>
                <h4>Poster: {props.listing.first_name} {props.listing.last_name}</h4>
                <h3>Description</h3>
                <p>
                {props.listing.description}
                </p>
                <h4>{props.listing.created}</h4>
              </Item>
            </Stack>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}