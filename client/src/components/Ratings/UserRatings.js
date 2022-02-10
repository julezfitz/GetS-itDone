import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CategoryList from "../Categories/CategoryList";
import { Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

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

export default function UserRatingsModal({ open, handleClose, userId }) {


    axios.get(`http://localhost:8001/ratings/`, { params: { userId } })
        .then((results) => {
            console.log(results.data)
        })

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography id='modal-modal-title' variant='h6' component='h2'>
                        User Ratings
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        <Box
                            // component='form'
                            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                            noValidate
                            autoComplete='off'
                        >

                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}