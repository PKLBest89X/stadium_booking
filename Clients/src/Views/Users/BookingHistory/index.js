import React, { useEffect, useState } from "react";
import PageLayout from "../../../Components/PageLayout";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import NotificationAlert from "../../../Components/NotificationAlert";
import PopupLayout from "../../../Components/PopupLayout";

import BookingNavbarControl from "./BookingNavbarControl";
import PopupDetails from './PopupDetails';

import RoutesBookingHistoryUser from "../../../Routes/RouteBookingHistoryUser";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  floatingButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1,
  },
}));

const BookingHistory = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);

  let showBookingHistoryInfo = null;
  if (popupName === "showBookingHistoryInfo" && isOpen === true) {
    showBookingHistoryInfo = (
      <PopupLayout customWidth={true}>
        <PopupDetails />
      </PopupLayout>
    );
  }

  let alertSuccessCancelBooking = null;
  if (notiName === "alertSuccessCancelBooking" && notiState === true) {
    alertSuccessCancelBooking = (
      <NotificationAlert notiTitle="ຄຳເຕືອນ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ທ່ານຍົກເລີກການຈອງສຳເລັດ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {showBookingHistoryInfo}
      {alertSuccessCancelBooking}
      <PageLayout title="ປະຫວັດການຈອງເດີ່ນ" {...rest}>
        <BookingNavbarControl />
        <RoutesBookingHistoryUser />
      </PageLayout>
    </>
  );
});

export default BookingHistory;
