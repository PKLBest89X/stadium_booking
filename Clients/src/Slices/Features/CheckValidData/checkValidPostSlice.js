import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckPost } from "../../../middlewares/fetchCheckValidData/fetchCheckValidPost";

const initialState = {
  checkPostLoading: false,
  checkPostResult: null,
};

const validPostDataSlice = createSlice({
  name: "validPostData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCheckPost.pending, (state, action) => {
      state.checkPostLoading = true;
    });
    builder.addCase(fetchCheckPost.fulfilled, (state, action) => {
      state.checkPostLoading = false;
      state.checkPostResult = action.payload;
    });
    builder.addCase(fetchCheckPost.rejected, (state, action) => {
      state.checkPostLoading = false;
      state.checkPostResult = action.payload;
    });
  },
});

export default validPostDataSlice.reducer;