import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Card, CardMedia, CardContent } from "@material-ui/core";
import moment from "moment";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 64,
    height: 64,
    boxShadow: ".5px .5px 3px .5px rgba(0, 0, 0, .5)",
    cursor: "pointer",
  },
  ItemsContainer: {
    transition: "200ms ease-in-out",
    cursor: "pointer",
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
    maxHeight: "130px",
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

const AllPostItems = ({ getitems }) => {
  const classes = useStyles();
  let history = useHistory();
  const { url } = useRouteMatch();

  const onShowPostWithSelecting = (postId) => {
    history.push(`${url}/${postId}`);
  };

  return (
    <div className={classes.ItemsContainer}>
      <Card
        className={classes.root}
        elevation={10}
        onClick={() => onShowPostWithSelecting(getitems.pt_id)}
      >
        <CardMedia
          className={classes.media}
          image={`/assets/images/adminPics/postPics/${getitems.post_img}`}
          title={getitems.post_title}
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
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Post ເມື່ອ: ${moment(getitems.post_date).format("DD/MM/YYYY")}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllPostItems;
