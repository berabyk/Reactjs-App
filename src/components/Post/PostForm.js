import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import styled from "@emotion/styled";
import { Alert, Button, InputAdornment, OutlinedInput, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { PostWithAuth } from "../../services/HttpService";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
}));


function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        PostWithAuth("/posts",{
            title: title,
            userId: userId,
            text: text,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleSubmit = () => {
        savePost();
        refreshPosts();
        setTitle("");
        setText("");
        setIsSent(true);
    };

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    };

    const handleText = (value) => {
        setText(value);
        setIsSent(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    }

    return (
        <div>
            <Snackbar open={isSent} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">This is a success Alert.</Alert>
            </Snackbar>
            <Card
                sx={{
                    width: 800, margin: 5
                }}
            >
                <CardHeader
                    avatar={
                        <Link to={{ pathname: '/users/' + userId }} style={{ textDecoration: "none" }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName[0].toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={
                        <OutlinedInput
                            id="outlined-adortment-amount"
                            multiline
                            placeholder="Title"
                            InputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={(input) => {
                                handleTitle(input.target.value)
                            }}
                        >

                        </OutlinedInput>
                    }
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id="outlined-adortment-amount"
                            multiline
                            placeholder="Text"
                            InputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(input) => {
                                handleText(input.target.value)
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </Button>
                                </InputAdornment>
                            }
                        >

                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostForm;
