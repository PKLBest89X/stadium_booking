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
      const { loading, currentRequestId } = getState().auth;
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

export const fetchUpdateUserProfileAdmin = createAsyncThunk(
  "admin/updateProfileAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      if (adminToken && adminToken.token) {
        const updateProfileAdmin = await Axios.put(
          "http://localhost:5050/staff/updateProfile",
          data,
          {
            headers: { Authorization: `Bearer ${adminToken.token}` },
          }
        );
        return updateProfileAdmin.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdatePasswordAdmin = createAsyncThunk(
  "admin/updatePasswordAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
      if (adminToken && adminToken.token) {
        const updatePasswordAdmin = await Axios.put(
          "http://localhost:5050/staff/updatePassword",
          {
            old_password: data.oldPassword,
            new_password: data.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${adminToken.token}` },
          }
        );
        return updatePasswordAdmin.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
