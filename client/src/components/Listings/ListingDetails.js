import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function ListingDetails({ children }) {
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
            {children}
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{ style: { top: "70px" } }}
          >
            <Stack spacing={2}>
              <h1>Clean My Yard</h1>
              <Item>
                <h3>Amount Offered: $500.00</h3>
              </Item>
              <Item>
                {/* <img
              sx={{ maxWidth: '25%', maxHeight: '25%' }}
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
              alt="beachPicture"
              loading="lazy"
            /> */}
                THIS WILL BE AN IMAGE
              </Item>
              <Divider />
              <Item>
                <h3>Category: Yard Work</h3>
                <h4>Poster: John Smith</h4>
                <h3>Description</h3>
                <p>
                  I know it'll be challenging but I'd like someone to come and
                  clean up my beach. I will also need you to rake the beach so
                  that it is even.
                </p>
                <h4>Date Listed: February 4, 2022</h4>
              </Item>
            </Stack>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}