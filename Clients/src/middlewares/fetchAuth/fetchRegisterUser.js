import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchRegisterUser = createAsyncThunk(
  "user/register",
  async (regisInfo, { rejectWithValue }) => {
    try {
      const userRegister = await Axios.post(
        "http://localhost:5050/customer/register",
        {
          datas: {
            email: regisInfo.email,
            password: regisInfo.password,
            firstName: regisInfo.firstName,
            lastName: regisInfo.lastName,
            phone: regisInfo.phone,
          },
        }
      );
      // if (userRegister.data.message) {
      //   return rejectWithValue(userRegister.data.message);
      // }
      return userRegister.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
