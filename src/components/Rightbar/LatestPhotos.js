import React from 'react'
import { ImageList, ImageListItem, Typography } from '@mui/material'

function LatestPhotos() {
    return (
        <>
            <Typography variant='h6' fontWeight={100} mt={4} mb={2}>
                Latest Photos
            </Typography>
            <ImageList cols={3} rowHeight={100} gap={5}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    )
}

export default LatestPhotos

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
];