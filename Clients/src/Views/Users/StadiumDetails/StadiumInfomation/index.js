import React, { useEffect, useRef, useMemo } from "react";
import ChildPageLayout from "../../../../Components/ChildPageLayout";
// import { fetchGetStadiumDetailsBeforeBooking } from "../../../../middlewares/user/fetchBooking/fetchBooking";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import {
  onPopupClose,
  onTabClose,
} from "../../../../Slices/Features/Popup/popupSlice";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Divider, Typography } from "@material-ui/core";

import ShowAddress from "./ShowAddress";
import ShowTel from "./ShowTel";
import ShowCancelBooking from "./ShowCancelBooking";
import ShowFollowers from "./ShowFollowers";
import ListStadiums from "./ListStadiums";

const useStyles = makeStyles((theme) => ({}));

const StadiumInformation = React.memo(({ getTabChange, ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { feedStadiumData } = useShallowEqualSelector(
    (state) => state.feedStadium
  );
  // const { preStadiumsData } = useShallowEqualSelector(
  //   (state) => state.preBooking
  // );
  const stateRef = useRef(feedStadiumData);
  const { stadiumId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => getTabChange(0), [getTabChange]);

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

  // useEffect(() => {
  //   dispatch(fetchGetStadiumDetailsBeforeBooking(stadiumId));
  // }, [dispatch, stadiumId]);

  useEffect(() => dispatch(onTabClose()), [dispatch]);

  useMemo(
    () => feedStadiumData.forEach((items) => (stateRef.current = items)),
    [feedStadiumData]
  );

  return (
    <ChildPageLayout title="Stadium Information">
      <Box mt={2} padding="1rem 0px">
        <Box mb={2}>
          <Typography variant="h4" color="textSecondary">
            ພາບລວມເດີ່ນ
          </Typography>
        </Box>
        <Divider />
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
              <ShowFollowers data={stateRef.current} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
              <ShowAddress data={stateRef.current} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
              <ShowTel data={stateRef.current} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={6} xs={12}>
              <ShowCancelBooking data={stateRef.current} />
            </Grid>
          </Grid>
        </Box>
        {/* <Box mt={4}>
          <Box mb={2}>
            <Typography variant="h4" color="textSecondary">
              {`ທັງໝົດມິ ${preStadiumsData.length} ສະໜາມ`}
            </Typography>
          </Box>
          <Divider />
          <ListStadiums stadiumsData={preStadiumsData} />
        </Box> */}
      </Box>
    </ChildPageLayout>
  );
});
export default StadiumInformation;
