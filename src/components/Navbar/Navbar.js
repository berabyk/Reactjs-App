import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";


function Navbar() {
    let navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("currentUser");
        // localStorage.removeItem("refreshKey");
        localStorage.removeItem("userName");
        navigate(0);
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                    </Typography>

                    <Typography variant="h6">
                        {
                            localStorage.getItem("currentUser") == null
                                ? <Button color="inherit" component={Link} to="/auth">
                                    Login/Register
                                </Button> :
                                <div>
                                    <IconButton color="inherit" onClick={onClick}>
                                        <LockOpen color="inherit"></LockOpen>
                                    </IconButton>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}
                                    >
                                        Profile
                                    </Button>
                                </div>
                        }

                    </Typography>

                    {/* <Button color="inherit">Login</Button>
                    <Button color="inherit" component={Link} to={{ pathname: '/users/' + userId }}>User</Button> */}
                </Toolbar>
            </AppBar>

        </div>
    )
}

export default Navbar;