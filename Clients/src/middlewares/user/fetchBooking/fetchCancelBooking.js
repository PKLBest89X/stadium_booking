import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchAvailableCancel = createAsyncThunk(
  "cancelBooking/getAvailableCancel",
  async (token, { rejectWithValue, getState, requestId }) => {
    try {
      const { cancelLoading, cancelRequestId } = getState().bookingHistory;
      if (cancelLoading !== true || requestId !== cancelRequestId) {
        return;
      }
      const getAvailableCancel = await Axios.get(
        `http://localhost:5050/cancel_res/reserve/cancelForUser`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return getAvailableCancel.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCancelBooking = createAsyncThunk(
  "cancelBookingNonaccount/cancelBookingNonAccount",
  async (params, { rejectWithValue }) => {
    try {
      const cancelBooking = await Axios.delete(
        `http://localhost:5050/cancel_res/field_forUser/${params}`
      );
      return cancelBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
