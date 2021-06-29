import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetEmployee = createAsyncThunk(
  "employee/get",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { employeeLoading, employeeRequestId } = getState().employees;
      if (employeeLoading !== true || requestId !== employeeRequestId) {
        return;
      }
      const getEmployee = await Axios.get(
        `http://localhost:5050/staff/get_employee/${params}`
      );
      return getEmployee.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const fetchAddEmployee = createAsyncThunk(
  "employee/add",
  async (data, { rejectWithValue }) => {
    try {
      const addEmployee = await Axios.post('http://localhost:5050/staff/employee/add', data);
      return addEmployee.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateEmployee = createAsyncThunk(
  "employee/update",
  async (allData, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteEmployee = createAsyncThunk(
  "employee/delete",
  async (params, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
