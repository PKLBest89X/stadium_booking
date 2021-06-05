import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchLoginAdmin = createAsyncThunk(
  "admin/login",
  async (loginUser, { rejectWithValue }) => {
    try {
      const user = await Axios.post("http://localhost:5050/customer/login", {
        email: loginUser.email,
        password: loginUser.password,
      });
      return user.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const fetchAuthAdmin = createAsyncThunk(
  "admin/accessAdminToken",
  async (token, { getState, requestId }) => {
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
    } catch (err) {}
  }
);
