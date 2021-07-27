import React, { useEffect, useRef, useMemo } from "react";
import { useShallowEqualSelector } from "../../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { Typography, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  onLoadCurrentSaveSelectedData,
  onShowAlertCompareTime,
} from "../../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";
import { onPopupOpen } from "../../../../../../Slices/Features/Popup/popupSlice";
import { onNotiOpen } from "../../../../../../Slices/Features/Notification/NotificationSlice";

import BookingTable from "./BookingTable";
import BookingToolbar from "./BookingToolbar";
import TotalBookingPrice from "./TotalBookingPrice";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10rem",
    paddingBottom: "10rem",
  },
}));

const PreBooking = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const totalBookingPriceRef = useRef();
  const {
    selectedState,
    bookingDetailsData,
    bookingDetailsSelected,
    totalPrice,
  } = useShallowEqualSelector((state) => state.bookingDetails);
  const { feedStadiumData } = useShallowEqualSelector(
    (state) => state.feedStadium
  );
  const stateRef = useRef(feedStadiumData);
  useMemo(
    () => feedStadiumData.forEach((items) => (stateRef.current = items)),
    [feedStadiumData]
  );

  useEffect(() => dispatch(onLoadCurrentSaveSelectedData()), [dispatch]);

  const ShowEmptyBooking = () => (
    <div className={classes.emptyView}>
      <Typography variant="h4" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລການຈອງເດີ່ນຂອງທ່ານ
      </Typography>
    </div>
  );

  const compareWithCurrentTime = (KickoffTime) => {
    let timeFixed = parseInt(KickoffTime.slice(0, 2)) - 1;
    let realTime = `${timeFixed}:00:00`;
    let time3 = moment(Date.now()).format("YYYY-MM-DD");
    let time4 = new Date(`${time3} ${realTime}`);
    let time5 = new Date();
    let compareGG = time4 - time5;

    if (compareGG < 0) {
      return -1;
    }
    return 1;
  };

  const onConfirmBooking = (event) => {
    event.preventDefault();
    if (bookingDetailsData.length > 0) {
      let compareTime = [];
      let dateNow = moment(Date.now()).format("YYYY-MM-DD");
      compareTime = bookingDetailsData.filter(
        (items) =>
          compareWithCurrentTime(items.td_start) < 0 &&
          items.kickoff_date === dateNow
      );
      if (compareTime.length > 0) {
        dispatch(onShowAlertCompareTime(compareTime));
        dispatch(onNotiOpen("compareWithCurrentTime"));
        return;
      }
      dispatch(onPopupOpen("confirmBooking"));
    } else {
      dispatch(onNotiOpen("emptyBooking"));
    }
  };

  return (
    <div className={classes.root}>
      <form onSubmit={onConfirmBooking}>
        <Paper className={classes.paper}>
          <BookingToolbar
            numSelected={bookingDetailsSelected.length}
            dataForDelete={bookingDetailsSelected}
          />
          <Divider />
          {selectedState === true && (
            <BookingTable bookingDetails={bookingDetailsData} />
          )}
          {selectedState === false && <ShowEmptyBooking />}
        </Paper>
        <Paper className={classes.paper}>
          <TotalBookingPrice
            timeCancel={stateRef.current.time_cancelbooking}
            totalBookingPrice={totalPrice}
            ref={totalBookingPriceRef}
          />
        </Paper>
      </form>
    </div>
  );
});

export default PreBooking;
