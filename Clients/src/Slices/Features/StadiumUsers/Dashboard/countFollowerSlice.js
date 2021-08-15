import { createSlice } from "@reduxjs/toolkit";
import { fetchCountFollower } from "../../../../middlewares/stadiumUser/fetchDashboard/fetchDashboard";

const initialState = {
  countFollowerLoading: false,
  countFollowerSuccess: null,
  countFollowerData: [],
  countFollowerError: null,
  countFollowerRequestId: undefined,
};

const countFollowerSlice = createSlice({
  name: "countFollower",
  initialState,
  reducers: {},
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
        state.countFollowerData = [];
        state.countFollowerData = action.payload;
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

export default countFollowerSlice.reducer;
