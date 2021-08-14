import React, { createRef, useCallback, useEffect } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckBooking } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useParams, useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Box, Button, Typography, Divider, Paper } from "@material-ui/core";

import { fetchGetTimesToBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import { onClearStadiums } from "../../../../../Slices/Features/Users/Booking/getStadiumsSlice";
import { fetchGetStadiumsToBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import { fetchGetBookingDetailsUnCheckout } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import {
  onClearTimes,
  onFilterAvailableTimes,
} from "../../../../../Slices/Features/Users/Booking/getTimeSlice";

import {
  onSaveSelectedData,
  onShowAlertSameData,
} from "../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";
import DatePickerBooking from "./DatePickerBooking";
import StadiumsToPick from "./StadiumsToPick";
import TimesAndPrice from "./TimesAndPrice";
import NotificationAlert from "../../../../../Components/NotificationAlert";
import { onNotiOpen } from "../../../../../Slices/Features/Notification/NotificationSlice";
import { onTabOpen } from "../../../../../Slices/Features/Popup/popupSlice";
import NonTimes from "./NonTimes";
import NonStadiums from "./NonStadiums";

const Booking = React.memo(() => {
  const { bookingId, stadiumId } = useParams();
  const history = useHistory();

  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );

  //ຂໍ້ມູນສະໜາມຈາກການ request
  const { bookingStadiumsData, bookingStadiumsSuccess } =
    useShallowEqualSelector((state) => state.getStadiums);

  //ຂໍ້ມູນເວລາຈາກການ request
  const {
    bookingTimesData,
    filterByDateData,
    filterResult,
    bookingTimesSuccess,
    foundUnCheckout,
    stadiumsSelected,
    filterResultByStadiums,
    allTimesByStadiums,
  } = useShallowEqualSelector((state) => state.getTimes);

  //ຂໍ້ມູນລາຄາ, ເວລາເດີ່ນ, ເດີ່ນຫຼັງຈາກການເລືອກ
  const {
    dateSelected,
    timeAndPriceSelected,
    alertSelected,
    bookingDetailsData,
  } = useShallowEqualSelector((state) => state.bookingDetails);

  //ຂໍ້ມູນສະຖານະຂອງ popup
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );

  const dispatch = useDispatch();
  const datePickerRef = createRef();

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
    dispatch(fetchCheckBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (checkBookingResult === 404) {
      history.replace("/404");
    }
  }, [history, checkBookingResult]);

  //ການ fetching ເອົາຂໍິມູນສະໜາມຂອງເດີ່ນ
  useEffect(() => {
    dispatch(fetchGetStadiumsToBooking(stadiumId));
    return () => dispatch(onClearStadiums());
  }, [dispatch, stadiumId]);

  //ການ fetching ເອົາຂໍ້ມູນລາຄາ ແລະ ເວລາຂອງເດີ່ນ
  useEffect(() => {
    dispatch(fetchGetTimesToBooking(stadiumId));
    return () => dispatch(onClearTimes());
  }, [dispatch, stadiumId]);

  useEffect(() => dispatch(onTabOpen("tabBackToOverviewBooking")));

  //ການ fetching ເອົາຂໍ້ມູນການຈອງທີ່ຈອງແລ້ວ ແຕ່ຍັງບໍ່ຈ່າຍ

  useEffect(() => {
    const filterByDate = async () => {
      try {
        const fetchUnBooking = await dispatch(
          fetchGetBookingDetailsUnCheckout(stadiumId)
        );
        const getData = unwrapResult(fetchUnBooking);
        const filterRequest = {
          dateData: filterByDateData,
          stadiumId: "",
          unBookingData: getData,
        };
        dispatch(onFilterAvailableTimes(filterRequest));
      } catch (err) {
        console.log(err);
      }
    };
    filterByDate();
  }, [dispatch, stadiumId, filterByDateData]);

  const onAddBookingDetails = useCallback(
    async (event) => {
      event.preventDefault();
      if (timeAndPriceSelected.length === 0) {
        dispatch(onNotiOpen("emptyBookingAddList"));
        return;
      }
      let foundPreviousData = [];
      foundPreviousData = bookingDetailsData.filter((items1) =>
        timeAndPriceSelected.some(
          (items2) =>
            items1.std_id === items2.std_id &&
            items1.td_id === items2.td_id &&
            items1.kickoff_date === items2.kickoff_date
        )
      );
      if (foundPreviousData.length > 0) {
        await dispatch(onShowAlertSameData(foundPreviousData));
        await dispatch(onNotiOpen("sameBookingAddList"));
      } else {
        await dispatch(onSaveSelectedData(timeAndPriceSelected));
        history.goBack();
      }
    },
    [dispatch, history, timeAndPriceSelected, bookingDetailsData]
  );

  let alert = null;
  let alertSameDataFromSelected = null;
  if (notiName === "emptyBookingAddList" && notiState === true) {
    alert = (
      <NotificationAlert notiTitle="ຄຳເຕືອນ">
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ກະລຸນາເລືອກສະໜາມກ່ອນການເພີ່ມ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  if (notiName === "sameBookingAddList" && notiState === true) {
    alertSameDataFromSelected = (
      <NotificationAlert notiTitle="ມີຂໍ້ມູນນີ້ໃນ list ແລ້ວ">
        {alertSelected.map((items, index) => {
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
      {alert}
      {alertSameDataFromSelected}
      <ChildPageLayout title="Booking">
        <form onSubmit={onAddBookingDetails}>
          <Paper>
            <Box padding="1rem">
              <Box mb={2}>
                <Typography variant="h4" color="textSecondary">
                  ເລືອກຕາມສະໜາມ
                </Typography>
              </Box>
              <Divider />
              <Box mt={3}>
                {bookingStadiumsSuccess === true && (
                  <StadiumsToPick stadiums={bookingStadiumsData} />
                )}
                {bookingStadiumsSuccess === false && <NonStadiums />}
              </Box>
            </Box>
          </Paper>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerBooking dateData={dateSelected} ref={datePickerRef} />
          </MuiPickersUtilsProvider>
          {bookingTimesSuccess === true && (
            <TimesAndPrice
              times={
                foundUnCheckout.length > 0
                  ? stadiumsSelected !== ""
                    ? filterResultByStadiums
                    : filterResult
                  : stadiumsSelected !== ""
                  ? allTimesByStadiums
                  : bookingTimesData
              }
            />
          )}

          {bookingTimesSuccess === false && <NonTimes />}

          <Box mt={3}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              ເພີ່ມ
            </Button>
          </Box>
        </form>
      </ChildPageLayout>
    </>
  );
});

export default Booking;
