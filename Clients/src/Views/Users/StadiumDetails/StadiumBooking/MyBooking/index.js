import React, { useEffect, useMemo, useRef } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { fetchCheckBooking } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidBooking";
import { useHistory, useParams } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@material-ui/core";

import { fetchGetCurrentBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import PopupLayout from "../../../../../Components/PopupLayout";
import NotificationAlert from "../../../../../Components/NotificationAlert";
import { onPopupOpen, onTabOpen } from "../../../../../Slices/Features/Popup/popupSlice";

import AlreadyBooking from "./AlreadyBooking";
import PreBooking from "./PreBooking";
import ConfirmBooking from "./ConfirmBooking";

const MyBooking = React.memo(() => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { checkBookingResult } = useShallowEqualSelector(
    (state) => state.validBookingData
  );
  const { bookingData } = useShallowEqualSelector((state) => state.booking);
  const { alertCompareTime } = useShallowEqualSelector((state) => state.bookingDetails);
  const { popupName, isOpen } = useShallowEqualSelector((state) => state.popup);
  const { notiName, notiState } = useShallowEqualSelector(
    (state) => state.notification
  );
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

  useEffect(() => dispatch(onTabOpen("tabBackToOverviewBooking")))

  useMemo(
    () => bookingData.forEach((items) => (stateRef.current = items)),
    [bookingData]
  );

  let conformBookingForm = null;
  if (popupName === "confirmBooking" && isOpen === true) {
    conformBookingForm = (
      <PopupLayout customHeight={true}>
        <ConfirmBooking />
      </PopupLayout>
    );
  }

  let alertEmptyBookingList = null;
  if (notiName === "emptyBooking" && notiState === true) {
    alertEmptyBookingList = (
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
  if (notiName === "compareWithCurrentTime" && notiState === true) {
    compareBookingTime = (
      <NotificationAlert notiTitle="ຕ້ອງຈອງກ່ອນເຕະ 1 ຊົ່ວໂມງ, ເບິ່ງແດ່ເວລາຫັ້ນ!">
        {alertCompareTime.map((items, index) => {
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

  let alertSuccessBooking = null;
  if (notiName === "successBooking" && notiState === true) {
    alertSuccessBooking = (
      <NotificationAlert notiTitle="ສຳເລັດ" intervalTimeout={10000}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" color="textSecondary">
            ການຈອງຂອງທ່ານສຳເລັດແລ້ວ!
          </Typography>
        </Box>
      </NotificationAlert>
    );
  }

  return (
    <>
      {alertSuccessBooking}
      {alertEmptyBookingList}
      {compareBookingTime}
      {conformBookingForm}
      <ChildPageLayout title="Stadium Booking">
        {stateRef.current.booking_status === "ຍັງບໍ່ຈອງ" &&
          stateRef.current.paid_status === "ຍັງບໍ່ຈ່າຍ" && <PreBooking />}
        {stateRef.current.booking_status === "ຈອງແລ້ວ" &&
          stateRef.current.paid_status === "ຍັງບໍ່ຈ່າຍ" && <AlreadyBooking />}
      </ChildPageLayout>
    </>
  );
});
export default MyBooking;
