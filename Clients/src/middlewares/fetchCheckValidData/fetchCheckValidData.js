import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCheckStadium = createAsyncThunk(
  "stadium/checkValidData",
  async (params, { rejectWithValue }) => {
    try {
      const checkStadiumData = await Axios.get(
        `http://localhost:5050/stadium/checkValidData/${params}`
      );
      return checkStadiumData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
