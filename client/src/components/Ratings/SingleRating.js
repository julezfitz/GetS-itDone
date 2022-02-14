import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

export default function SingleRating(rating) {
    return (
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt={rating.rating.rater.firstName} src={rating.rating.rater.profileImage} />
            </ListItemAvatar>
            <ListItemText
                primary={`${rating.rating.rater.firstName} ${rating.rating.rater.lastName}`}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: "inline" }}
                            component='span'
                            variant='body2'
                            color='text.primary'
                        >
                            <Rating
                                name='user-rating'
                                size='small'
                                value={parseInt(rating.rating.rating)}
                                readOnly
                            />
                            &nbsp;- {rating.rating.comment}
                        </Typography>
                    </React.Fragment>
                }
            />
            <Divider variant='inset' component={"span"} />
        </ListItem>
    );
}
