import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCountStadiumOwner = createAsyncThunk(
    "dashboard/countStadiumOwner",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { postLoading, postRequestId } = getState().posts;
        if (postLoading !== true || requestId !== postRequestId) {
          return;
        }
        const countStadiumOwner = await Axios.get(
          `http://localhost:5050/report/getPostByStadiumId/${params}`
        );
        return countStadiumOwner.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const fetchCountStadium = createAsyncThunk(
    "dashboard/countStadium",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { postLoading, postRequestId } = getState().posts;
        if (postLoading !== true || requestId !== postRequestId) {
          return;
        }
        const countStadium = await Axios.get(
          `http://localhost:5050/report/getPostByStadiumId/${params}`
        );
        return countStadium.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );