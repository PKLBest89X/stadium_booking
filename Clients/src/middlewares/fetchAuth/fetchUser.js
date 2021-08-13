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
      if (user.data) return user.data;
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
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
      if (userToken && userToken.token) {
        const updateProfile = await Axios.put(
          "http://localhost:5050/customer/updateProfile",
          data,
          {
            headers: { Authorization: `Bearer ${userToken.token}` },
          }
        );
        return updateProfile.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("accessUserToken"));
      if (userToken && userToken.token) {
        const updatePassword = await Axios.put(
          "http://localhost:5050/customer/updatePassword",
          {
            old_password: data.oldPassword,
            new_password: data.newPassword,
          },
          {
            headers: { Authorization: `Bearer ${userToken.token}` },
          }
        );
        return updatePassword.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
