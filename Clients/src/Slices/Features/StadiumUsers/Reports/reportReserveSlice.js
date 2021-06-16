import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportReserveLoading: false,
  reportReserveData: [],
  activeStep: 0,
  reportReserveError: null,
};

const reportReserveSlice = createSlice({
  name: "reportReserve",
  initialState,
  reducers: {
    handleNext: (state, action) => {
      state.activeStep += 1;
    },
    handleBack: (state, action) => {
      state.activeStep -= 1;
    },
    handleStepChange: (state, action) => {
      state.activeStep = action.payload;
    },
  },
  extraReducers: {},
});
export const { handleNext, handleBack, handleStepChange} = reportReserveSlice.actions;
export default reportReserveSlice.reducer;
