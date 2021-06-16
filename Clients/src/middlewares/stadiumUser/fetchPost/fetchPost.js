import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchGetPost = createAsyncThunk('post/get', async (params, { rejectWithValue }) => {
    try {
        const getPost = await Axios.get(`http://localhost:5050/stadium/checkValidData/${params}`);
        return getPost.data
    } catch (err) {
        return (err.response.data)
    }
})

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