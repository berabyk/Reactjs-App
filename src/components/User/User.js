import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { Grid, Stack } from "@mui/material";
import { GetWithAuth } from "../../services/HttpService";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState();

    const getUser = () => {
        GetWithAuth("/users/" + userId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setUser(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                {
                    user
                        ? <Avatar avatarId={user.avatar} userId={""} userName={"Username"} />
                        : ""
                }
            </Grid>
            <Grid item xs={8}>

                <UserActivity userId={userId} />
            </Grid>
        </Grid>
    )
}
export default User;
