import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetPost,
  fetchAddPost,
  fetchUpdatePost,
  fetchDeletePost,
} from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";

const initialState = {
  postLoading: false,
  postDatas: [],
  postError: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetPost.pending]: (state, action) => {
      state.postLoading = true;
    },
    [fetchGetPost.fulfilled]: (state, action) => {
      state.postLoading = false;
    },
    [fetchGetPost.rejected]: (state, action) => {
      state.postLoading = false;
    },
    [fetchAddPost.pending]: (state, action) => {
      state.postLoading = true;
    },
    [fetchAddPost.fulfilled]: (state, action) => {
      state.postLoading = false;
    },
    [fetchAddPost.rejected]: (state, action) => {
      state.postLoading = false;
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
