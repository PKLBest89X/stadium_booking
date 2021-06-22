import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../../../Components/history";
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
  postsDataById: [],
  postSuccess: null,
  postRequestId: undefined,
  postError: null,
};

const postSlice = createSlice({
  name: "postsgg",
  initialState,
  reducers: {
    onDeletePost: (state, action) => {
      state.postsData = state.postsData.filter(
        (items) => items.pt_id !== action.payload.postId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetPost.pending, (state, action) => {
      state.postLoading = true;
      if (state.postLoading === true) {
        state.postRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetPost.fulfilled, (state, action) => {
      if (
        state.postLoading === true &&
        state.postRequestId === action.meta.requestId
      ) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = true;
        state.postsData = [];
        state.postsData = action.payload;
      }
    });
    builder.addCase(fetchGetPost.rejected, (state, action) => {
      if (
        state.postLoading === true &&
        state.postRequestId === action.meta.requestId
      ) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = false;
        state.postError = action.payload;
      }
    });
    builder.addCase(fetchGetPostById.pending, (state, action) => {
      state.postLoading = true;
      if (state.postLoading === true) {
        state.postRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetPostById.fulfilled, (state, action) => {
      if (
        state.postLoading === true &&
        state.postRequestId === action.meta.requestId
      ) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = true;
        state.postsDataById = [];
        state.postsDataById.push(action.payload);
      }
    });
    builder.addCase(fetchGetPostById.rejected, (state, action) => {
      if (
        state.postLoading === true &&
        state.postRequestId === action.meta.requestId
      ) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = false;
        state.postError = action.payload;
      }
    });
    builder.addCase(fetchAddPost.pending, (state, action) => {
      state.postLoading = true;
    });
    builder.addCase(fetchAddPost.fulfilled, (state, action) => {
      state.postLoading = false;
      history.back();
    });
    builder.addCase(fetchAddPost.rejected, (state, action) => {
      state.postLoading = false;
      state.postError = action.payload;
    });
    builder.addCase(fetchUpdatePost.pending, (state, action) => {
      state.postLoading = true;
    });
    builder.addCase(fetchUpdatePost.fulfilled, (state, action) => {
      state.postLoading = false;
      history.back();
    });
    builder.addCase(fetchUpdatePost.rejected, (state, action) => {
      state.postLoading = false;
      state.postError = action.payload;
      state.postSuccess = false;
    });
    builder.addCase(fetchDeletePost.pending, (state, action) => {
      state.postLoading = true;
    });
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.postLoading = false;
      state.postSuccess = true;
    });
    builder.addCase(fetchDeletePost.rejected, (state, action) => {
      state.postLoading = false;
      state.postSuccess = false;
      state.postError = action.payload;
    });
  },
});
export const { onDeletePost } = postSlice.actions;
export default postSlice.reducer;
