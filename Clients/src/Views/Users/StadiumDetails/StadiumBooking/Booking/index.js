import React, { createRef, useState, useEffect } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckBooking } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Box, Button } from "@material-ui/core";

import { fetchGetTimesToBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import { onClearStadiums } from "../../../../../Slices/Features/Users/Booking/getStadiumsSlice";
import { fetchGetStadiumsToBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import { onClearTimes } from "../../../../../Slices/Features/Users/Booking/getTimeSlice";

import { onSaveSelectedData } from "../../../../../Slices/Features/Users/Booking/bookingDetailsSlice";
import DatePickerBooking from "./DatePickerBooking";
import StadiumsToPick from "./StadiumsToPick";
import TimesAndPrice from "./TimesAndPrice";

const Booking = React.memo(() => {
  const { bookingId, stadiumId } = useParams();
  const history = useHistory();
  const [filterState, setFilterState] = useState({
    stadiums_id: '',
    dateData: new Date()
  })
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );

  //ຂໍ້ມູນສະໜາມຈາກການ request
  const { bookingStadiumsData, bookingStadiumsSuccess } =
    useShallowEqualSelector((state) => state.getStadiums);

  //ຂໍ້ມູນເວລາຈາກການ request
  const { bookingTimesData, bookingTimesSuccess } = useShallowEqualSelector(
    (state) => state.getTimes
  );

  //ຂໍ້ມູນລາຄາ, ເວລາເດີ່ນ, ເດີ່ນຫຼັງຈາກການເລືອກ
  const { timeAndPriceSelected } = useShallowEqualSelector((state) => state.bookingDetails);
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

  const handleStadiums = (payload) => {
    setFilterState((prev) => ({...prev, stadiums_id: payload}))
  }

  const handleDateChange = (date) => {
    setFilterState((prev) => ({...prev, dateData: date}))
  };

  const onAddBookingDetails = (event) => {
    event.preventDefault();
    dispatch(onSaveSelectedData(timeAndPriceSelected))
  };

  return (
    <ChildPageLayout title="Booking">
      <form onSubmit={onAddBookingDetails}>
        {bookingStadiumsSuccess === true && (
          <StadiumsToPick stadiums={bookingStadiumsData} selectedStadiums={handleStadiums} />
        )}

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePickerBooking
            dateData={filterState.dateData}
            onSelectedDate={handleDateChange}
            ref={datePickerRef}
          />
        </MuiPickersUtilsProvider>
        {bookingTimesSuccess === true && (
          <TimesAndPrice times={bookingTimesData} filterData={filterState} />
        )}

        <Box mt={3}>
          <Button type="submit" fullWidth color="primary" variant="contained">
            ເພີ່ມ
          </Button>
        </Box>
      </form>
    </ChildPageLayout>
  );
});

export default Booking;
