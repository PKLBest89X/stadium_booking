import React, { useEffect, useMemo, useRef, useCallback } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAddBookingNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
}));

const OverviewBooking = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { bookingNonAccountData } = useShallowEqualSelector(
    (state) => state.bookingNonAccount
  );
  const stateRef = useRef(bookingNonAccountData);
  const { stadiumId_Admin } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
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

  useMemo(
    () => bookingNonAccountData.forEach((items) => (stateRef.current = items)),
    [bookingNonAccountData]
  );

  const onGetCurrentBooking = useCallback(async () => {
    try {
      const staffToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      if (staffToken && staffToken.token) {
        const addBookingRequest = await dispatch(
          fetchAddBookingNonAccount(staffToken.token)
        );
        const getResult = unwrapResult(addBookingRequest);
        if (getResult.status !== 400) {
          history.push(`${url}/${stateRef.current.b_id}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, history, url]);

  return (
    <PageLayout title="Stadium Booking" {...rest}>
      <div className={classes.pageContainer}>
        <Button
          onClick={onGetCurrentBooking}
          color="primary"
          variant="contained"
        >
          ການຈອງຂອງລູກຄ້າທົ່ວໄປ
        </Button>
      </div>
    </PageLayout>
  );
});

export default OverviewBooking;