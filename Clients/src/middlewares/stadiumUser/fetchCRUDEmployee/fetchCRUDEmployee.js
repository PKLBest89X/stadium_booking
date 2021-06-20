import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchGetEmployee = createAsyncThunk('employee/get', async (params, { rejectWithValue }) => {
    try {
        const getPost = await Axios.get(`http://localhost:5050/stadium/checkValidData/${params}`);
        return getPost.data
    } catch (err) {
        return (err.response.data)
    }
})

export const fetchAddEmployee = createAsyncThunk('employee/add', async (data, { rejectWithValue }) => {
    try {

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const fetchUpdateEmployee = createAsyncThunk('employee/update', async (allData, { rejectWithValue }) => {
    try {

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const fetchDeleteEmployee = createAsyncThunk('employee/delete', async (params, { rejectWithValue }) => {
    try {

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})