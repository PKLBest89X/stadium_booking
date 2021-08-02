import { createSlice } from "@reduxjs/toolkit";
import { fetchGetWaterForPayment } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";

const initialState = {
  waterLoading: false,
  watersData: [],
  waterSuccess: null,
  waterError: null,
  waterRequestId: undefined,
};

const getDrinksSlice = createSlice({
  name: "getDrinks",
  initialState,
  reducers: {
    onClearWater: (state) => {
      state.watersData = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetWaterForPayment.pending, (state, action) => {
      state.waterLoading = true;
      if (state.waterLoading === true) {
        state.waterRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetWaterForPayment.fulfilled, (state, action) => {
      if (
        state.waterLoading === true &&
        state.waterRequestId === action.meta.requestId
      ) {
        state.waterLoading = false;
        state.waterRequestId = undefined;
        state.waterSuccess = true;
        state.watersData = [];
        state.watersData = action.payload;
      }
    });
    builder.addCase(fetchGetWaterForPayment.rejected, (state, action) => {
      if (
        state.waterLoading === true &&
        state.waterRequestId === action.meta.requestId
      ) {
        state.waterLoading = false;
        state.waterRequestId = undefined;
        state.waterSuccess = false;
        state.waterError = action.payload;
        state.watersData = [];
      }
    });
  },
});

export const { onClearWater } = getDrinksSlice.actions;
export default getDrinksSlice.reducer;
