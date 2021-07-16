import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetStadiumPrice = createAsyncThunk(
  "price/getStadiumPrice",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { priceLoading, priceRequestId } = getState().stadiumPrice;
      if (priceLoading !== true || requestId !== priceRequestId) {
        return;
      }
      const getStadiumPrice = await Axios.get(
        `http://localhost:5050/price/getStadiumPrice/${params}`
      );
      return getStadiumPrice.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetStadiumsToAddPrice = createAsyncThunk(
  "price/getStadiumsToAddPrice",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { priceLoading, getStadiumsRequestId } = getState().stadiumPrice;
      if (priceLoading !== true || requestId !== getStadiumsRequestId) {
        return;
      }
      const getStadiumPriceToAddPrice = await Axios.get(
        `http://localhost:5050/price/getStadiumDetailsToAddPrice/${params}`
      );
      return getStadiumPriceToAddPrice.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetTimesToAddPrice = createAsyncThunk(
  "price/getTimesToAddPrice",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { getTimeLoading, getTimesRequestId } = getState().stadiumPrice;
      if (getTimeLoading !== true || requestId !== getTimesRequestId) {
        return;
      }
      const getTimeToAddPrice = await Axios.get(
        `http://localhost:5050/timetb/getTime`
      );
      return getTimeToAddPrice.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddStadiumPrice = createAsyncThunk(
  "price/addStadiumPrice",
  async (requestData, { rejectWithValue }) => {
    try {
      const addStadiumPriceData = await Axios.post(
        "http://localhost:5050/price/addStadiumPrice",
        {
          stadium_id: requestData.stadium_id,
          data: requestData.allPriceData,
        }
      );
      return addStadiumPriceData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteStadiumPrice = createAsyncThunk(
  "price/deleteStadiumPrice",
  async (data, { rejectWithValue }) => {
    try {
      const deleteStadiumPriceData = await Axios.delete(
        "http://localhost:5050/price/deleteStadiumPrice",
        {
          data: {
            std_id: data.stadiums_id,
            timing_id: data.time_id,
          },
        }
      );
      return deleteStadiumPriceData.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
