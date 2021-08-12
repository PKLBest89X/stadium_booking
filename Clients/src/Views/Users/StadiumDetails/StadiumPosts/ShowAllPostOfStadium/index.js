import React, { useEffect } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import {
  onPopupClose,
  onTabClose,
} from "../../../../../Slices/Features/Popup/popupSlice";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Divider } from "@material-ui/core";

import { fetchFeedPostOfStadium } from "../../../../../middlewares/user/fetchFeedPost/fetchFeedPost";
import AllPostItems from "./AllPostItems";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    top: 0,
    left: 0,
  },
  layoutContainer: {
    padding: "2em",
  },
  contentContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gridGap: "1em",
  },
}));

const ShowAllPostOfStadium = React.memo(({ getTabChange, ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { postOfStadiumData, postOfStadiumSuccess } = useShallowEqualSelector(
    (state) => state.feedPost
  );
  const { stadiumId } = useParams();
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
    dispatch(fetchFeedPostOfStadium(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => dispatch(onTabClose()), [dispatch]);

  return (
    <ChildPageLayout title="Stadium Overall">
      <div className={classes.root}>
        <div className={classes.layoutContainer}>
          <Box mb={2}>
            <Typography variant="h4" color="textSecondary">
              Post ທັງໝົດຂອງເດີ່ນ
            </Typography>
          </Box>
          <Divider />
          <Box mt={3}>
            <div className={classes.contentContainer}>
              {postOfStadiumData.map((items) => {
                return <AllPostItems key={items.pt_id} getitems={items} />;
              })}
            </div>
          </Box>
        </div>
      </div>
    </ChildPageLayout>
  );
});
export default ShowAllPostOfStadium;
