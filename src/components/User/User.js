import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { Grid, Stack } from "@mui/material";

function User() {

    const { userId } = useParams();
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>

                <Avatar avatarId={0} userId={""} userName={"Username"} />
            </Grid>
            <Grid item xs={8}>

                <UserActivity />
            </Grid>
        </Grid>
    )
}
export default User;
