import { createSlice } from "@reduxjs/toolkit";
import { fetchCountIncome } from "../../../../middlewares/stadiumUser/fetchDashboard/fetchDashboard";
import moment from "moment";

const initialState = {
  countIncomeLoading: false,
  countIncomeSuccess: null,
  countIncomeData: [],
  countIncomeValue: 0,
  countIncomeError: null,
  countIncomeRequestId: undefined,
};

const countIncomeSlice = createSlice({
  name: "countIncome",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountIncome.pending, (state, { meta }) => {
      state.countIncomeLoading = true;
      if (state.countIncomeLoading === true) {
        state.countIncomeRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchCountIncome.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countIncomeLoading === true ||
        state.countIncomeRequestId === requestId
      ) {
        state.countIncomeLoading = false;
        state.countIncomeSuccess = true;
        state.countIncomeRequestId = undefined;
        state.countIncomeData = [];
        state.countIncomeData = action.payload;
        if (state.countIncomeData.length > 0) {
          state.countIncomeValue = state.countIncomeData.reduce(
            (sum, items) => sum + items.total,
            0
          );
        }
      }
    });
    builder.addCase(fetchCountIncome.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.countIncomeLoading === true ||
        state.countIncomeRequestId === requestId
      ) {
        state.countIncomeLoading = false;
        state.countIncomeSuccess = false;
        state.countIncomeRequestId = undefined;
        state.countIncomeError = action.payload;
      }
    });
  },
});

export default countIncomeSlice.reducer;
