import React, { useEffect, useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "@emotion/styled";
import CommentIcon from '@mui/icons-material/Comment';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";



function Comment(props) {
    const { postId, title, text, userId, userName } = props;

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent : "flex-start",
            alignItems : "center",
        }}>
            <OutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none" }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName[0].toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{ color: "black", backgroundColor: 'white' }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default Comment;
