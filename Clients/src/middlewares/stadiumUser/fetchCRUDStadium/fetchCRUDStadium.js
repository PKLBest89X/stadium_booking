import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetStadium = createAsyncThunk(
  "stadium/getStadiumData",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { stadiumLoading, stadiumRequestId } = getState().stadium;
      if (stadiumLoading !== true || requestId !== stadiumRequestId) {
        return;
      }
      const getPost = await Axios.get(
        `http://localhost:5050/stadium/show/byStadiumId/${params}`
      );
      return getPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddStadium = createAsyncThunk(
  "stadium/add",
  async (data, { rejectWithValue }) => {
    try {
      const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      const addStadiumData = await Axios.post(
        "http://localhost:5050/stadium/stadium_add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${adminToken.token}`,
          },
        }
      );
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
      const updateStadiumData = await Axios.put(
        "http://localhost:5050/stadium/edit",
        data
      );
      return updateStadiumData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
