import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetStadiumDetailsBeforeBooking = createAsyncThunk(
  "preBooking/getStadiumsBeforeBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { preStadiumsLoading, preStadiumsRequestId } = getState().preBooking;
      if (preStadiumsLoading !== true || requestId !== preStadiumsRequestId) {
        return;
      }
      const getStadiumsBeforeBooking = await Axios.get(
        `http://localhost:5050/reserve_cus/getAllStadiumsDetails/${params}`
      );
      return getStadiumsBeforeBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const fetchBookingList = createAsyncThunk(
  "preBooking/getBookingList",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { preBookingLoading, preBookingRequestId } =
        getState().preBooking;
      if (
        preBookingLoading !== true ||
        requestId !== preBookingRequestId
      ) {
        return;
      }
      const getBookingList = await Axios.get(
        `http://localhost:5050/reserve_cus/getBookingList/${params}`
      );
      return getBookingList.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchBookingListDetails = createAsyncThunk(
  "preBooking/getBookingDetailsList",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { preBookingDetailsLoading, preBookingDetailsRequestId } =
        getState().preBooking;
      if (
        preBookingDetailsLoading !== true ||
        requestId !== preBookingDetailsRequestId
      ) {
        return;
      }
      const getBookingDetailsList = await Axios.get(
        `http://localhost:5050/reserve_cus/getBookingDetailsList/${params}`
      );
      return getBookingDetailsList.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      if (
        bookingUnCheckoutLoading !== true ||
        requestId !== bookingUnCheckoutRequestId
      ) {
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

export const fetchGetCurrentBooking = createAsyncThunk(
  "booking/getCurrentBooking",
  async (data, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingLoading, bookingRequestId } = getState().booking;
      if (bookingLoading !== true || requestId !== bookingRequestId) {
        return;
      }
      const getCurrentBooking = await Axios.get(
        `http://localhost:5050/reserve_cus/getCurrentBooking/${data.bookingId}`,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return getCurrentBooking.data;
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
