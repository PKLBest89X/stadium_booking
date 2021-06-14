import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckStadium } from "../../../middlewares/fetchCheckValidData/fetchCheckValidData";

const initialState = {
  checkLoading: false,
  checkResult: null,
};

const validDataSlice = createSlice({
  name: "validData",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCheckStadium.pending]: (state, action) => {
      state.checkLoading = true;
    },
    [fetchCheckStadium.fulfilled]: (state, action) => {
      state.checkLoading = false;
      state.checkResult = action.payload;
    },
    [fetchCheckStadium.rejected]: (state, action) => {
      state.checkLoading = false;
      state.checkResult = action.payload;
    },
  },
});

export default validDataSlice.reducer;
