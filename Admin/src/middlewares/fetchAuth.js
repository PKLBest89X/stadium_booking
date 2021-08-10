import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchLoginSuperAdmin = createAsyncThunk(
  "superAdmin/login",
  async (data, { rejectWithValue }) => {
    try {
      const superAdmin = await Axios.post(
        "http://localhost:5050/admin_ac/superAdminLogin",
        {
          email: data.email,
          password: data.password,
        }
      );
      return superAdmin.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAuthSuperAdmin = createAsyncThunk(
  "superAdmin/accessSuperAdminToken",
  async (token, { rejectWithValue, getState, requestId }) => {
    try {
      const { currentRequestId, loading } = getState().auth;
      if (loading !== true || requestId !== currentRequestId) {
        return;
      }
      const accessTokenSuperAdmin = await Axios.get(
        "http://localhost:5050/admin_ac/authSuperAdmin",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return accessTokenSuperAdmin.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


