import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function OffersListItem(props) {

    return (  
      <Grid container spacing={2}>
        <Grid item></Grid>
        <Grid item xs={12} sm container spacing={3}>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
              Congrats! You chose {props.acceptedOffer.firstName} {props.acceptedOffer.lastName} to complete your 
              job. You can reach them at <a href={`mailto:${props.acceptedOffer.email}`}>{props.acceptedOffer.email}</a> to 
              make arrangements.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}