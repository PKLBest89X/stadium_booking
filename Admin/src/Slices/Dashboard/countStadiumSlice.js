import { createSlice } from "@reduxjs/toolkit";
import { fetchCountStadium } from "../../middlewares/fetchDashboard";

const initialState = {
  countStadiumLoading: false,
  countStadiumSuccess: null,
  countStadiumData: [],
  countStadiumError: null,
  countStadiumRequestId: undefined,
};

const countStadiumSlice = createSlice({
  name: "counttStadium",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountStadium.pending, (state, { meta }) => {
      state.countStadiumLoading = true;
      if (state.countStadiumLoading === true) {
        state.countBookingRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountStadium.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countStadiumLoading === true ||
        state.counttStadiumRequestId === requestId
      ) {
        state.countStadiumLoading = false;
        state.countStadiumuccess = true;
        state.countStadiumRequestId = undefined;
        state.countStadiumData = [];
        state.countStadiumData = action.payload;
      }
    });
    builder.addCase(fetchCountStadium.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countStadiumLoading === true ||
        state.countStadiumRequestId === requestId
      ) {
        state.countStadiumgLoading = false;
        state.countStadiumSuccess = false;
        state.countStadiumRequestId = undefined;
        state.countStadiumError = action.payload;
      }
    });
  },
});

export default countStadiumSlice.reducer;
