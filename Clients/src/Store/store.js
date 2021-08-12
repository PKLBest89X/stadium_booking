import { configureStore } from "@reduxjs/toolkit";
import registerUserSlice from "../Slices/Authentication/registerUserSlice";
import authSlice from "../Slices/Authentication/authSlice";
import toggleSlice from "../Slices/Features/ToggleDrawer/toggleSlice";
import popupSlice from "../Slices/Features/Popup/popupSlice";
import notificationSlice from "../Slices/Features/Notification/NotificationSlice";
import validDataSlice from "../Slices/Features/CheckValidData/checkValidDataSlice";
import validBookingDataSlice from "../Slices/Features/CheckValidData/checkValidBookingSlice";
import validPaymentDataSlice from "../Slices/Features/CheckValidData/checkValidPaymentSlice";
import validPostDataSlice from "../Slices/Features/CheckValidData/checkValidPostSlice";

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
import bookingHistorySlice from "../Slices/Features/Users/bookingHistory/bookingHistorySlice";

import preBookingSlice from "../Slices/Features/Users/Booking/preBookingSlice";
import bookingSlice from "../Slices/Features/Users/Booking/bookingSlice";
import bookingDetailsSlice from '../Slices/Features/Users/Booking/bookingDetailsSlice';
import getStadiumsSlice from '../Slices/Features/Users/Booking/getStadiumsSlice';
import getTimesSlice from '../Slices/Features/Users/Booking/getTimeSlice';

import preBookingNonAccountSlice from "../Slices/Features/StadiumUsers/BookingForNoAccount/preBookingNonAccountSlice";
import bookingNonAccountSlice from '../Slices/Features/StadiumUsers/BookingForNoAccount/bookingNonAccountSlice';
import bookingDetailsNonAccountSlice from '../Slices/Features/StadiumUsers/BookingForNoAccount/bookingDetailsNonAccountSlice';
import getStadiumsNonAccountSlice from '../Slices/Features/StadiumUsers/BookingForNoAccount/getStadiumsNonAccountSlice';
import getTimesNonAccountSlice from '../Slices/Features/StadiumUsers/BookingForNoAccount/getTimeNonAccountSlice';

import reportBookingSlice from '../Slices/Features/StadiumUsers/Reports/reportBookingSlice';
import reportPaymentSlice from '../Slices/Features/StadiumUsers/Reports/reportPaymentSlice';

import prePaymentSlice from '../Slices/Features/StadiumUsers/Payment/prePaymentSlice';
import paymentSlice from '../Slices/Features/StadiumUsers/Payment/paymentSlice';
import paymentDetailsSlice from '../Slices/Features/StadiumUsers/Payment/paymentDetailsSlice';
import getDrinksSlice from '../Slices/Features/StadiumUsers/Payment/getDrinksSlice';

const store = configureStore({
  reducer: {
    registerUser: registerUserSlice,
    auth: authSlice,
    toggle: toggleSlice,
    popup: popupSlice,
    notification: notificationSlice,
    stadium: crudStadiumSlice,
    stadiumDetails: stadiumDetailsSlice,
    validData: validDataSlice,
    validBookingData: validBookingDataSlice,
    validPaymentData: validPaymentDataSlice,
    validPostData: validPostDataSlice,
    employees: employeeSlice,
    posts: postSlice,
    reportReserve: reportReserveSlice,
    stadiumPrice: stadiumPriceSlice,
    stadiumDrink: stadiumDrinkSlice,
    feedPost: feedPostSlice,
    feedStadium: feedStadiumSlice,
    subscribe: subscribeSlice,
    bookingHistory: bookingHistorySlice,
    preBooking: preBookingSlice,
    preBookingNonAccount: preBookingNonAccountSlice,
    booking: bookingSlice,
    bookingNonAccount: bookingNonAccountSlice,
    bookingDetails: bookingDetailsSlice,
    bookingDetailsNonAccount: bookingDetailsNonAccountSlice,
    getStadiums: getStadiumsSlice,
    getStadiumsNonAccount: getStadiumsNonAccountSlice,
    getTimes: getTimesSlice,
    getTimesNonAccount: getTimesNonAccountSlice,
    prePayment: prePaymentSlice,
    payment: paymentSlice,
    paymentDetails: paymentDetailsSlice,
    getDrinks: getDrinksSlice,
    reportBooking: reportBookingSlice,
    reportPayment: reportPaymentSlice,
  }, 
});

export default store;
