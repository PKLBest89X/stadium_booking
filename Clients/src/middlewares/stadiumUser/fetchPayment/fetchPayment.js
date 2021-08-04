import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetAllBooking = createAsyncThunk(
  "payment/getAllBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { getAllBookingLoading, getAllBookingRequestId } =
        getState().prePayment;
      if (
        getAllBookingLoading !== true ||
        requestId !== getAllBookingRequestId
      ) {
        return;
      }
      const getAllBooking = await Axios.get(
        `http://localhost:5050/reserve_paid/allBooking/${params}`
      );
      return getAllBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetAllBookingDetails = createAsyncThunk(
  "payment/getAllBookingDetails",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { getAllBookingDetailsLoading, getAllBookingDetailsRequestId } =
        getState().prePayment;
      if (
        getAllBookingDetailsLoading !== true ||
        requestId !== getAllBookingDetailsRequestId
      ) {
        return;
      }
      const getAllBookingDetails = await Axios.get(
        `http://localhost:5050/reserve_paid/allBookingDetails/${params}`
      );
      return getAllBookingDetails.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetWaterForPayment = createAsyncThunk(
  "payment/getWaterForPayment",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { waterLoading, waterRequestId } = getState().getDrinks;
      if (waterLoading !== true || requestId !== waterRequestId) {
        return;
      }
      const getWaterForPayment = await Axios.get(
        `http://localhost:5050/water_paid/getWaterForPayment/${params}`
      );
      return getWaterForPayment.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddPayment = createAsyncThunk(
  "payment/addNewPayment",
  async (data, { rejectWithValue }) => {
    try {
      const addPayment = await Axios.post(
        `http://localhost:5050/reserve_paid/openPayment/${data.stadiumId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return addPayment.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddPaymentFields = createAsyncThunk(
  "payment/addPaymentFields",
  async (details, { rejectWithValue }) => {
    try {
      const addPaymentFields = await Axios.post(
        `http://localhost:5050/reserve_paid/paymentfield`,
        {
          data: details,
        }
      );
      return addPaymentFields.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddPaymentWaters = createAsyncThunk(
  "payment/addPaymentWaters",
  async (details, { rejectWithValue }) => {
    try {
      const addPaymentWaters = await Axios.post(
        `http://localhost:5050/reserve_paid/paymentwater`,
        {
          data: details,
        }
      );
      return addPaymentWaters.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateBookingSubStatus = createAsyncThunk(
  "payment/updateBookingSubStatus",
  async (details, { rejectWithValue }) => {
    try {
      const updateBookingSubStatus = await Axios.put(
        `http://localhost:5050/reserve_paid/updateBookingSubStatus`,
        {
          data: details,
        }
      );
      return updateBookingSubStatus.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateBookingStatus = createAsyncThunk(
  "payment/updateBookingStatus",
  async (bookingId, { rejectWithValue }) => {
    try {
      const updateBookingStatus = await Axios.put(
        `http://localhost:5050/reserve_paid/updateBookingStatus`,
        {
          b_id: bookingId,
        }
      );
      return updateBookingStatus.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchConfirmPayment = createAsyncThunk(
  "payment/conformPayment",
  async (data, { rejectWithValue }) => {
    try {
      const conformPayment = await Axios.put(
        `http://localhost:5050/reserve_paid/closeBill/${data.bookingId}/${data.paymentId}`,
        {
          total_drinkingprice: data.total_waterPrice,
          total_stadiumprice: data.total_stadiumPrice,
        }
      );
      return conformPayment.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
