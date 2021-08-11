import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


export const fetchGetAllStadiumOwner = createAsyncThunk(
  "stadiumOwner/getAllStadiumOwner",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { stadiumOwnerLoading, stadiumOwnerRequestId } =
        getState().stadiumOwner;
      if (
        stadiumOwnerLoading !== true ||
        requestId !== stadiumOwnerRequestId
      ) {
        return;
      }
      const getAllStadiumOwner = await Axios.get(
        `http://localhost:5050/staff/getAllStadiumOwner`
      );
      return getAllStadiumOwner.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addStadiumOwner = createAsyncThunk(
  "stadiumOwner/add",
  async (addStadiumOwner, { rejectWithValue }) => {
    try {
      const addPeople = Axios.post("http://localhost:5050/staff/add", addStadiumOwner);
      return addPeople.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const updateStadiumOwner = createAsyncThunk(
//   "stadiumOwner/update",
//   async () => {
//     try {
//       const deletePeople = axios.delete("", {});
//       return deletePeople.data;
//     } catch (err) {}
//   }
// );

// export const deleteStadiumOwner = createAsyncThunk(
//   "stadiumOwner/delete",
//   async () => {
//     try {
//     } catch (err) {}
//   }
// );
