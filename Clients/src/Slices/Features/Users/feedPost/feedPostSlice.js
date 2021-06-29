import { createSlice } from "@reduxjs/toolkit";
import { fetchFeedPost } from "../../../../middlewares/user/fetchFeedPost/fetchFeedPost";

const initialState = {
  feedPostLoading: false,
  feedPostSuccess: null,
  feedPostData: [],
  feddPostError: null,
  feedPostRequestId: null,
};

const feedPostSlice = createSlice({
  name: "feedPost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeedPost.pending, (state, { meta }) => {
      state.feedPostLoading = true;
      if (state.feedPostLoading === true) {
        state.feedPostRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchFeedPost.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.feedPostLoading === true ||
        state.feedPostRequestId === requestId
      ) {
        state.feedPostLoading = false;
        state.feedPostSuccess = true;
        state.feedPostRequestId = undefined;
        state.feedPostData = [];
        state.feedPostData = action.payload;
      }
    });
    builder.addCase(fetchFeedPost.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.feedPostLoading === true ||
        state.feedPostRequestId === requestId
      ) {
        state.feedPostLoading = false;
        state.feedPostSuccess = false;
        state.feedPostRequestId = undefined;
        state.feedPostError = action.payload;
      }
    });
  },
});

export default feedPostSlice.reducer;
