import { createSlice } from "@reduxjs/toolkit";
import { fetchCountEmployee } from "../../../../middlewares/stadiumUser/fetchDashboard/fetchDashboard";

const initialState = {
  countEmployeeLoading: false,
  countEmployeeSuccess: null,
  countEmployeeData: [],
  countEmployeeError: null,
  countEmployeeRequestId: undefined,
};

const countEmployeeSlice = createSlice({
  name: "countEmployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountEmployee.pending, (state, { meta }) => {
      state.countEmployeeLoading = true;
      if (state.countEmployeeLoading === true) {
        state.countEmployeeRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountEmployee.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countEmployeeLoading === true ||
        state.countEmployeeRequestId === requestId
      ) {
        state.countEmployeeLoading = false;
        state.countEmployeeSuccess = true;
        state.countEmployeeRequestId = undefined;
        state.countEmployeeData = [];
        state.countEmployeeData = action.payload;
      }
    });
    builder.addCase(fetchCountEmployee.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countEmployeeLoading === true ||
        state.countEmployeeRequestId === requestId
      ) {
        state.countEmployeeLoading = false;
        state.countEmployeeSuccess = false;
        state.countEmployeeRequestId = undefined;
        state.countEmployeeError = action.payload;
      }
    });
  },
});

export default countEmployeeSlice.reducer;
