import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleRating from "./SingleRating";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function UserRatingsModal({ open, handleClose, user }) {
    const [ratings, setRatings] = useState([]);
    const [average, setAverage] = useState('');

    useEffect((() => {
        const controller = new AbortController();

        if (user.bidderId) {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/ratings`, {
                params: { rateeId: user.bidderId},
                signal: controller.signal
            })
            .then((results) => {
                setRatings(results.data);
                let averageCalc = results.data.reduce((total, next) => total + parseInt(next.rating), 0) / results.data.length;
                setAverage(averageCalc.toFixed(1));
            })
            .catch((err) => {})
        }

        return () => controller.abort()
    }), [user.bidderId])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 15, top: 15, }}>
        	            <CloseIcon />
                    </IconButton>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Rating name="user-rating" size="small" value={parseInt(average)} readOnly />
                    <Typography sx={{color: "white"}} component={'span'} variant='string'><br></br> {average > 0 ? `Rating: ${average} / 5` : `This user has no ratings`}</Typography>
                    <Typography sx={{color: "white"}} variant="body2">{ratings.length} {ratings.length > 1 ? "ratings" : "rating"}</Typography>

                    <Typography component={'span'} id='modal-modal-description' sx={{ mt: 2 }}>
                        <Box
                            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                            noValidate
                            autoComplete='off'
                        >
                            <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                                    {ratings.map((rating) => {
                                        return (
                                            <SingleRating key={ Math.random().toString(36).substr(2, 9)} rating={rating}/>
                                        )
                                    })}
                                </List>
                            </Paper>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

