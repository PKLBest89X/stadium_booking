import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFeedPost,
  fetchFeedPostOfStadium,
  fetchFeedPostOfStadiumOnSeleted,
} from "../../../../middlewares/user/fetchFeedPost/fetchFeedPost";

const initialState = {
  feedPostLoading: false,
  feedPostSuccess: null,
  feedPostData: [],
  feddPostError: null,
  feedPostRequestId: null,
  postOfStadiumLoading: false,
  postOfStadiumSuccess: null,
  postOfStadiumData: [],
  postOfStadiumError: null,
  postOfStadiumRequestId: undefined,
  postOnSelectedLoading: false,
  postOnSelectedData: [],
  postOnSelectedError: null,
  postOnSelectedRequestId: undefined
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

    //ບັນດາ post ສະເພາະຂອງເດີ່ນ
    builder.addCase(fetchFeedPostOfStadium.pending, (state, { meta }) => {
      state.postOfStadiumLoading = true;
      if (state.postOfStadiumLoading === true) {
        state.postOfStadiumRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchFeedPostOfStadium.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.postOfStadiumLoading === true ||
        state.postOfStadiumRequestId === requestId
      ) {
        state.postOfStadiumLoading = false;
        state.postOfStadiumSuccess = true;
        state.postOfStadiumRequestId = undefined;
        state.postOfStadiumData = [];
        state.postOfStadiumData = action.payload;
      }
    });
    builder.addCase(fetchFeedPostOfStadium.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.postOfStadiumLoading === true ||
        state.postOfStadiumRequestId === requestId
      ) {
        state.postOfStadiumLoading = false;
        state.postOfStadiumSuccess = false;
        state.postOfStadiumRequestId = undefined;
        state.postOfStadiumError = action.payload;
      }
    });

    //1 post ສະເພາະຂອງເດີ່ນ
    builder.addCase(
      fetchFeedPostOfStadiumOnSeleted.pending,
      (state, { meta }) => {
        state.postOnSelectedLoading = true;
        if (state.postOnSelectedLoading === true) {
          state.postOnSelectedRequestId = meta.requestId;
        }
      }
    );
    builder.addCase(
      fetchFeedPostOfStadiumOnSeleted.fulfilled,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.postOnSelectedLoading === true ||
          state.postOnSelectedRequestId === requestId
        ) {
          state.postOnSelectedLoading = false;
          // state.feedPostSuccess = true;
          state.postOnSelectedRequestId = undefined;
          state.postOnSelectedData = [];
          state.postOnSelectedData.push(action.payload);
        }
      }
    );
    builder.addCase(
      fetchFeedPostOfStadiumOnSeleted.rejected,
      (state, action) => {
        const { requestId } = action.meta;
        if (
          state.postOnSelectedLoading === true ||
          state.postOnSelectedRequestId === requestId
        ) {
          state.postOnSelectedLoading = false;
          // state.feedPostSuccess = false;
          state.postOnSelectedRequestId = undefined;
          state.postOnSelectedError = action.payload;
        }
      }
    );
  },
});

export default feedPostSlice.reducer;
