import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckPayment } from "../../../middlewares/fetchCheckValidData/fetchCheckValidPayment";

const initialState = {
  checkPaymentLoading: false,
  checkPaymentResult: null,
};

const validBookingDataSlice = createSlice({
  name: "validPaymentData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckPayment.pending, (state, action) => {
      state.checkPaymentLoading = true;
    });
    builder.addCase(fetchCheckPayment.fulfilled, (state, action) => {
      state.checkPaymentLoading = false;
      state.checkPaymentResult = action.payload;
    });
    builder.addCase(fetchCheckPayment.rejected, (state, action) => {
      state.checkPaymentLoading = false;
      state.checkPaymentResult = action.payload;
    });
  },
});

export default validBookingDataSlice.reducer;