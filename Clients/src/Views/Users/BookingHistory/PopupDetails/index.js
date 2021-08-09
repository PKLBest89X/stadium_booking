import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box, Button, Divider } from "@material-ui/core";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";

import { useDispatch } from "react-redux";
import {
  onMessageClose,
  onMessageOpen,
  onNotiOpen,
} from "../../../../Slices/Features/Notification/NotificationSlice";

import Header from "./Header";
import Information from "./Information";
import Details from "./Details";
import OtherDetails from "./OtherDetails";
import { onPopupClose } from "../../../../Slices/Features/Popup/popupSlice";
import { fetchCancelBookingNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchCancelBookingNonAccount";
import { onCancelBooking } from "../../../../Slices/Features/Users/bookingHistory/bookingHistorySlice";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
  text: {
    color: "red",
  },
}));

const PopupDetails = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { showBooking, showOtherBooking, otherBookingState, bookingInfo } =
    useShallowEqualSelector((state) => state.bookingHistory);

  const { messageAlert, messageState } = useShallowEqualSelector(
    (state) => state.notification
  );

  useEffect(() => {
    return () => dispatch(onMessageClose());
  }, [dispatch]);

  let alertCantCancel = null;
  if (messageAlert === "alertCantCancelBooking" && messageState === true) {
    alertCantCancel = (
      <Box display="flex" alignItems="center">
        <Typography className={classes.text} variant="h5" color="secondary">
          ກາຍເວລາຍົກເລີກແລ້ວ!!
        </Typography>
      </Box>
    );
  }

  const compareTime = (time) => {
    const newTime = new Date(time) - new Date();
    if (newTime < 0) {
      return -1;
    }
    return 1;
  };

  const cancel = async (payload) => {
    const getCompareResult = compareTime(payload.bookingCancel);
    if (getCompareResult === -1) {
      return dispatch(onMessageOpen("alertCantCancelBooking"));
    } else if (getCompareResult === 1) {
      try {
        await dispatch(fetchCancelBookingNonAccount(payload.bookingId));
        dispatch(onCancelBooking(payload.bookingId));
        dispatch(onPopupClose());
        dispatch(onNotiOpen("alertSuccessCancelBooking"));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div>
        <Box padding="1rem">
          <Box display="block" justifyContent="center" alignItems="center">
            <Box>
              <Header stadiumData={bookingInfo} />
            </Box>
            <Box mt={3} mb={3}>
              <Information />
            </Box>
            <Box>
              <Paper>
                <Box padding="1rem">
                  <Typography variant="h4">ລາຍການຈອງເດີ່ນ</Typography>
                </Box>
                <Divider />
                <Box>
                  <Details data={showBooking} />
                </Box>
              </Paper>
            </Box>
            {otherBookingState === true && (
              <Box mt={3}>
                <Paper>
                  <Box padding="1rem">
                    <Typography variant="h4">{`ອີກ ${showOtherBooking.length} ລາຍການທີ່ຈອງຮ່ວມກັນ`}</Typography>
                  </Box>
                  <Divider />
                  <Box>
                    <OtherDetails data={showOtherBooking} />
                  </Box>
                </Paper>
              </Box>
            )}
          </Box>
        </Box>
      </div>
      {alertCantCancel}
      <Box
        display="flex"
        width="100%"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box mt={3}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => cancel(bookingInfo)}
          >
            ຍົກເລີກການຈອງ
          </Button>
        </Box>
      </Box>
    </>
  );
});

export default PopupDetails;
