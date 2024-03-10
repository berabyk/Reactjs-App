import React, { useEffect, useState, forwardRef } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AppBar, Button, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import Post from '../Post/Post';
import { Close } from '@mui/icons-material';
import { GetWithAuth } from '../../services/HttpService';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
    const { isOpen, postId, setIsOpen } = props;
    const [open, setOpen] = useState(isOpen);
    const [post, setPost] = useState();

    const getPost = () => {
        GetWithAuth("/posts/" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setPost(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };


    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <Close />
                    </IconButton>
                    <Typography variant="h6" sx={{
                        marginLeft: 2,
                        flex: 1,
                    }}>
                        Close
                    </Typography>
                </Toolbar>
            </AppBar>
            {post ? <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                title={post.title} text={post.text}></Post> : "loading"}
        </Dialog>
    )
}


function UserActivity(props) {
    const { userId } = props;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [isOpen, setIsOpen] = useState();
    const [selectedPost, setSelectedPost] = useState();

    const [rows, setRows] = useState([]);

    const getActivity = () => {
        GetWithAuth("/users/activity/" + userId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setRows(result);
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        getActivity()
    }, [])

    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

    return (
        <div>
            {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
            <Paper sx={{ width: '100%', }}>
                <TableContainer sx={{
                    maxHeight: 440,
                    minWidth: 100,
                    maxWidth: 800,
                    marginTop: 50,
                }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                User Activity
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <Button onClick={() => handleNotification(row[1])}>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                            <TableCell align="right">
                                                {row[3] + " " + row[0] + " your post"}
                                            </TableCell>
                                        </TableRow>
                                    </Button>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default UserActivity