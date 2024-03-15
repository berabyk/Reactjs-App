import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button, FormHelperText, Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { PostWithoutAuth } from "../../services/HttpService";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {
        PostWithoutAuth("/auth/" + path, {
            userName: username,
            password: password,
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", username);
                navigate(0);
            })
            .catch((err) => {
                console.log(err);
                handleClick();
            })
    }

    const handleButton = (path) => {
        sendRequest(path);
        setUsername("");
        setPassword("");
    }

    return (

        <>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                message="Credentials are not correct"
                onClose={handleClose}
            />
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input
                    onChange={(i) => handleUsername(i.target.value)}
                />
                <InputLabel
                    style={{ top: 80 }}
                >
                    Password
                </InputLabel>
                <Input
                    style={{ top: 40 }}
                    onChange={(i) => handlePassword(i.target.value)}
                />
                <Button
                    variant="contained"
                    style={{
                        marginTop: 60,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white'
                    }}
                    onClick={() => handleButton("register")}
                >
                    Register
                </Button>
                <FormHelperText
                    style={{ margin: 20 }}
                >
                    Are you already registered?
                </FormHelperText>
                <Button
                    variant="contained"
                    style={{
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white'
                    }}
                    onClick={() => handleButton("login")}
                >
                    Login
                </Button>

            </FormControl>
        </>
    )
}

export default Auth