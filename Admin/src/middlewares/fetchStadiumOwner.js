import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addStadiumOwner = createAsyncThunk(
  "stadiumOwner/add",
  async (addStadiumOwner, { rejectWithValue }) => {
    try {
      const addPeople = axios.post("http://localhost:5050/staff/add", addStadiumOwner);
      return addPeople.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateStadiumOwner = createAsyncThunk(
  "stadiumOwner/update",
  async () => {
    try {
      const deletePeople = axios.delete("", {});
      return deletePeople.data;
    } catch (err) {}
  }
);

export const deleteStadiumOwner = createAsyncThunk(
  "stadiumOwner/delete",
  async () => {
    try {
    } catch (err) {}
  }
);
