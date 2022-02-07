import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Divider } from "@mui/material";

export default function ListingQuickView({ children }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Stack>
        <Item>
          <h3>Details</h3>
          <Divider />
          <h3>Title: Clean My Yard</h3>
          <h3>Category: Yard Work</h3>
          <h3>Amount: $500.00</h3>
          <h3>Date: February 4, 2022</h3>
        </Item>
      </Stack>
    </div>
  );
}
