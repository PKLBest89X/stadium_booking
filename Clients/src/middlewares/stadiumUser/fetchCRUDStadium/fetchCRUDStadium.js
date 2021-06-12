import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchAddStadium = createAsyncThunk(
  "stadium/add",
  async (data, { rejectWithValue }) => {
    try {
      const addStadiumData = await Axios.post("http://localhost:5050/stadium/stadium_add",data);
      return addStadiumData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateStadium = createAsyncThunk(
  "stadium/update",
  async (data, { rejectWithValue }) => {
    try {
      const updateStadiumData = await Axios.post(
        "http://localhost:5050/stadium/add",
        {}
      );
      return updateStadiumData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
