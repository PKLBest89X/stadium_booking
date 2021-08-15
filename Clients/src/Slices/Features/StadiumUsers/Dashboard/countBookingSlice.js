import { createSlice } from "@reduxjs/toolkit";
import { fetchCountBooking } from "../../../../middlewares/stadiumUser/fetchDashboard/fetchDashboard";

const initialState = {
  countBookingLoading: false,
  countBookingSuccess: null,
  countBookingData: [],
  countBookingError: null,
  countBookingRequestId: undefined,
  countBookingNumber: 0,
  countBookingType: {
    web: 0,
    phone: 0,
  },
};

const countBookingSlice = createSlice({
  name: "countBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountBooking.pending, (state, { meta }) => {
      state.countBookingLoading = true;
      if (state.countBookingLoading === true) {
        state.countBookingRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountBooking.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countBookingLoading === true ||
        state.countBookingRequestId === requestId
      ) {
        state.countBookingLoading = false;
        state.countBookingSuccess = true;
        state.countBookingRequestId = undefined;
        state.countBookingData = [];
        state.countBookingData = action.payload;
        state.countBookingNumber = state.countBookingData.length;
        let filterByWebType = state.countBookingData.filter(
          (items) => items.profile !== "ໂທຈອງ"
        );
        if (filterByWebType.length > 0) {
          state.countBookingType.web = filterByWebType.length;
        }
        let filterByPhoneType = state.countBookingData.filter(
          (items) => items.profile === "ໂທຈອງ"
        );
        if (filterByPhoneType.length > 0) {
          state.countBookingType.phone = filterByPhoneType.length;
        }
      }
    });
    builder.addCase(fetchCountBooking.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countBookingLoading === true ||
        state.countBookingRequestId === requestId
      ) {
        state.countBookingLoading = false;
        state.countBookingSuccess = false;
        state.countBookingRequestId = undefined;
        state.countBookingError = action.payload;
      }
    });
  },
});

export default countBookingSlice.reducer;
