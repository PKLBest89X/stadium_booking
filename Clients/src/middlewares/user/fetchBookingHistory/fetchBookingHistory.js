import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetHistoryByUser = createAsyncThunk(
    "bookingHistory/getBookingHistory",
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
          `http://localhost:5050/customer//user/bookingHistory`,         {
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