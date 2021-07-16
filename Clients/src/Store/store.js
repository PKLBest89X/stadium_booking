import { configureStore } from "@reduxjs/toolkit";
import registerUserSlice from "../Slices/Authentication/registerUserSlice";
import authSlice from "../Slices/Authentication/authSlice";
import toggleSlice from "../Slices/Features/ToggleDrawer/toggleSlice";
import popupSlice from "../Slices/Features/Popup/popupSlice";
import validDataSlice from "../Slices/Features/CheckValidData/checkValidDataSlice";
import validBookingDataSlice from "../Slices/Features/CheckValidData/checkValidBookingSlice";
import validPaymentDataSlice from "../Slices/Features/CheckValidData/checkValidPaymentSlice";

import crudStadiumSlice from "../Slices/Features/StadiumUsers/crudStadium/crudStadiumSlice";
import stadiumDetailsSlice from "../Slices/Features/StadiumUsers/crudStadium/stadiumDetailsSlice";

import postSlice from "../Slices/Features/StadiumUsers/post/postSlice";
import reportReserveSlice from "../Slices/Features/StadiumUsers/Reports/reportReserveSlice";
import employeeSlice from "../Slices/Features/StadiumUsers/crudEmployee/employeeSlice";
import stadiumDrinkSlice from "../Slices/Features/StadiumUsers/crudStadiumDrink/stadiumDrinkSlice";
import stadiumPriceSlice from "../Slices/Features/StadiumUsers/crudStadiumPrice/stadiumPriceSlice";

import feedPostSlice from "../Slices/Features/Users/feedPost/feedPostSlice";
import feedStadiumSlice from "../Slices/Features/Users/feedStadium/feedStadiumSlice";
import subscribeSlice from "../Slices/Features/Users/Subscribe/subscribeSlice";
import bookingSlice from "../Slices/Features/Users/Booking/bookingSlice";
import bookingDetailsSlice from '../Slices/Features/Users/Booking/bookingDetailsSlice';
import getStadiumsSlice from '../Slices/Features/Users/Booking/getStadiumsSlice';
import getTimesSlice from '../Slices/Features/Users/Booking/getTimeSlice';

const store = configureStore({
  reducer: {
    registerUser: registerUserSlice,
    auth: authSlice,
    toggle: toggleSlice,
    popup: popupSlice,
    stadium: crudStadiumSlice,
    stadiumDetails: stadiumDetailsSlice,
    validData: validDataSlice,
    validBookingData: validBookingDataSlice,
    validPaymentData: validPaymentDataSlice,
    employees: employeeSlice,
    posts: postSlice,
    reportReserve: reportReserveSlice,
    stadiumPrice: stadiumPriceSlice,
    stadiumDrink: stadiumDrinkSlice,
    feedPost: feedPostSlice,
    feedStadium: feedStadiumSlice,
    subscribe: subscribeSlice,
    booking: bookingSlice,
    bookingDetails: bookingDetailsSlice,
    getStadiums: getStadiumsSlice,
    getTimes: getTimesSlice
  },
});

export default store;
