import React, { useEffect, useMemo, useRef, useCallback } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchGetAllBooking } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";
import { fetchGetAllBookingDetails } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";

import NotificationAlert from "../../../../Components/NotificationAlert";
import BookingNavbarControl from './BookingNavbarControl';
import BookingListUnCheckout from "./BookingListUnCheckout";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1
  }
}));

const OverviewBooking = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);


//////////////////////////////////////////////////////////////////////ທົດລອງ
const { getAllBookingDetailsData } = useShallowEqualSelector(
  (state) => state.prePayment
);
  



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



  //////////////////////////////////////////////////////////////////////ທົດລອງ
  useEffect(() => {
    dispatch(fetchGetAllBookingDetails(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    dispatch(fetchGetAllBooking(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);


  let alertSuccessBookingNonAccount = null;
  if (notiName === "successBookingNonAccount" && notiState === true) {
    alertSuccessBookingNonAccount = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ການຈອງຂອງທ່ານສຳເລັດແລ້ວ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {alertSuccessBookingNonAccount}
      <PageLayout title="Stadium Booking" {...rest}>
        <BookingNavbarControl />
        <Box padding="1rem">
          <Typography variant="h3" color="textSecondary">
            ການຈອງຂອງລູກຄ້າ
          </Typography>
        </Box>
        <Divider />
        <Box padding="1rem">
          <BookingListUnCheckout bookingBillData={getAllBookingDetailsData} />
        </Box>
      </PageLayout>
    </>
  );
});

export default OverviewBooking;
