import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetSubscribe,
  fetchGetSubscribeByStadiumId,
  fetchSubscribeStadium,
  fetchUnSubscribeStadium,
} from "../../../../middlewares/user/fetchSubscribe/fetchSubscribe";

const initialState = {
  subscribeLoading: false,
  subscribeSuccess: null,
  subscribeSuccessById: null,
  subscribeData: [],
  subscribeDataByStadiumId: [],
  subscribeError: null,
  subscribeRequestId: null,
  subscribeRequestId2: null,
};

const subscribeSlice = createSlice({
  name: "subscribeStadium",
  initialState,
  reducers: {
    onSubscribeStadium: (state, action) => {
      state.subscribeSuccess = true;
      state.subscribeSuccessById = true;
      state.subscribeData.push(action.payload);
      state.subscribeDataByStadiumId.push(action.payload);
    },
    onUnSubscribeStadium: (state, action) => {
      state.subscribeSuccessById = false;
      state.subscribeDataByStadiumId = [];
      let getAfterUnSub = state.subscribeData.filter(
        (items) => items.st_id !== action.payload.stadiumId
      );
      if (getAfterUnSub.length > 0) {
        state.subscribeData = getAfterUnSub;
        state.subscribeSuccess = true;
      } else {
        state.subscribeData = [];
        state.subscribeSuccess = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetSubscribe.pending, (state, { meta }) => {
      state.subscribeLoading = true;
      if (state.subscribeLoading === true) {
        state.subscribeRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchGetSubscribe.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.subscribeLoading === true ||
        state.subscribeRequestId === requestId
      ) {
        state.subscribeLoading = false;
        state.subscribeSuccess = true;
        state.subscribeRequestId = undefined;
        state.subscribeData = [];
        state.subscribeData = action.payload;
      }
    });
    builder.addCase(fetchGetSubscribe.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.subscribeLoading === true ||
        state.subscribeRequestId === requestId
      ) {
        state.subscribeLoading = false;
        state.subscribeSuccess = false;
        state.subscribeRequestId = undefined;
        state.subscribeError = action.payload;
      }
    });
    builder.addCase(fetchGetSubscribeByStadiumId.pending, (state, { meta }) => {
      state.subscribeLoading = true;
      if (state.subscribeLoading === true) {
        state.subscribeRequestId2 = meta.requestId;
      }
    });
    builder.addCase(fetchGetSubscribeByStadiumId.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.subscribeLoading === true ||
        state.subscribeRequestId2 === requestId
      ) {
        state.subscribeLoading = false;
        state.subscribeSuccessById = true;
        state.subscribeRequestId2 = undefined;
        state.subscribeDataByStadiumId = [];
        state.subscribeDataByStadiumId = action.payload;
      }
    });
    builder.addCase(fetchGetSubscribeByStadiumId.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.subscribeLoading === true ||
        state.subscribeRequestId2 === requestId
      ) {
        state.subscribeLoading = false;
        state.subscribeSuccessById = false;
        state.subscribeRequestId2 = undefined;
        state.subscribeError = action.payload;
      }
    });
    builder.addCase(fetchSubscribeStadium.pending, (state, action) => {
      state.subscribeLoading = true;
    });
    builder.addCase(fetchSubscribeStadium.fulfilled, (state, action) => {
      state.subscribeLoading = false;
    });
    builder.addCase(fetchSubscribeStadium.rejected, (state, action) => {
      state.subscribeLoading = false;
      state.subscribeError = action.payload;
    });
    builder.addCase(fetchUnSubscribeStadium.pending, (state, action) => {
      state.subscribeLoading = true;
    });
    builder.addCase(fetchUnSubscribeStadium.fulfilled, (state, action) => {
      state.subscribeLoading = false;
    });
    builder.addCase(fetchUnSubscribeStadium.rejected, (state, action) => {
      state.subscribeLoading = false;
      state.subscribeError = action.payload;
    });
  },
});

export const { onSubscribeStadium, onUnSubscribeStadium } =
  subscribeSlice.actions;
export default subscribeSlice.reducer;
