import React, { useEffect, useRef, useMemo } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckStadium } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckBooking } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { fetchGetStadium } from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Divider, Box, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import {
  onLoadCurrentSaveSelectedDataNonAccount,
  onShowAlertCompareTimeNonAccount,
} from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
import PopupLayout from "../../../../Components/PopupLayout";
import NotificationAlert from "../../../../Components/NotificationAlert";
import { onPopupOpen } from "../../../../Slices/Features/Popup/popupSlice";
import { onNotiOpen } from "../../../../Slices/Features/Notification/NotificationSlice";

import BookingTable from "./BookingTable";
import BookingToolbar from "./BookingToolbar";
import UserNonAccount from "./UserNonAccount";
import TotalBookingPrice from "./TotalBookingPrice";
import ConfirmBooking from "./ConfirmBooking";
import moment from "moment";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
  emptyView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10rem",
    paddingBottom: "10rem",
  },
}));

const BookingView = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { stadiumData } = useShallowEqualSelector((state) => state.stadium);
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );
  const { stadiumId_Admin, bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const stateRef = useRef(stadiumData);
  const userNonAccountRef = useRef();
  const totalBookingPriceRef = useRef();

  const {
    selectedStateNonAccount,
    bookingDetailsNonAccountData,
    bookingDetailsSelectedNonAccount,
    totalPriceNonAccount,
    alertCompareTimeNonAccount,
    userNonAccount,
  } = useShallowEqualSelector((state) => state.bookingDetailsNonAccount);

  useEffect(
    () => dispatch(onLoadCurrentSaveSelectedDataNonAccount()),
    [dispatch]
  );

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  //ການເອົາຂໍ້ມູນເດີ່ນ
  useEffect(() => {
    dispatch(fetchGetStadium(stadiumId_Admin));
  }, [dispatch, stadiumId_Admin]);

  useMemo(
    () => stadiumData.forEach((items) => (stateRef.current = items)),
    [stadiumData]
  );

  //ການຍິງ request ໃນການກວດສອບວ່າມີເລກບິນການຈອງເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (checkBookingResult === 404) {
      history.replace("/404");
    }
  }, [history, checkBookingResult]);

  const ShowEmptyBooking = () => (
    <div className={classes.emptyView}>
      <Typography variant="h4" color="textSecondary">
        ບໍ່ມີຂໍ້ມູນລການຈອງເດີ່ນຂອງທ່ານ
      </Typography>
    </div>
  );

  let conformBookingForm = null;
  if (popupName === "confirmBookingNonAccount" && isOpen === true) {
    conformBookingForm = (
      <PopupLayout customHeight={true}>
        <ConfirmBooking userNonAccount={userNonAccount} />
      </PopupLayout>
    );
  }

  let alertNonAccount = null;
  if (notiName === "emptyBookingNonAccount" && notiState === true) {
    alertNonAccount = (
      <NotificationAlert notiTitle="ຄຳເຕືອນ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ກະລຸນາເລືອກສະໜາມກ່ອນການຈອງ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  let compareBookingTime = null;
  if (notiName === "compareWithCurrentTimeNonAccount" && notiState === true) {
    compareBookingTime = (
      <NotificationAlert
        notiTitle={`ຕ້ອງຈອງກ່ອນເຕະ ${stateRef.current.time_cancelbooking} ຊົ່ວໂມງ!`}
      >
        {alertCompareTimeNonAccount.map((items, index) => {
          return (
            <Box key={index} display="flex" alignItems="center">
              <ul>
                <li>
                  <Typography variant="h5" color="textSecondary">
                    {`${items.std_name}, ເວລາ: ${items.td_start} ໂມງ - ${items.td_end} ໂມງ`}
                  </Typography>
                </li>
              </ul>
            </Box>
          );
        })}
      </NotificationAlert>
    );
  }

  const compareWithCurrentTime = (KickoffTime, beforeBooking) => {
    let timeFixed = parseInt(KickoffTime.slice(0, 2)) - parseInt(beforeBooking);
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
    if (bookingDetailsNonAccountData.length > 0) {
      let compareTime = [];
      let dateNow = moment(Date.now()).format("YYYY-MM-DD");
      compareTime = bookingDetailsNonAccountData.filter(
        (items) =>
          compareWithCurrentTime(
            items.td_start,
            stateRef.current.time_cancelbooking
          ) < 0 && items.kickoff_date === dateNow
      );
      if (compareTime.length > 0) {
        dispatch(onShowAlertCompareTimeNonAccount(compareTime));
        dispatch(onNotiOpen("compareWithCurrentTimeNonAccount"));
        return;
      }
      dispatch(onPopupOpen("confirmBookingNonAccount"));
    } else {
      dispatch(onNotiOpen("emptyBookingNonAccount"));
    }
  };
  return (
    <>
      {alertNonAccount}
      {conformBookingForm}
      {compareBookingTime}
      <PageLayout title="Booking Form" {...rest}>
        <div className={classes.pageContainer}>
          <div className={classes.root}>
            <form onSubmit={onConfirmBooking}>
              <Box
                mb={3}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography color="textPrimary" variant="h2">
                  ຈອງເດີ່ນເຕະບານ
                </Typography>
                <IconButton color="primary" onClick={() => history.goBack()}>
                  <ArrowBackIcon />
                </IconButton>
              </Box>
              <Divider />
              <Box mt={3}>
                <Paper className={classes.paper}>
                  <UserNonAccount
                    bookingId={bookingId}
                    ref={userNonAccountRef}
                  />
                </Paper>
                <Paper className={classes.paper}>
                  <BookingToolbar
                    numSelected={bookingDetailsSelectedNonAccount.length}
                    dataForDelete={bookingDetailsSelectedNonAccount}
                  />
                  <Divider />
                  {selectedStateNonAccount === true && (
                    <BookingTable
                      bookingDetails={bookingDetailsNonAccountData}
                    />
                  )}
                  {selectedStateNonAccount === false && <ShowEmptyBooking />}
                </Paper>
                <Paper className={classes.paper}>
                  <TotalBookingPrice
                    timeCancel={stateRef.current.time_cancelbooking}
                    totalBookingPrice={totalPriceNonAccount}
                    ref={totalBookingPriceRef}
                  />
                </Paper>
              </Box>
            </form>
          </div>
        </div>
      </PageLayout>
    </>
  );
});
export default BookingView;
