import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchAvailableCancelBookingNonAccount = createAsyncThunk(
    "cancelBookingNonaccount/getAvailableCancelNonAccount",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { cancelNonAccountLoading, cancelNonAccountRequestId } =
          getState().preBookingNonAccount;
        if (
          cancelNonAccountLoading !== true ||
          requestId !== cancelNonAccountRequestId
        ) {
          return;
        }
        const getAvailableCancelNonAccount = await Axios.get(
          `http://localhost:5050/cancel_res/reserve/cancel/${params}`
        );
        return getAvailableCancelNonAccount.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const fetchCancelBookingNonAccount = createAsyncThunk(
    "cancelBookingNonaccount/cancelBookingNonAccount",
    async (params, { rejectWithValue }) => {
      try {
        const cancelBookingNonAccount = await Axios.delete(
          `http://localhost:5050/cancel_res/field/${params}`
        );
        return cancelBookingNonAccount.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );