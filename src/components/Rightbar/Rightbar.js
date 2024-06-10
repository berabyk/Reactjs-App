import { Avatar, AvatarGroup, Box, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'
import Conversations from './LatestConversations';
import LatestPhotos from './LatestPhotos';
import OnlineFriends from './OnlineFriends';

function Rightbar() {
  return (
    <Box
      flex={2}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box
        position={"fixed"}
        width={300}
      >
        <OnlineFriends />
        <LatestPhotos />
        <Conversations />
      </Box>
    </Box>
  )
}

export default Rightbar;