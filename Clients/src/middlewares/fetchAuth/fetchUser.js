import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchLoginUser = createAsyncThunk(
  "user/login",
  async (loginUser, { rejectWithValue }) => {
    try {
      const user = await Axios.post("http://localhost:5050/customer/login", {
        email: loginUser.email,
        password: loginUser.password,
      });
      if (user.data)
      return user.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAuthUser = createAsyncThunk(
  "user/accessUserToken",
  async (token, { rejectWithValue, getState, requestId }) => {
    try {
      const { currentRequestId, loading } = getState().auth;
      if (loading !== true || requestId !== currentRequestId) {
        return;
      }
      const accessTokenUsers = await Axios.get(
        "http://localhost:5050/customer/login/user",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return accessTokenUsers.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
