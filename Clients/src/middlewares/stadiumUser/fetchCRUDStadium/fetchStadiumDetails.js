import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


export const fetchGetStadiumDetails = createAsyncThunk(
  "stadiumDetails/getStadiums",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { stadiumsLoading, stadiumsRequestId } = getState().stadiumDetails;
      if (stadiumsLoading !== true || requestId !== stadiumsRequestId) {
        return;
      }
      const getPost = await Axios.get(
        `http://localhost:5050/field/getStadiumDetails/${params}`
      );
      return getPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddStadiumDetails = createAsyncThunk(
  "stadiumDetails/addStadiums",
  async (data, { rejectWithValue }) => {
    try {
      const addStadiumDetailsData = await Axios.post(
        "http://localhost:5050/field/addStadiums",
        data,
      );
      return addStadiumDetailsData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateStadiumDetails = createAsyncThunk(
  "stadiumDetails/updateStadiums",
  async (data, { rejectWithValue }) => {
    try {
      const updateStadiumDetailsData = await Axios.put(
        "http://localhost:5050/field/updateStadiums",
        data
      );
      return updateStadiumDetailsData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);