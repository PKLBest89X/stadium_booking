import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetPost,
  fetchAddPost,
  fetchUpdatePost,
  fetchDeletePost,
} from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";

const initialState = {
  postLoading: false,
  postsData: [],
  postsDataById: [],
  postsDataSortByDate: [],
  postSuccess: null,
  postRequestId: undefined,
  postError: null,
  postAddError: null,
};

const postSlice = createSlice({
  name: "postsgg",
  initialState,
  reducers: {
    onUpdatePost: (state, { payload }) => {
      state.postsDataById = [];
      state.postsDataById.push(payload);
    },
    onDeletePost: (state, action) => {
      let afterDeletePost = state.postsData.filter(
        (items) => items.pt_id !== action.payload.postId
      );
      if (afterDeletePost.length > 0) {
        state.postsData = afterDeletePost;
        state.postSuccess = true;
      } else {
        state.postsData = [];
        state.postsDataSortByDate = [];
        state.postSuccess = false;
      }
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
        let slicePayload = action.payload.slice(0, 6);
        let newSort = slicePayload.sort(
          (a, b) => (new Date(a["post_date"]) - new Date(b["post_date"])) * -1
        );
        state.postsDataSortByDate = newSort;
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

    builder.addCase(fetchAddPost.pending, (state, action) => {
      state.postLoading = true;
    });
    builder.addCase(fetchAddPost.fulfilled, (state, action) => {
      state.postLoading = false;
      state.postSuccess = true;
      state.postsData = [];
      state.postsData = action.payload;
      state.postsDataSortByDate = [];
      let slicePayload = action.payload.slice(0, 6);
      let newSort = slicePayload.sort(
        (a, b) => (new Date(a["post_date"]) - new Date(b["post_date"])) * -1
      );
      state.postsDataSortByDate = newSort;
    });
    builder.addCase(fetchAddPost.rejected, (state, action) => {
      state.postLoading = false;
      state.postAddError = action.payload;
    });
    builder.addCase(fetchUpdatePost.pending, (state, action) => {
      state.postLoading = true;
    });
    builder.addCase(fetchUpdatePost.fulfilled, (state, action) => {
      state.postLoading = false;
      state.postSuccess = true;
      state.postsData = [];
      state.postsData = action.payload;
      state.postsDataSortByDate = [];
      let slicePayload = action.payload.slice(0, 6);
      let newSort = slicePayload.sort(
        (a, b) => (new Date(a["post_date"]) - new Date(b["post_date"])) * -1
      );
      state.postsDataSortByDate = newSort;
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
export const { onUpdatePost, onDeletePost } = postSlice.actions;
export default postSlice.reducer;
