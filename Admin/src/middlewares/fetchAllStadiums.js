import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetAllStadiums = createAsyncThunk(
  "superAdmin/getAllStadiums",
  async (data, { rejectWithValue, getState, requestId }) => {
    try {
      const { allStadiumsLoading, allStadiumsRequestId } =
        getState().allStadiums;
      if (allStadiumsLoading !== true || requestId !== allStadiumsRequestId) {
        return;
      }
      const getAllStadiums = await Axios.get(
        `http://localhost:5050/stadium/showAll`
      );
      return getAllStadiums.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetAvailableStadiums = createAsyncThunk(
    "superAdmin/getAvailableStadiums",
    async (data, { rejectWithValue, getState, requestId }) => {
      try {
        const { availableLoading, availbleRequestId } =
          getState().allStadiums;
        if (availableLoading !== true || requestId !== availbleRequestId) {
          return;
        }
        const getAvailableStadiums = await Axios.get(
          `http://localhost:5050/stadium/showAvailable`
        );
        return getAvailableStadiums.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const fetchGetNotAvailableStadiums = createAsyncThunk(
    "superAdmin/getNotAvailableStadiums",
    async (data, { rejectWithValue, getState, requestId }) => {
      try {
        const { notAvailableLoading, notAvailbleRequestId } =
          getState().allStadiums;
        if (notAvailableLoading !== true || requestId !== notAvailbleRequestId) {
          return;
        }
        const getNotAvailableStadiums = await Axios.get(
          `http://localhost:5050/stadium/showNotAvailable`
        );
        return getNotAvailableStadiums.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );