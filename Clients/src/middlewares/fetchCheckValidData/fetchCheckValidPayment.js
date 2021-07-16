import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCheckPayment = createAsyncThunk(
  "payment/checkValidPaymentData",
  async (params, { rejectWithValue }) => {
    try {
      const checkPayment = await Axios.get(
        `http://localhost:5050/validation/validPaymentData/${params}`
      );
      return checkPayment.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);