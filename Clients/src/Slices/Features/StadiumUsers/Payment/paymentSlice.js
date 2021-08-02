import { createSlice } from "@reduxjs/toolkit";
import { fetchAddPayment } from "../../../../middlewares/stadiumUser/fetchPayment/fetchPayment";

const initialState = {
  paymentLoading: false,
  paymentSuccess: null,
  paymentData: [],
  paymentError: null,
  paymentRequestId: undefined,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddPayment.pending, (state, action) => {
      state.paymentLoading = true;
    });
    builder.addCase(fetchAddPayment.fulfilled, (state, action) => {
      state.paymentSuccess = true;
      state.paymentLoading = false;
      state.paymentData = [];
      state.paymentData = action.payload;
    });
    builder.addCase(fetchAddPayment.rejected, (state, action) => {
      state.paymentLoading = false;
      state.paymentSuccess = false;
      state.paymentError = action.payload;
    });
  },
});

export default paymentSlice.reducer;
