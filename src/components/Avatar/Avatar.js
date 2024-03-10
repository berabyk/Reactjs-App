import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, FormControlLabel, Grid, List, ListItem, ListItemSecondaryAction, Modal, Radio, RadioGroup, avatarClasses } from '@mui/material';
import { PutWithAuth } from '../../services/HttpService';

function Avatar(props) {

    const { avatarId, userId, userName } = props;
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const saveAvatar = () => {
        PutWithAuth("/users/" + localStorage.getItem("currentUser"), {
            avatar: selectedValue,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        saveAvatar();
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: "grid",
        gridTemplateColumns: "auto auto auto",
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, margin: 5 }}>
                <CardMedia
                    component="img"
                    alt="user_avatar"
                    image={`/avatars/avatar${selectedValue}.png`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User info
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color='primary' onClick={handleOpen}>
                        Change Avatar
                    </Button>
                </CardActions>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <RadioGroup
                        name="use-radio-group"
                        value={selectedValue}
                        onChange={handleChange}
                    >
                        <Grid container spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            {[1, 2, 3, 4, 5, 6].map((key) => {
                                return (
                                    <Grid key={key} item>
                                        <FormControlLabel
                                            value={key}
                                            label={
                                                <CardMedia
                                                    sx={{ width: 100 }}
                                                    component="img"
                                                    alt={`Avatar n°${key}`}
                                                    image={`/avatars/avatar${key}.png`}
                                                    title="User Avatar"
                                                />
                                            }
                                            labelPlacement="start"
                                            control={<Radio />} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </RadioGroup>
                </Box>
            </Modal>
        </>
    )
}

export default Avatar;