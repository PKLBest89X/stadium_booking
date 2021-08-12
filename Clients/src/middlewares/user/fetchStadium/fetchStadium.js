import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


export const fetchGetAllStadiumForUser = createAsyncThunk(
  "user/getAllStadium",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { feedAllStadiumLoading, feedAllStadiumRequestId } =
        getState().feedStadium;
      if (feedAllStadiumLoading !== true || requestId !== feedAllStadiumRequestId) {
        return;
      }
      const getAllStadium = await Axios.get(
        `http://localhost:5050/stadium/showAllForUser`
      );
      return getAllStadium.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetStadiumForUser = createAsyncThunk(
  "user/getStadium",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { feedStadiumLoading, feedStadiumRequestId } =
        getState().feedStadium;
      if (feedStadiumLoading !== true || requestId !== feedStadiumRequestId) {
        return;
      }
      const getFeedStadium = await Axios.get(
        `http://localhost:5050/stadium/show/byStadiumId/${params}`
      );
      return getFeedStadium.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
