import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCheckBooking = createAsyncThunk(
  "booking/checkValidBookingData",
  async (params, { rejectWithValue }) => {
    try {
      const checkBooking = await Axios.get(
        `http://localhost:5050/validation/validBookingData/${params}`
      );
      return checkBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);