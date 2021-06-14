import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchAddPost = createAsyncThunk('post/add', async (data, { rejectWithValue }) => {
    try {

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const fetchUpdatePost = createAsyncThunk('post/update', async (allData, { rejectWithValue }) => {
    try {

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})

export const fetchDeletePost = createAsyncThunk('post/delete', async (params, { rejectWithValue }) => {
    try {

    } catch (err) {
        return rejectWithValue(err.response.data);
    }
})