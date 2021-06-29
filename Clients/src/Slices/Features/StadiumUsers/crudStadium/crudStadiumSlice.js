import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetStadium,
  fetchAddStadium,
  fetchUpdateStadium,
} from "../../../../middlewares/stadiumUser/fetchCRUDStadium/fetchCRUDStadium";

const initialState = {
  stadiumLoading: false,
  stadiumFetchSuccess: null,
  stadiumData: [],
  stadiumError: null,
  stadiumRequestId: undefined,
};

const crudStadiumSlice = createSlice({
  name: "crudStadium",
  initialState,
  reducers: {
    updateStadium: (state, { payload }) => {
      const foundData = state.stadiumData.find(
        (item) => item.st_id === payload.stadiumId
      );
      if (foundData) {
        state.stadiumData = state.stadiumData.map((items) => ({
          ...items,
          st_id: payload.stadiumId,
          st_name: payload.stadium_name,
          description: payload.description,
          village: payload.stadium_village,
          time_cancelbooking: payload.stadium_timeCancel,
          logo: payload.stadium_logo_name,
          picture: payload.stadium_picture_name,
          status: payload.stadium_status,
          phone: payload.phone,
        }));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetStadium.pending, (state, action) => {
      state.stadiumLoading = true;
      if (state.stadiumLoading === true) {
        state.stadiumRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetStadium.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.stadiumLoading === true &&
        state.stadiumRequestId === requestId
      ) {
        state.stadiumRequestId = undefined;
        state.stadiumLoading = false;
        state.stadiumFetchSuccess = true;
        state.stadiumData = [];
        state.stadiumData = action.payload;
      }
    });
    builder.addCase(fetchGetStadium.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.stadiumLoading === true &&
        state.stadiumRequestId === requestId
      ) {
        state.stadiumRequestId = undefined;
        state.stadiumLoading = false;
        state.stadiumFetchSuccess = false;
        state.stadiumError = action.payload;
      }
    });
    builder.addCase(fetchAddStadium.pending, (state, action) => {
      state.stadiumLoading = true;
    });
    builder.addCase(fetchAddStadium.fulfilled, (state, action) => {
      state.stadiumLoading = false;
      state.stadiumFetchSuccess = action.payload;
    });
    builder.addCase(fetchAddStadium.rejected, (state, action) => {
      state.stadiumLoading = false;
      state.stadiumError = action.payload;
    });
    builder.addCase(fetchUpdateStadium.pending, (state, action) => {
      state.stadiumLoading = true;
    });
    builder.addCase(fetchUpdateStadium.fulfilled, (state, action) => {
      state.stadiumLoading = false;
      state.stadiumFetchSuccess = action.payload;
    });
    builder.addCase(fetchUpdateStadium.rejected, (state, action) => {
      state.stadiumLoading = false;
      state.stadiumError = action.payload;
    });
  },
});

export const { updateStadium } = crudStadiumSlice.actions;
export default crudStadiumSlice.reducer;
