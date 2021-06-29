import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetSubscribeByStadiumId = createAsyncThunk(
  "subscribe/getSubscribeByStadiumId",
  async (data, { rejectWithValue, getState, requestId }) => {
    try {
      const { subscribeLoading, subscribeRequestId2 } = getState().subscribe;
      if (subscribeLoading !== true || requestId !== subscribeRequestId2) {
        return;
      }
      const getSubscribeByStadiumId = await Axios.get(
        `http://localhost:5050/subscribe/getSubscribeByStadiumIdCustomerId/${data.stadiumId}`,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return getSubscribeByStadiumId.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetSubscribe = createAsyncThunk(
  "subscribe/getAllSubscribe",
  async (token, { rejectWithValue, getState, requestId }) => {
    try {
      const { subscribeLoading, subscribeRequestId } = getState().subscribe;
      if (subscribeLoading !== true || requestId !== subscribeRequestId) {
        return;
      }
      const getAllSubscribe = await Axios.get(
        `http://localhost:5050/subscribe/getSubscribeByCustomerId`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return getAllSubscribe.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchSubscribeStadium = createAsyncThunk(
  "subscribe/subscribeStadium",
  async (data, { rejectWithValue }) => {
    try {
      const subscribeStadium = await Axios.post(
        `http://localhost:5050/subscribe/subscribeStadium/${data.stadiumId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return subscribeStadium.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUnSubscribeStadium = createAsyncThunk(
  "subscribe/unSubscribeStadium",
  async (data, { rejectWithValue }) => {
    try {
      const unSubscribeStadium = await Axios.delete(
        `http://localhost:5050/subscribe/unSubscribeStadium/${data.stadiumId}`,
        {
          headers: {
            authorization: `Bearer ${data.token}`,
          },
        }
      );
      return unSubscribeStadium.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
