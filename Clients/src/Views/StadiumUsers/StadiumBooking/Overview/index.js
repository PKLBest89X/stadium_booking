import React, { useEffect, useMemo, useRef, useCallback } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NotificationAlert from "../../../../Components/NotificationAlert";
import BookingNavbarControl from "./BookingNavbarControl";
import RoutesBookingHistoryAdmin from "../../../../Routes/RoutesBookingHistoryAdmin";
import PopupDetails from "./PopupDetails";
import PopupLayout from "../../../../Components/PopupLayout";

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

const OverviewBooking = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { checkResult } = useShallowEqualSelector((state) => state.validData);

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

  let showBookingHistoryInfo = null;
  if (popupName === "showBookingHistoryInfoAdmin" && isOpen === true) {
    showBookingHistoryInfo = (
      <PopupLayout customWidth={true}>
        <PopupDetails />
      </PopupLayout>
    );
  }

  let alertSuccessCancelBookingNonAccount = null;
  if (notiName === "successCancelBookingNonAccount" && notiState === true) {
    alertSuccessCancelBookingNonAccount = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ທານໄດ້ຍົກເລີກການຈອງສຳເລັດ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {showBookingHistoryInfo}
      {alertSuccessCancelBookingNonAccount}
      <PageLayout title="Stadium Booking" {...rest}>
        <BookingNavbarControl />
        <RoutesBookingHistoryAdmin />
      </PageLayout>
    </>
  );
});

export default OverviewBooking;
