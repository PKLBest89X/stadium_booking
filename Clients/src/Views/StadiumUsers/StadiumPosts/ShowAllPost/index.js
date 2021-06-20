import React, { useEffect } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import PostTable from "./PostTable";
import PostToolbar from "./PostToolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Card } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
}));

const StadiumPosts = ({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { postsData } = useShallowEqualSelector((state) => state.posts);
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

  const ShowEmptyPost = () => (
    <Box display="flex" justifyContent="center" alignItems="center" p={10} boxShadow="1px 1px 3px 1px rgba(0, 0, 0, .5)">
      <Typography variant="h3">ບໍ່ມີ Post ຂອງເດີ່ນ</Typography>
    </Box>
  );

  return (
    <PageLayout title="Stadium Post" {...rest}>
      <div className={classes.pageContainer}>
        <PostToolbar />
        {postsData.length > 0 ? <PostTable /> : <ShowEmptyPost />}
      </div>
    </PageLayout>
  );
};

export default StadiumPosts;
