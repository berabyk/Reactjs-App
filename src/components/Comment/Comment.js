import React from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";



function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
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
