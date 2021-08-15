import { createSlice } from "@reduxjs/toolkit";
import { fetchCountFollower } from "../../../../middlewares/stadiumUser/fetchDashboard/fetchDashboard";

const initialState = {
  countFollowerLoading: false,
  countFollowerSuccess: null,
  countFollowerData: 0,
  countFollowerError: null,
  countFollowerRequestId: undefined,
};

const countFollowerSlice = createSlice({
  name: "countFollower",
  initialState,
  reducers: {
    onSetCountFollower: (state, { payload }) => {
      state.countFollowerData = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountFollower.pending, (state, { meta }) => {
      state.countFollowerLoading = true;
      if (state.countFollowerLoading === true) {
        state.countFollowerRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountFollower.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countFollowerLoading === true ||
        state.countFollowerRequestId === requestId
      ) {
        state.countFollowerLoading = false;
        state.countFollowerSuccess = true;
        state.countFollowerRequestId = undefined;
      }
    });
    builder.addCase(fetchCountFollower.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countFollowerLoading === true ||
        state.countFollowerRequestId === requestId
      ) {
        state.countFollowerLoading = false;
        state.countFollowerSuccess = false;
        state.countFollowerRequestId = undefined;
        state.countFollowerError = action.payload;
      }
    });
  },
});

export const { onSetCountFollower } = countFollowerSlice.actions;
export default countFollowerSlice.reducer;
