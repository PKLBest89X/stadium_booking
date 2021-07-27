import React, { createRef, useEffect, useCallback } from "react";
import PageLayout from "../../../../Components/PageLayout";
import { fetchCheckBooking } from "../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { fetchAuthAdmin } from "../../../../middlewares/fetchAuth/fetchStadiumUsers";
import { userNow } from "../../../../Slices/Authentication/authSlice";
import { useShallowEqualSelector } from "../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams, useHistory } from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchGetStadiumsToBookingNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import { onClearStadiumsNonAccount } from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/getStadiumsNonAccountSlice";
import { fetchGetTimesToBookingNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import { fetchGetBookingDetailsUnCheckoutNonAccount } from "../../../../middlewares/stadiumUser/fetchBookingForNonAccount/fetchBookingNonAccount";
import {
  onClearTimesNonAccount,
  onFilterAvailableTimesNonAccount,
} from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/getTimeNonAccountSlice";
import moment from "moment";

import {
  onSaveSelectedDataNonAccount,
  onShowAlertSameDataNonAccount,
} from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
import { onNotiOpen } from "../../../../Slices/Features/Notification/NotificationSlice";
import NotificationAlert from "../../../../Components/NotificationAlert";

import DatePickerBooking from "./DatePickerBooking";
import StadiumsToPick from "./StadiumsToPick";
import TimesAndPrice from "./TimesAndPrice";

const useStyles = makeStyles(() => ({
  pageContainer: {
    padding: "2rem",
  },
}));

const BookingDetailsData = React.memo(({ ...rest }) => {
  const classes = useStyles();
  const { bookingId, stadiumId_Admin } = useParams();
  const history = useHistory();
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );

  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  //ຂໍ້ມູນສະໜາມຈາກການ request
  const { bookingStadiumsNonAccountData, bookingStadiumsNonAccountSuccess } =
    useShallowEqualSelector((state) => state.getStadiumsNonAccount);

  //ຂໍ້ມູນເວລາຈາກການ request
  const {
    bookingTimesNonAccountData,
    bookingTimesNonAccountSuccess,
    filterResultNonAccount,
    foundUnCheckoutNonAccount,
    stadiumsSelectedNonAccount,
    filterResultByStadiumsNonAccount,
    allTimesByStadiumsNonAccount,
  } = useShallowEqualSelector((state) => state.getTimesNonAccount);

  //ຂໍ້ມູນລາຄາ, ເວລາເດີ່ນ, ເດີ່ນຫຼັງຈາກການເລືອກ
  const {
    dateSelectedNonAccount,
    timeAndPriceSelectedNonAccount,
    bookingDetailsNonAccountData,
    alertSelectedNonAccount,
  } = useShallowEqualSelector((state) => state.bookingDetailsNonAccount);
  const dispatch = useDispatch();
  const datePickerRef = createRef();

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    if (adminToken && adminToken.token) {
      dispatch(fetchAuthAdmin(adminToken.token));
      dispatch(userNow("admin"));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCheckBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (checkBookingResult === 404) {
      history.replace("/404");
    }
  }, [history, checkBookingResult]);

  //ການ fetching ເອົາຂໍິມູນສະໜາມຂອງເດີ່ນ
  useEffect(() => {
    dispatch(fetchGetStadiumsToBookingNonAccount(stadiumId_Admin));
    return () => dispatch(onClearStadiumsNonAccount());
  }, [dispatch, stadiumId_Admin]);

  //ການ fetching ເອົາຂໍ້ມູນລາຄາ ແລະ ເວລາຂອງເດີ່ນ
  useEffect(() => {
    dispatch(fetchGetTimesToBookingNonAccount(stadiumId_Admin));
    return () => dispatch(onClearTimesNonAccount());
  }, [dispatch, stadiumId_Admin]);

  //ການ fetching ເອົາຂໍ້ມູນການຈອງທີ່ຈອງແລ້ວ ແຕ່ຍັງບໍ່ຈ່າຍ

  useEffect(() => {
    const filterByDate = async () => {
      try {
        const fetchUnBooking = await dispatch(
          fetchGetBookingDetailsUnCheckoutNonAccount(stadiumId_Admin)
        );
        const getData = unwrapResult(fetchUnBooking);
        const filterRequest = {
          dateData: moment(Date.now()).format("YYYY-MM-DD"),
          stadiumId: "",
          unBookingData: getData,
        };
        dispatch(onFilterAvailableTimesNonAccount(filterRequest));
      } catch (err) {
        console.log(err);
      }
    };
    filterByDate();
  }, [dispatch, stadiumId_Admin]);

  const onAddBookingDetails = useCallback(
    async (event) => {
      event.preventDefault();
      if (timeAndPriceSelectedNonAccount.length === 0) {
        dispatch(onNotiOpen("emptyBookingAddListNonAccount"));
        return;
      }
      let foundPreviousData = [];
      foundPreviousData = bookingDetailsNonAccountData.filter((items1) =>
        timeAndPriceSelectedNonAccount.some(
          (items2) =>
            items1.std_id === items2.std_id &&
            items1.td_id === items2.td_id &&
            items1.kickoff_date === items2.kickoff_date
        )
      );
      if (foundPreviousData.length > 0) {
        await dispatch(onShowAlertSameDataNonAccount(foundPreviousData));
        await dispatch(onNotiOpen("sameBookingAddListNonAccount"));
      } else {
        await dispatch(
          onSaveSelectedDataNonAccount(timeAndPriceSelectedNonAccount)
        );
        history.goBack();
      }
    },
    [
      dispatch,
      history,
      timeAndPriceSelectedNonAccount,
      bookingDetailsNonAccountData,
    ]
  );

  let alertNonAccount = null;
  let alertSameDataFromSelectedNonAccount = null;
  if (notiName === "emptyBookingAddListNonAccount" && notiState === true) {
    alertNonAccount = (
      <NotificationAlert notiTitle="ຄຳເຕືອນ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ກະລຸນາເລືອກສະໜາມກ່ອນການເພີ່ມ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  if (notiName === "sameBookingAddListNonAccount" && notiState === true) {
    alertSameDataFromSelectedNonAccount = (
      <NotificationAlert notiTitle="ມີຂໍ້ມູນນີ້ໃນ list ແລ້ວ">
        {alertSelectedNonAccount.map((items, index) => {
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

  return (
    <>
      {alertNonAccount}
      {alertSameDataFromSelectedNonAccount}
      <PageLayout title="Information" {...rest}>
        <div className={classes.pageContainer}>
          <form onSubmit={onAddBookingDetails}>
            {bookingStadiumsNonAccountSuccess === true && (
              <StadiumsToPick stadiums={bookingStadiumsNonAccountData} />
            )}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePickerBooking
                dateData={dateSelectedNonAccount}
                ref={datePickerRef}
              />
            </MuiPickersUtilsProvider>
            {bookingTimesNonAccountSuccess === true && (
              <TimesAndPrice
                times={
                  foundUnCheckoutNonAccount.length > 0
                    ? stadiumsSelectedNonAccount !== ""
                      ? filterResultByStadiumsNonAccount
                      : filterResultNonAccount
                    : stadiumsSelectedNonAccount !== ""
                    ? allTimesByStadiumsNonAccount
                    : bookingTimesNonAccountData
                }
              />
            )}

            <Box mt={3}>
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
              >
                ເພີ່ມ
              </Button>
            </Box>
          </form>
        </div>
      </PageLayout>
    </>
  );
});

export default BookingDetailsData;
