import React from 'react'
import { Avatar, AvatarGroup, Typography } from '@mui/material'

function OnlineFriends() {
    return (
        <>
            <Typography variant='h6' fontWeight={100} mb={2}>
                Online Friends
            </Typography>
            <AvatarGroup
                renderSurplus={(surplus) => <span>
                    {
                        surplus >= 9500 ?
                            ">9k"
                            : (surplus > 999 ? "+" + (Math.round((surplus) / 1000)).toString() + "k" : surplus)
                    }

                </span>}
                max={7}
                total={24}
            >
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/5.jpg" />
                <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/6.jpg" />
                <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/7.jpg" />
                <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/8.jpg" />
            </AvatarGroup>
        </>
    )
}

export default OnlineFriends