import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetPost = createAsyncThunk(
  "post/getPost",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { postLoading, postRequestId } = getState().posts;
      if (postLoading !== true || requestId !== postRequestId) {
        return;
      }
      const getPost = await Axios.get(
        `http://localhost:5050/post/getPostByStadiumId/${params}`
      );
      return getPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetPostById = createAsyncThunk(
  "post/getPostById",
  async (params, { rejectWithValue, getState, requestId }) => {
    const { postLoading, postRequestId } = getState().posts;
    try {
      if (postLoading !== true || requestId !== postRequestId) {
        return;
      }
      const getPostById = await Axios.get(
        `http://localhost:5050/post/getPostByStadiumIdPostId/${params.stadiumId}/${params.postId}`
      );
      return getPostById.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddPost = createAsyncThunk(
  "post/add",
  async (data, { rejectWithValue }) => {
    try {
      const addPost = await Axios.post(
        "http://localhost:5050/post/addPost",
        data
      );
      return addPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdatePost = createAsyncThunk(
  "post/update",
  async (allData, { rejectWithValue }) => {
    try {
      const updatePost = await Axios.put("http://localhost:5050/post/addPost");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  "post/delete",
  async (params, { rejectWithValue }) => {
    try {
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
