import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetStadiumsToBooking = createAsyncThunk(
  "booking/getStadiumsToBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingStadiumsLoading, bookingStadiumsRequestId } =
        getState().getStadiums;
      if (
        bookingStadiumsLoading !== true ||
        requestId !== bookingStadiumsRequestId
      ) {
        return;
      }
      const getStadiumsToBooking = await Axios.get(
        `http://localhost:5050/reserve_cus/getStadiumDetailsToBooking/${params}`
      );
      return getStadiumsToBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetTimesToBooking = createAsyncThunk(
  "booking/getTimesToBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingTimesLoading, bookingTimesRequestId } =
        getState().getTimes;
      if (bookingTimesLoading !== true || requestId !== bookingTimesRequestId) {
        return;
      }
      const getTimesToBooking = await Axios.get(
        `http://localhost:5050/reserve_cus/getPriceToBooking/${params}`
      );
      return getTimesToBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetBookingDetailsUnCheckout = createAsyncThunk(
  "booking/getBookingDetailsUnCheckout",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingUnCheckoutLoading, bookingUnCheckoutRequestId } =
        getState().getTimes;
      if (bookingUnCheckoutLoading !== true || requestId !== bookingUnCheckoutRequestId) {
        return;
      }
      const getBookingDetailsUnCheckout = await Axios.get(
        `http://localhost:5050/reserve_cus/getBookingDetailsUnCheckout/${params}`
      );
      return getBookingDetailsUnCheckout.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddBooking = createAsyncThunk(
  "booking/addNewBooking",
  async (token, { rejectWithValue }) => {
    try {
      const addBooking = await Axios.post(
        `http://localhost:5050/reserve_cus/booking/`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return addBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddBookingFields = createAsyncThunk(
  "booking/addBookingFields",
  async (details, { rejectWithValue }) => {
    try {
      const addBookingFields = await Axios.post(
        `http://localhost:5050/reserve_cus/booking/bookingfields`,
        {
          data: details,
        }
      );
      return addBookingFields.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchConfirmBooking = createAsyncThunk(
  "booking/conformBooking",
  async (params, { rejectWithValue }) => {
    try {
      const conformBooking = await Axios.put(
        `http://localhost:5050/reserve_cus/booking/acceptBooking/${params.stadiumId}/${params.bookingId}`
      );
      return conformBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
