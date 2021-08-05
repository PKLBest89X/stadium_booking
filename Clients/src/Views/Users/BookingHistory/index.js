import React, { useEffect, useState } from "react";
import PageLayout from "../../../Components/PageLayout";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAuthUser } from "../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../Slices/Authentication/authSlice";
import { useShallowEqualSelector } from "../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { fetchGetHistoryDetailsByUser } from "../../../middlewares/user/fetchBookingHistory/fetchBookingHistory";
import NotificationAlert from "../../../Components/NotificationAlert";
import PopupLayout from "../../../Components/PopupLayout";

import BookingList from "./BookingList";
import BookingNavbarControl from "./BookingNavbarControl";
import ConfirmPayment from "./ConfirmPayment";

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
  const [testState, setTestState] = useState([]);
  const { bookingHistoryDetailsData } = useShallowEqualSelector(
    (state) => state.bookingHistory
  );
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);

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
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchGetHistoryDetailsByUser(userToken.token));
    }
  }, [dispatch]);

const testClick = (payload) => {
  setTestState((prev) => ([ ...prev, payload ]));
}

  let showBookingHistoryInfo = null;
  if (popupName === "showBookingHistoryInfo" && isOpen === true) {
    showBookingHistoryInfo = (
      <PopupLayout customWidth={true}>
        <ConfirmPayment data={testState}/>
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
        <Box padding="1rem">
          <Typography variant="h3" color="textSecondary">
            ການຈອງທີ່ຍົກເລີກໄດ້
          </Typography>
        </Box>
        <Divider />
        <Box padding="1rem">
          <BookingList bookingBillData={bookingHistoryDetailsData} clicked={testClick} />
        </Box>
      </PageLayout>
    </>
  );
});

export default BookingHistory;
