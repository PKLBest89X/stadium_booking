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

export const fetchUpdateUserProfileSuperAdmin = createAsyncThunk(
  "superAdmin/updateProfileSuperAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const superAdminToken = JSON.parse(
        localStorage.getItem("accessSuperAdminToken")
      );
      if (superAdminToken && superAdminToken.token) {
        const updateProfileSuperAdmin = await Axios.put(
          "http://localhost:5050/admin/updateProfile",
          data,
          {
            headers: { Authorization: `Bearer ${superAdminToken.token}` },
          }
        );
        return updateProfileSuperAdmin.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdatePasswordSuperAdmin = createAsyncThunk(
  "superAdmin/updatePasswordSuperAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const superAdminToken = JSON.parse(
        localStorage.getItem("accessSuperAdminToken")
      );
      if (superAdminToken && superAdminToken.token) {
        const updatePasswordSuperAdmin = await Axios.put(
          "http://localhost:5050/admin/updatePassword",
          {
            old_password: data.oldPassword,
            new_password: data.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${superAdminToken.token}` },
          }
        );
        return updatePasswordSuperAdmin.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
