import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchCheckPost = createAsyncThunk(
  "checkPost/checkValidPostData",
  async (params, { rejectWithValue }) => {
    try {
      const checkPost = await Axios.get(
        `http://localhost:5050/validation/validPostData/${params}`
      );
      return checkPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);