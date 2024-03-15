import React, { useEffect, useRef, useState } from "react";
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

function CommentForm(props) {
    const { postId, userId, userName, setCommentRefresh } = props;
    const [text, setText] = useState("");
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("refreshKey");
        localStorage.removeItem("userName");
        navigate("/auth");
        navigate(0);
      }

    const saveComment = () => {
        PostWithAuth("/comments", {
            postId: postId,
            userId: userId,
            text: text,
        })
            .then((res) => {
                if (!res.ok) {
                    RefreshToken()
                        .then((res) => {
                            if (!res.ok) {
                                logout();
                            } else {
                                return res.json()
                            }
                        })
                        .then((result) => {
                            console.log(result)

                            if (result != undefined) {
                                localStorage.setItem("tokenKey", result.accessToken);
                                setCommentRefresh();
                                saveComment();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else
                    res.json()

                setCommentRefresh();

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
        }}>
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(input) => {
                    handleChange(input.target.value);
                }}
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
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Comment
                        </Button>
                    </InputAdornment>
                }
                style={{ color: "black", backgroundColor: 'white' }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;
