import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetStadiumDetails,
  fetchAddStadiumDetails,
  fetchUpdateStadiumDetails,
} from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchStadiumDetails";

const initialState = {
  stadiumsLoading: false,
  stadiumsData: [],
  stadiumsDataById: [],
  stadiumsSuccess: null,
  stadiumsRequestId: undefined,
  stadiumsError: null,
  stadiumsAddError: null,
  stadiumsEditError: null,
};

const stadiumDetailsSlice = createSlice({
  name: "stadiumDetails",
  initialState,
  reducers: {
    onUpdateStadiumDetails: (state, { payload }) => {
      state.stadiumsDataById = [];
      state.stadiumsDataById.push(payload);
    },
    onClearError: (state) => {
      state.stadiumsAddError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadiumDetails.pending, (state, action) => {
      state.stadiumsLoading = true;
      if (state.stadiumsLoading === true) {
        state.stadiumsRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadiumDetails.fulfilled, (state, action) => {
      if (
        state.stadiumsLoading === true &&
        state.stadiumsRequestId === action.meta.requestId
      ) {
        state.stadiumsLoading = false;
        state.stadiumsRequestId = undefined;
        state.stadiumsSuccess = true;
        state.stadiumsData = [];
        state.stadiumsData = action.payload;
      }
    });
    builder.addCase(fetchGetStadiumDetails.rejected, (state, action) => {
      if (
        state.stadiumsLoading === true &&
        state.stadiumsRequestId === action.meta.requestId
      ) {
        state.stadiumsLoading = false;
        state.stadiumsRequestId = undefined;
        state.stadiumsSuccess = false;
        state.stadiumsError = action.payload;
      }
    });

    builder.addCase(fetchAddStadiumDetails.pending, (state, action) => {
      state.stadiumsLoading = true;
    });
    builder.addCase(fetchAddStadiumDetails.fulfilled, (state, action) => {
      state.stadiumsLoading = false;
      state.stadiumsSuccess = true;
      state.stadiumsData = [];
      state.stadiumsData = action.payload;
    });
    builder.addCase(fetchAddStadiumDetails.rejected, (state, action) => {
      state.stadiumsLoading = false;
      state.stadiumsAddError = action.payload;
    });
    builder.addCase(fetchUpdateStadiumDetails.pending, (state, action) => {
      state.stadiumsLoading = true;
    });
    builder.addCase(fetchUpdateStadiumDetails.fulfilled, (state, action) => {
      state.stadiumsLoading = false;
      state.stadiumsData = [];
      state.stadiumsData = action.payload;
    });
    builder.addCase(fetchUpdateStadiumDetails.rejected, (state, action) => {
      state.stadiumsLoading = false;
      state.stadiumsEditError = action.payload;
    });
  },
});

export const { onUpdateStadiumDetails, onClearError } =
  stadiumDetailsSlice.actions;
export default stadiumDetailsSlice.reducer;
