import React, { useEffect, useMemo, useRef } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckBooking } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";

import { fetchGetCurrentBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";

import AlreadyBooking from "./AlreadyBooking";
import PreBooking from "./PreBooking";

const MyBooking = React.memo(() => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );
  const { bookingData } = useShallowEqualSelector((state) => state.booking);
  const stateRef = useRef(bookingData);
  const { stadiumId, bookingId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  

  useEffect(() => {
    let userToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (userToken && userToken.token) {
      dispatch(fetchAuthUser(userToken.token));
      dispatch(userNow("userLoggedIn"));
    } else {
      dispatch(userNow("quest"));
    }
  }, [dispatch]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckStadium(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  //ການຍິງ request ໃນການກວດສອບວ່າມີເລກບິນການຈອງເດີ່ນນີ້ແທ້ ຫຼື ບໍ?
  useEffect(() => {
    dispatch(fetchCheckBooking(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (checkBookingResult === 404) {
      history.replace("/404");
    }
  }, [history, checkBookingResult]);

  useEffect(() => {
    const customerToken = JSON.parse(localStorage.getItem("accessUserToken"));
    if (customerToken && customerToken.token) {
      const requestCurrentBooking = {
        bookingId,
        token: customerToken.token,
      };
      dispatch(fetchGetCurrentBooking(requestCurrentBooking));
    }
  }, [dispatch, bookingId]);

  useMemo(
    () => bookingData.forEach((items) => (stateRef.current = items)),
    [bookingData]
  );

  return (
    <ChildPageLayout title="Stadium Booking">
      {stateRef.current.booking_status === "ຍັງບໍ່ຈອງ" &&
        stateRef.current.paid_status === "ຍັງບໍ່ຈ່າຍ" && <PreBooking />}
      {stateRef.current.booking_status === "ຈອງແລ້ວ" &&
        stateRef.current.paid_status === "ຍັງບໍ່ຈ່າຍ" && <AlreadyBooking />}
    </ChildPageLayout>
  );
});
export default MyBooking;
