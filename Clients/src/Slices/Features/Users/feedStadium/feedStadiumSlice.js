import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetStadiumForUser,
  fetchGetAllStadiumForUser,
} from "../../../../middlewares/user/fetchStadium/fetchStadium";

const initialState = {
  feedStadiumLoading: false,
  feedStadiumSuccess: null,
  feedStadiumData: [],
  feedStadiumError: null,
  feedStadiumRequestId: null,
  feedAllStadiumLoading: false,
  feedAllStadiumSuccess: null,
  feedAllStadiumData: [],
  feedAllStadiumError: null,
  feedAllStadiumRequestId: undefined,
  searchStadiumValue: "",
  searchResultData: [],
};

const feedStadiumSlice = createSlice({
  name: "feedStadium",
  initialState,
  reducers: {
    onSearchChange: (state, { payload }) => {
      state.searchStadiumValue = payload;
      let arraySearch = [];
      arraySearch = state.feedAllStadiumData.filter(
        (items) =>
          items.st_name.toUpperCase().includes(payload.toUpperCase()) ||
          items.description.includes(payload)
      );
      if (arraySearch.length > 0) {
        state.feedAllStadiumSuccess = true;
        state.searchResultData = arraySearch;
      } else {
        state.feedAllStadiumSuccess = false;
        state.searchResultData = [];
      }
    },
  },
  extraReducers: (builder) => {
    //ເອົາຂໍ້ມູນເດີ່ນທັງໝົດມາ
    builder.addCase(fetchGetAllStadiumForUser.pending, (state, { meta }) => {
      state.feedAllStadiumLoading = true;
      if (state.feedAllStadiumLoading === true) {
        state.feedAllStadiumRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchGetAllStadiumForUser.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.feedAllStadiumLoading === true ||
        state.feedAllStadiumRequestId === requestId
      ) {
        state.feedAllStadiumLoading = false;
        state.feedAllStadiumSuccess = true;
        state.feedAllStadiumRequestId = undefined;
        state.feedAllStadiumData = [];
        state.feedAllStadiumData = action.payload;
      }
    });
    builder.addCase(fetchGetAllStadiumForUser.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.feedAllStadiumLoading === true ||
        state.feedAllStadiumRequestId === requestId
      ) {
        state.feedAllStadiumLoading = false;
        state.feedAllStadiumSuccess = false;
        state.feedAllStadiumRequestId = undefined;
        state.feedAllStadiumError = action.payload;
      }
    });

    //ເອົາຂໍ້ມູນສະເພາະເດີ່ນ
    builder.addCase(fetchGetStadiumForUser.pending, (state, { meta }) => {
      state.feedStadiumLoading = true;
      if (state.feedStadiumLoading === true) {
        state.feedStadiumRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumForUser.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.feedStadiumLoading === true ||
        state.feedStadiumRequestId === requestId
      ) {
        state.feedStadiumLoading = false;
        state.feedStadiumSuccess = true;
        state.feedStadiumRequestId = undefined;
        state.feedStadiumData = [];
        state.feedStadiumData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumForUser.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.feedStadiumLoading === true ||
        state.feedStadiumRequestId === requestId
      ) {
        state.feedStadiumLoading = false;
        state.feedStadiumSuccess = false;
        state.feedStadiumRequestId = undefined;
        state.feedStadiumError = action.payload;
      }
    });
  },
});

export const { onSearchChange } = feedStadiumSlice.actions;
export default feedStadiumSlice.reducer;
