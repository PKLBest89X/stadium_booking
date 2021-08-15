import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCountBooking = createAsyncThunk(
  "dashboard/countBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { countBookingLoading, countBookingRequestId } = getState().posts;
      if (countBookingLoading !== true || requestId !== countBookingRequestId) {
        return;
      }
      const countBooking = await Axios.get(
        `http://localhost:5050/report/getPostByStadiumId/${params}`
      );
      return countBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCountEmployee = createAsyncThunk(
    "dashboard/countFollower",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { countEmployeeLoading, countEmployeeRequestId } = getState().posts;
        if (countEmployeeLoading !== true || requestId !== countEmployeeRequestId) {
          return;
        }
        const countFollower = await Axios.get(
          `http://localhost:5050/report/getPostByStadiumId/${params}`
        );
        return countFollower.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const fetchCountFollower = createAsyncThunk(
    "dashboard/countFollower",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { countFollowerLoading, countFollowerRequestId } = getState().posts;
        if (countFollowerLoading !== true || requestId !== countFollowerRequestId) {
          return;
        }
        const countFollower = await Axios.get(
          `http://localhost:5050/report/getPostByStadiumId/${params}`
        );
        return countFollower.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const fetchCountIncome = createAsyncThunk(
    "dashboard/countIncome",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { countIncomeLoading, countIncomeRequestId } = getState().posts;
        if (countIncomeLoading !== true || requestId !== countIncomeRequestId) {
          return;
        }
        const countIncome = await Axios.get(
          `http://localhost:5050/report/getPostByStadiumId/${params}`
        );
        return countIncome.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  