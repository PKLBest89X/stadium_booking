import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetStadiumDrink = createAsyncThunk(
  "drink/getStadiumDrink",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { drinkLoading, drinkRequestId } = getState().stadiumDrink;
      if (drinkLoading !== true || requestId !== drinkRequestId) {
        return;
      }
      const getStadiumDrink = await Axios.get(
        `http://localhost:5050/water/getStadiumDrink/${params}`
      );
      return getStadiumDrink.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddStadiumDrink = createAsyncThunk(
  "drink/addStadiumDrink",
  async (data, { rejectWithValue }) => {
    try {
      const addStadiumDrink = await Axios.post(
        "http://localhost:5050/water/addStadiumDrink",
        data
      );
      return addStadiumDrink.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateStadiumDrink = createAsyncThunk(
  "drink/updateStadiumDrink",
  async (data, { rejectWithValue }) => {
    try {
      const updateStadiumDrink = await Axios.put(
        "http://localhost:5050/water/updateStadiumDrink",
        data
      );
      return updateStadiumDrink.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
