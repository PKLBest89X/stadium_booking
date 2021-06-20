import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchAddStadiumPrice = createAsyncThunk(
  "stadium/add",
  async (data, { rejectWithValue }) => {
    try {
      const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      const addStadiumDetailsData = await Axios.post(
        "http://localhost:5050/stadium/stadium_add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            'authorization': `Bearer ${adminToken.token}`,
          },
        }
      );
      return addStadiumDetailsData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateStadiumPrice = createAsyncThunk(
  "stadium/update",
  async (data, { rejectWithValue }) => {
    try {
      const updateStadiumDetailsData = await Axios.post(
        "http://localhost:5050/stadium/add",
        {}
      );
      return updateStadiumDetailsData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);