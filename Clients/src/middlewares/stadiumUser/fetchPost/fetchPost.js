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
  async (data, { rejectWithValue }) => {
    try {
      const updatePost = await Axios.put(
        `http://localhost:5050/post/postUpdate`,
        data
      );
      return updatePost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  "post/delete",
  async (requestData, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("accessAdminToken"));
    try {
      const deletePost = await Axios.delete(
        "http://localhost:5050/post/postDelete",
        {
          headers: {
            authorization: adminToken.token,
          },
          data: {
            postId: requestData.postId,
            stadiumId: requestData.stadiumId,
            postImage: requestData.postImage
          },
        }
      );
      return deletePost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
