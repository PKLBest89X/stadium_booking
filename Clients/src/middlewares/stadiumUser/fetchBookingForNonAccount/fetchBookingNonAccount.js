import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetStadiumsToBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/getStadiumsToBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingStadiumsNonAccountLoading, bookingStadiumsNonAccountRequestId } =
        getState().getStadiumsNonAccount;
      if (
        bookingStadiumsNonAccountLoading !== true ||
        requestId !== bookingStadiumsNonAccountRequestId
      ) {
        return;
      }
      const getStadiumsToBookingNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getStadiumDetailsToBookingForNonAccount/${params}`
      );
      return getStadiumsToBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetTimesToBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/getTimesToBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingTimesNonAccountLoading, bookingTimesNonAccountRequestId } =
        getState().getTimesNonAccount;
      if (bookingTimesNonAccountLoading !== true || requestId !== bookingTimesNonAccountRequestId) {
        return;
      }
      const getTimesToBookingNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getPriceToBookingForNonAccount/${params}`
      );
      return getTimesToBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetBookingDetailsUnCheckoutNonAccount = createAsyncThunk(
  "bookingNonAccount/getBookingDetailsUnCheckoutNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingUnCheckoutNonAccountLoading, bookingUnCheckoutNonAccountRequestId } =
        getState().getTimesNonAccount;
      if (bookingUnCheckoutNonAccountLoading !== true || requestId !== bookingUnCheckoutNonAccountRequestId) {
        return;
      }
      const getBookingDetailsUnCheckoutNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getBookingDetailsUnCheckoutForNonAccount/${params}`
      );
      return getBookingDetailsUnCheckoutNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/addNewBookingNonAccount",
  async (token, { rejectWithValue }) => {
    try {
      const addBookingNonAccount = await Axios.post(
        `http://localhost:5050/reserve/bookingForNonAccount/`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return addBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddBookingFieldsNonAccount = createAsyncThunk(
  "bookingNonAccount/addBookingFieldsNonAccount",
  async (details, { rejectWithValue }) => {
    try {
      const addBookingFieldsNonAccount = await Axios.post(
        `http://localhost:5050/reserve/bookingfield`,
        {
          data: details,
        }
      );
      return addBookingFieldsNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchConfirmBooking = createAsyncThunk(
  "bookingNonAccount/conformBookingNonAccount",
  async (params, { rejectWithValue }) => {
    try {
      const conformBookingNonAccount = await Axios.put(
        `http://localhost:5050/reserve/acceptForNonAccount/${params.stadiumId}/${params.bookingId}`
      );
      return conformBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
