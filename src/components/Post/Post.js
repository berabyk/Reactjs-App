import React, { useEffect, useRef, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "@emotion/styled";
import CommentIcon from '@mui/icons-material/Comment';
import {Container } from "@mui/material";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { DeleteWithAuth, PostWithAuth } from "../../services/HttpService";

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

function Post(props) {
  const { postId, title, text, userId, userName, likes } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const setCommentRefresh = () => {
    setRefresh(true);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1)
    } else {
      deleteLike();
      setLikeCount(likeCount - 1)
    }
  }

  const refreshComments = () => {
    fetch("/comments?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
    setRefresh(false);
  }

  const saveLike = () => {
    PostWithAuth("/likes", {
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  const deleteLike = () => {
    DeleteWithAuth("/likes/" + likeId)
      .catch((err) => console.log(err))

  }

  const checkLikes = () => {
    var likeControl = likes.find((like => like.userId == localStorage.getItem("currentUser")));
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }

  useEffect(() => {
    checkLikes();
  }, []);

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      refreshComments();
  }, [refresh]);


  return (
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
        title={title}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={disabled}
          onClick={handleLike}
          aria-label="add to favorites">
          <FavoriteIcon style={isLiked ? { color: "red" } : null} />
        </IconButton>

        {likeCount}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Container fixed>
            {error ? "error" :
              isLoaded ? commentList.map(comment => (
                <Comment userId={comment.userId} userName={comment.userName} text={comment.text}></Comment>
              )) : "Loading"}

            {
              disabled
                ? ""
                : <CommentForm postId={postId} userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} setCommentRefresh={setCommentRefresh}
                />
            }

            {/* {disabled ? "" :
              <CommentForm userId={1} userName={"USER"} postId={postId} setCommentRefresh={setCommentRefresh}></CommentForm>} */}
          </Container>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Post;
