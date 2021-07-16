import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ChildPageLayout from "../../../../../Components/ChildPageLayout";
import { fetchCheckStadium } from "../../../../../middlewares/fetchCheckValidData/fetchCheckValidData";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../../Components/useShallowEqualSelector";
import { fetchAuthUser } from "../../../../../middlewares/fetchAuth/fetchUser";
import { fetchAddBooking } from "../../../../../middlewares/user/fetchBooking/fetchBooking";
import { userNow } from "../../../../../Slices/Authentication/authSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button } from "@material-ui/core";

const StadiumBooking = ({ getTabChange, ...rest }) => {
  const { checkResult } = useShallowEqualSelector((state) => state.validData);
  const { bookingData } = useShallowEqualSelector((state) => state.booking);
  const stateRef = useRef(bookingData);
  const { stadiumId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => getTabChange(3), [getTabChange]);

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
    dispatch(fetchCheckStadium(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (checkResult === 404) {
      history.replace("/404");
    }
  }, [history, checkResult]);

  useMemo(
    () => bookingData.forEach((items) => (stateRef.current = items)),
    [bookingData]
  );

  const onGetCurrentBooking = useCallback(async () => {
    try {
      const customerToken = JSON.parse(localStorage.getItem("accessUserToken"));
      if (customerToken && customerToken.token) {
        const addBookingRequest = await dispatch(
          fetchAddBooking(customerToken.token)
        );
        const getResult = unwrapResult(addBookingRequest);
        if (getResult.status !== 400) {
          history.push(`${url}/${stateRef.current.b_id}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, history, url]);

  return (
    <ChildPageLayout title="Stadium Booking">
      <Button onClick={onGetCurrentBooking} color="primary" variant="contained">ການຈອງຂອງຂ້ອຍ</Button>
    </ChildPageLayout>
  );
};
export default StadiumBooking;
