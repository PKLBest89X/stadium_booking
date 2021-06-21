import { createSlice } from "@reduxjs/toolkit";
import { history } from '../../../../Components/history'
import {
  fetchGetPost,
  fetchGetPostById,
  fetchAddPost,
  fetchUpdatePost,
  fetchDeletePost,
} from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";

const initialState = {
  postLoading: false,
  postsData: [],
  postSuccess: null,
  postRequestId: undefined,
  postError: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetPost.pending]: (state, action) => {
      state.postLoading = true;
      if (state.postLoading === true) {
        state.postRequestId = action.meta.requestId;
      }
    },
    [fetchGetPost.fulfilled]: (state, action) => {
      if (state.postLoading === true && state.postRequestId === action.meta.requestId) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = true;
        state.postsData = [];
        state.postsData = action.payload;
      }
    },
    [fetchGetPost.rejected]: (state, action) => {
      if (state.postLoading === true && state.postRequestId === action.meta.requestId) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = false;
        state.postError = action.payload;
      }
    },
    [fetchGetPostById.pending]: (state, action) => {
      state.postLoading = true;
      if (state.postLoading === true) {
        state.postRequestId = action.meta.requestId;
      }
    },
    [fetchGetPostById.fulfilled]: (state, action) => {
      if (state.postLoading === true && state.postRequestId === action.meta.requestId) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = true;
        state.postsData = [];
        state.postsData.push(action.payload);
      }
    },
    [fetchGetPost.rejected]: (state, action) => {
      if (state.postLoading === true && state.postRequestId === action.meta.requestId) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = false;
        state.postError = action.payload;
      }
    },
    [fetchAddPost.pending]: (state, action) => {
      state.postLoading = true;
    },
    [fetchAddPost.fulfilled]: (state, action) => {
      state.postLoading = false;
      history.back();
    },
    [fetchAddPost.rejected]: (state, action) => {
      state.postLoading = false;
      state.postError = action.payload;
    },
    [fetchUpdatePost.pending]: (state, action) => {
      state.postLoading = true;
    },
    [fetchUpdatePost.fulfilled]: (state, action) => {
      state.postLoading = false;
    },
    [fetchUpdatePost.rejected]: (state, action) => {
      state.postLoading = false;
    },
    [fetchDeletePost.pending]: (state, action) => {
      state.postLoading = true;
    },
    [fetchDeletePost.fulfilled]: (state, action) => {
      state.postLoading = false;
    },
    [fetchDeletePost.rejected]: (state, action) => {
      state.postLoading = false;
    },
  },
});

export default postSlice.reducer;
