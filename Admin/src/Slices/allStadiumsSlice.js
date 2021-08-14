import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetAllStadiums,
  fetchGetAvailableStadiums,
  fetchGetNotAvailableStadiums,
} from "../middlewares/fetchAllStadiums";

const initialState = {
  allStadiumsLoading: false,
  allStadiumsSuccess: null,
  allStadiumsData: [],
  allStadiumsError: null,
  allStadiumsRequestId: undefined,
  availableLoading: false,
  availableSuccess: null,
  availableData: [],
  availableError: null,
  availbleRequestId: undefined,
  notAvailableLoading: false,
  notAvailableSuccess: null,
  notAvailableData: [],
  notAvailableError: null,
  notAvailbleRequestId: undefined,
  stadiumInfo: {
    stadiumId: "",
    stadiumName: "",
    managerName: "",
    managerSurname: "",
    village: "",
    district: "",
    province: "",
    regisDate: "",
    logo: "",
    phone: "",
    status: "",
  },
};

const allStadiumsSlice = createSlice({
  name: "allStadiums",
  initialState,
  reducers: {
    onShowStadiumdetails: (state, { payload }) => {
      state.stadiumInfo = {
        ...state.stadiumInfo,
        stadiumId: payload.st_id,
        stadiumName: payload.st_name,
        managerName: payload.su_name,
        managerSurname: payload.su_surname,
        village: payload.village,
        district: payload.district,
        province: payload.province,
        regisDate: payload.regis_date,
        logo: payload.logo,
        phone: payload.phone,
        status: payload.status,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetAllStadiums.pending, (state, { meta }) => {
      state.allStadiumsLoading = true;
      if (state.allStadiumsLoading === true) {
        state.allStadiumsRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchGetAllStadiums.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.allStadiumsLoading === true ||
        state.allStadiumsRequestId === requestId
      ) {
        state.allStadiumsLoading = false;
        state.allStadiumsSuccess = true;
        state.allStadiumsRequestId = undefined;
        state.allStadiumsData = [];
        state.allStadiumsData = action.payload;
      }
    });
    builder.addCase(fetchGetAllStadiums.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.allStadiumsLoading === true ||
        state.allStadiumsRequestId === requestId
      ) {
        state.allStadiumsLoading = false;
        state.allStadiumsSuccess = false;
        state.allStadiumsRequestId = undefined;
        state.allStadiumsError = action.payload;
      }
    });

    //ເດີ່ນທີ່ພ້ອມໃຫ້ໃຊ້ງານ
    builder.addCase(fetchGetAvailableStadiums.pending, (state, { meta }) => {
      state.availableLoading = true;
      if (state.availableLoading === true) {
        state.availbleRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchGetAvailableStadiums.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.availableLoading === true ||
        state.availbleRequestId === requestId
      ) {
        state.availableLoading = false;
        state.availableSuccess = true;
        state.availbleRequestId = undefined;
        state.availableData = [];
        state.availableData = action.payload;
      }
    });
    builder.addCase(fetchGetAvailableStadiums.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.availableLoading === true ||
        state.availbleRequestId === requestId
      ) {
        state.availableLoading = false;
        state.availableSuccess = false;
        state.availbleRequestId = undefined;
        state.availableError = action.payload;
      }
    });

    //ເດີ່ນທີ່ບໍ່ພ້ອມໃຊ້ງານ
    builder.addCase(fetchGetNotAvailableStadiums.pending, (state, { meta }) => {
      state.notAvailableLoading = true;
      if (state.notAvailableLoading === true) {
        state.notAvailbleRequestId = meta.requestId;
      }
    });
    builder.addCase(fetchGetNotAvailableStadiums.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.notAvailableLoading === true ||
        state.notAvailbleRequestId === requestId
      ) {
        state.notAvailableLoading = false;
        state.notAvailableSuccess = true;
        state.notAvailbleRequestId = undefined;
        state.notAvailableData = [];
        state.notAvailableData = action.payload;
      }
    });
    builder.addCase(fetchGetNotAvailableStadiums.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.notAvailableLoading === true ||
        state.notAvailbleRequestId === requestId
      ) {
        state.notAvailableLoading = false;
        state.notAvailableSuccess = false;
        state.notAvailbleRequestId = undefined;
        state.notAvailableError = action.payload;
      }
    });
  },
});

export const { onShowStadiumdetails } = allStadiumsSlice.actions;
export default allStadiumsSlice.reducer;
