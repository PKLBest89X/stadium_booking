import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Button, Box } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 64,
    height: 64,
    boxShadow: ".5px .5px 3px .5px rgba(0, 0, 0, .5)",
    cursor: "pointer",
  },
  ItemsContainer: {
    transition: "200ms ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    display: "block",
    maxHeight: "100px",
  },
  typography: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "1.3em",
    height: "2.6em",
  },
  link: {
    textDecoration: "none",
    fontSize: "1.2em",
    cursor: "pointer",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const HomeContents = ({ getitems }) => {
  const classes = useStyles();
  const history = useHistory();
  const cardRef = useRef();
  const onPushPost = (event) => {
    if (cardRef.current !== event.target) {
      history.push(`/stadium/${getitems.st_id}/posts/${getitems.pt_id}`);
    }
  };
  return (
    <div className={classes.ItemsContainer}>
      <Card className={classes.root} elevation={10}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`/assets/images/adminPics/stadiumPics/icons/${getitems.logo}`}
              alt={getitems.st_name}
              onClick={() => history.push(`/stadium/${getitems.st_id}`)}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link className={classes.link} to={`/stadium/${getitems.st_id}`}>
              {getitems.st_name}
            </Link>
          }
          subheader={moment(getitems.post_date).format("dddd MMMM D, Y")}
        />
        <CardMedia
          className={classes.media}
          image={`/assets/images/adminPics/postPics/${getitems.post_img}`}
          title={getitems.post_title}
          onClick={onPushPost}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h4" component="h2" noWrap>
            {getitems.post_title}
          </Typography>
          <Typography
            className={classes.typography}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {getitems.pt_description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() =>
                history.push(`/stadium/${getitems.st_id}/stadium-booking`)
              }
            >
              ຈອງເດີ່ນ
            </Button>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
};

export default HomeContents;
