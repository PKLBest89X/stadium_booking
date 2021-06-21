import React, { useEffect } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { fetchGetPost } from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";
import { useDispatch } from "react-redux";
import PostTable from "./PostTable";
import PostToolbar from "./PostToolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10rem",
    boxShadow: "1px 1px 3px 1px rgba(0, 0, 0, .5)",
  },
}));

const StadiumPosts = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { postsData, postSuccess } = useShallowEqualSelector(
    (state) => state.posts
  );
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useEffect(() => {
    dispatch(fetchGetPost(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  const ShowEmptyPost = () => (
    <div className={classes.emptyView}>
      <Typography variant="h3">ບໍ່ມີ Post ຂອງເດີ່ນ</Typography>
    </div>
  );
  return (
    <PageLayout title="Stadium Post" {...rest}>
      <div className={classes.pageContainer}>
        <Box mb={3}>
          <Typography color="textPrimary" variant="h2">
            Post ຂອງເດີ່ນ
          </Typography>
        </Box>
        <Divider />
        <Box mt={3}>
          <PostToolbar />
          {postSuccess === true && <PostTable posts={postsData} />}
          {postSuccess === false && <ShowEmptyPost />}
        </Box>
      </div>
    </PageLayout>
  );
});

export default StadiumPosts;
