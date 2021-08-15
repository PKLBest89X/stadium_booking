import { createSlice } from "@reduxjs/toolkit";
import { fetchCountStadiumOwner } from "../../middlewares/fetchDashboard";

const initialState = {
  countStadiumOwnerLoading: false,
  countStadiumOwnerSuccess: null,
  countStadiumOwnerData: [],
  countStadiumOwnerError: null,
  countStadiumOwnerRequestId: undefined,
};

const countStadiumOwnerSlice = createSlice({
  name: "countStadiumOwner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountStadiumOwner.pending, (state, { meta }) => {
      state.countStadiumOwnerLoading = true;
      if (state.countStadiumOwnerLoading === true) {
        state.countBookingRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountStadiumOwner.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countStadiumOwnerLoading === true ||
        state.countBookingRequestId === requestId
      ) {
        state.countStadiumOwnerLoading = false;
        state.countStadiumOwnerSuccess = true;
        state.countStadiumOwnerRequestId = undefined;
        state.countStadiumOwnerData = [];
        state.countStadiumOwnerData = action.payload;
      }
    });
    builder.addCase(fetchCountStadiumOwner.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countStadiumOwnerLoading === true ||
        state.countStadiumOwnerRequestId === requestId
      ) {
        state.countStadiumOwnerLoading = false;
        state.countStadiumOwnerSuccess = false;
        state.countStadiumOwnerRequestId = undefined;
        state.countStadiumOwnerError = action.payload;
      }
    });
  },
});

export default countStadiumOwnerSlice.reducer;
