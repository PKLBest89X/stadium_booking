import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetStadiumPrice,
  fetchAddStadiumPrice,
  fetchUpdateStadiumPrice,
} from "../../../../middlewares/stadiumUser/fetchCRUDStadiumPrice/fetchCRUDStadiumPrice";

const initialState = {
  addPriceLoading: false,
  priceData: [],
  addPriceError: null,
};

const stadiumDetailsSlice = createSlice({
  name: "stadiumPrice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadiumPrice.pending, (state, action) => {
      state.postLoading = true;
      if (state.postLoading === true) {
        state.postRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumPrice.fulfilled, (state, action) => {
      if (
        state.postLoading === true &&
        state.postRequestId === action.meta.requestId
      ) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = true;
        state.postsData = [];
        state.postsData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumPrice.rejected, (state, action) => {
      if (
        state.postLoading === true &&
        state.postRequestId === action.meta.requestId
      ) {
        state.postLoading = false;
        state.postRequestId = undefined;
        state.postSuccess = false;
        state.postError = action.payload;
      }
    });

    builder.addCase(fetchAddStadiumPrice.pending, (state, action) => {
      state.addPriceLoading = true;
    });
    builder.addCase(fetchAddStadiumPrice.fulfilled, (state, action) => {
      state.addDrinkLoading = false;
      state.priceData.push(action.payload);
    });
    builder.addCase(fetchAddStadiumPrice.rejected, (state, action) => {
      state.addPriceLoading = false;
      state.addPriceError = action.payload;
    });
    builder.addCase(fetchUpdateStadiumPrice.pending, (state, action) => {});
    builder.addCase(fetchUpdateStadiumPrice.fulfilled, (state, action) => {});
    builder.addCase(fetchUpdateStadiumPrice.rejected, (state, action) => {});
  },
});

export default stadiumDetailsSlice.reducer;
