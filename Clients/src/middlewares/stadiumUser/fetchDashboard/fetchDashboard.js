import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCountBooking = createAsyncThunk(
  "dashboard/countBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { countBookingLoading, countBookingRequestId } = getState().countBooking;
      if (countBookingLoading !== true || requestId !== countBookingRequestId) {
        return;
      }
      const countBooking = await Axios.get(
        `http://localhost:5050/report/reserve_number/${params}`
      );
      return countBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCountEmployee = createAsyncThunk(
    "dashboard/countEmployee",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { countEmployeeLoading, countEmployeeRequestId } = getState().countEmployee;
        if (countEmployeeLoading !== true || requestId !== countEmployeeRequestId) {
          return;
        }
        const countEmployee = await Axios.get(
          `http://localhost:5050/report/employee_number/${params}`
        );
        return countEmployee.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );


  export const fetchCountFollower = createAsyncThunk(
    "dashboard/countFollower",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { countFollowerLoading, countFollowerRequestId } = getState().countFollower;
        if (countFollowerLoading !== true || requestId !== countFollowerRequestId) {
          return;
        }
        const countFollower = await Axios.get(
          `http://localhost:5050/report/following_number/${params}`
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
        const { countIncomeLoading, countIncomeRequestId } = getState().countIncome;
        if (countIncomeLoading !== true || requestId !== countIncomeRequestId) {
          return;
        }
        const countIncome = await Axios.get(
          `http://localhost:5050/report/today_income/${params}`
        );
        return countIncome.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  