import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchLoginAdmin = createAsyncThunk(
  "admin/login",
  async (loginAdmin, { rejectWithValue }) => {
    try {
      const admin = await Axios.post("http://localhost:5050/staff/login", {
        email: loginAdmin.email,
        password: loginAdmin.password,
      });
      return admin.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAuthAdmin = createAsyncThunk(
  "admin/accessAdminToken",
  async (token, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = getState().auth;
      if (loading !== true || requestId !== currentRequestId) {
        return;
      }
      const accessTokenAdmin = await Axios.get(
        "http://localhost:5050/staff/login/authen",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return accessTokenAdmin.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
