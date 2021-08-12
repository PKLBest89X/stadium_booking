import React, { useEffect, useRef, useMemo } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { onTabClose } from "../../../../../Slices/Features/Popup/popupSlice";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import { fetchCheckPost } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidPost";
import { fetchFeedPostOfStadiumOnSeleted } from "../../../../../middlewares/user/fetchFeedPost/fetchFeedPost";

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
  },
  typography: {
    display: "-webkit-box",
    // WebkitLineClamp: 2,
    // WebkitBoxOrient: "vertical",
    // textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: "1.3em",
    height: "2.6em",
  },
  link: {
    fontSize: "1.2em",
    cursor: "pointer",
    color: "black",
  },
}));

const ShowPostBySelected = React.memo(({ getTabChange, ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkPostResult } = useShallowEqualSelector(
    (state) => state.validPostData
  );
  const { postOnSelectedData } = useShallowEqualSelector(
    (state) => state.feedPost
  );
  const stateRef = useRef(postOnSelectedData);
  const { stadiumId, postId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => getTabChange(1), [getTabChange]);

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchCheckPost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (checkPostResult === 404) {
      history.replace("/404");
    }
  }, [history, checkPostResult]);

  useEffect(() => {
    const request = {
      stadiumId,
      postId,
    };
    dispatch(fetchFeedPostOfStadiumOnSeleted(request));
  }, [dispatch, stadiumId, postId]);

  useMemo(
    () => postOnSelectedData.forEach((items) => (stateRef.current = items)),
    [postOnSelectedData]
  );

  useEffect(() => dispatch(onTabClose()), [dispatch]);

  return (
    <ChildPageLayout title="Stadium Overall">
      <Box padding="2rem">
        <Card className={classes.root} elevation={10}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={`/assets/images/adminPics/stadiumPics/icons/${stateRef.current.logo}`}
                alt={stateRef.current.st_name}
              />
            }
            title={
              <Typography className={classes.link}>
                {stateRef.current.st_name}
              </Typography>
            }
            subheader={`ເມື່ອ: ${moment(stateRef.current.post_date).format(
              "dddd MMMM D, Y"
            )}`}
          />
          <CardMedia
            className={classes.media}
            image={`/assets/images/adminPics/postPics/${stateRef.current.post_img}`}
            title={stateRef.current.post_title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h4" component="h2">
              {stateRef.current.post_title}
            </Typography>
            <Typography
              className={classes.typography}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {stateRef.current.pt_description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ChildPageLayout>
  );
});
export default ShowPostBySelected;
