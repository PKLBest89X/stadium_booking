import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetAllStadiumOwner,
  addStadiumOwner,
} from "../middlewares/fetchStadiumOwner";

const initialState = {
  stadiumOwnerLoading: false,
  stadiumOwnerData: [],
  stadiumOwnerError: null,
  stadiumOwnerSuccess: null,
  stadiumOwnerRequestId: undefined,
  stadiumAddLoading: false,
};

const crudStadiumOwnerSlice = createSlice({
  name: "stadiumOwner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //ການສົ່ງ request ໃນການເອົາຂໍ້ມູນການຈອງທີ່ຍັງບໍ່ໄດ້ຈ່າຍ, ແຕ່ຈອງແລ້ວ

    builder.addCase(fetchGetAllStadiumOwner.pending, (state, action) => {
      state.stadiumOwnerLoading = true;
      if (state.stadiumOwnerLoading === true) {
        state.stadiumOwnerRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetAllStadiumOwner.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.stadiumOwnerLoading === true &&
        state.stadiumOwnerRequestId === requestId
      ) {
        state.stadiumOwnerSuccess = true;
        state.stadiumOwnerLoading = false;
        state.stadiumOwnerRequestId = undefined;
        state.stadiumOwnerData = [];
        state.stadiumOwnerData = action.payload;
      }
    });
    builder.addCase(fetchGetAllStadiumOwner.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.stadiumOwnerLoading === true &&
        state.stadiumOwnerRequestId === requestId
      ) {
        state.stadiumOwnerLoading = false;
        state.stadiumOwnerSuccess = false;
        state.stadiumOwnerRequestId = undefined;
        state.stadiumOwnerError = action.payload;
      }
    });

    //ເພີ່ມເຈົ້າຂອງເດີ່ນ
    builder.addCase(addStadiumOwner.pending, (state, action) => {
      state.stadiumOwnerLoading = true;
    });
    builder.addCase(addStadiumOwner.fulfilled, (state, action) => {
      state.stadiumAddLoading = false;
      state.stadiumOwnerSuccess = true;
      state.stadiumOwnerData = [];
      state.stadiumOwnerData = action.payload;
    });
    builder.addCase(addStadiumOwner.rejected, (state, action) => {
      state.stadiumAddLoading = false;
      state.stadiumOwnerSuccess = false;
      state.stadiumOwnerError = action.payload;
    });
  },
});

export default crudStadiumOwnerSlice.reducer;
