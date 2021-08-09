import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetHistoryByUser = createAsyncThunk(
    "bookingHistory/getBookingHistory",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { bookingHistoryDetailsLoading, bookingHistoryDetailsRequestId } =
          getState().bookingHistory;
        if (
          bookingHistoryDetailsLoading !== true ||
          requestId !== bookingHistoryDetailsRequestId
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
  
  export const fetchGetHistoryDetailsByUser = createAsyncThunk(
    "bookingHistory/getBookingHistoryDetails",
    async (token, { rejectWithValue, getState, requestId }) => {
      try {
        const { bookingHistoryDetailsLoading, bookingHistoryDetailsRequestId } =
          getState().bookingHistory;
        if (
            bookingHistoryDetailsLoading !== true ||
          requestId !== bookingHistoryDetailsRequestId
        ) {
          return;
        }
        const getAllBookingDetails = await Axios.get(
          `http://localhost:5050/customer/user/bookingHistory`,         {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        return getAllBookingDetails.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const fetchGetPaidHistoryByUser = createAsyncThunk(
    "bookingHistory/getBookingPaidHistory",
    async (token, { rejectWithValue, getState, requestId }) => {
      try {
        const { userPaidLoading, userPaidRequestId } =
          getState().bookingHistory;
        if (
          userPaidLoading !== true ||
          requestId !== userPaidRequestId
        ) {
          return;
        }
        const getBookingPaidHistory = await Axios.get(
          `http://localhost:5050/customer/user/bookingHistory_paid`,         {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        return getBookingPaidHistory.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const fetchGetUnPaidHistoryByUser = createAsyncThunk(
    "bookingHistory/getBookingUnPaidHistory",
    async (token, { rejectWithValue, getState, requestId }) => {
      try {
        const { userUnPaidLoading, userUnPaidRequestId } =
          getState().bookingHistory;
        if (
          userUnPaidLoading !== true ||
          requestId !== userUnPaidRequestId
        ) {
          return;
        }
        const getBookingUnPaidHistory = await Axios.get(
          `http://localhost:5050/customer/user/bookingHistory_unPaid`,         {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        return getBookingUnPaidHistory.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );