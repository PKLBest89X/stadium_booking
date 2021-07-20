import React, { createRef, useEffect } from "react";
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
import { Box, Button } from "@material-ui/core";
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

import { onSaveSelectedDataNonAccount } from "../../../../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice";
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
  const { dateSelectedNonAccount, timeAndPriceSelectedNonAccount } =
    useShallowEqualSelector((state) => state.bookingDetailsNonAccount);
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

  const onAddBookingDetails = (event) => {
    event.preventDefault();
    dispatch(onSaveSelectedDataNonAccount(timeAndPriceSelectedNonAccount));
  };

  return (
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
            <Button type="submit" fullWidth color="primary" variant="contained">
              ເພີ່ມ
            </Button>
          </Box>
        </form>
      </div>
    </PageLayout>
  );
});

export default BookingDetailsData;
