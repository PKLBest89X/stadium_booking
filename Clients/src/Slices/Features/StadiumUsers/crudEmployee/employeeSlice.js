import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetEmployee,
  fetchAddEmployee,
  fetchUpdateEmployee,
} from "../../../../middlewares/stadiumUser/fetchCRUDEmployee/fetchCRUDEmployee";

const initialState = {
  employeeLoading: false,
  employeeFetchSuccess: null,
  employeesData: [],
  employeeDataSortByDate: [],
  employeeError: null,
  employeeRequestId: undefined,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetEmployee.pending, (state, action) => {
      state.employeeLoading = true;
      if (state.employeeLoading === true) {
        state.employeeRequestId = action.meta.requestId;
      }
    });
    builder.addCase(fetchGetEmployee.fulfilled, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.employeeLoading === true &&
        state.employeeRequestId === requestId
      ) {
        state.employeeLoading = false;
        state.employeeRequestId = undefined;
        
        state.employeeFetchSuccess = true;
        state.employeesData = [];
        state.employeesData = action.payload;
        let slicePayload = action.payload.slice(0, 6);
        let newSort = slicePayload.sort(
          (a, b) => (new Date(a["regis_date"]) - new Date(b["regis_date"])) * -1
        );
        state.employeeDataSortByDate = newSort;
      }
    });
    builder.addCase(fetchGetEmployee.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (
        state.employeeLoading === true &&
        state.employeeRequestId === requestId
      ) {
        state.employeeLoading = false;
        state.employeeFetchSuccess = false;
        state.employeeRequestId = undefined;
        state.employeeError = action.payload;
      }
    });
    builder.addCase(fetchAddEmployee.pending, (state, action) => {
      state.employeeLoading = true;
    });
    builder.addCase(fetchAddEmployee.fulfilled, (state, action) => {
      state.employeeLoading = false;
      state.employeeFetchSuccess = true;
      state.employeesData = [];
      state.employeesData = action.payload;
      state.employeeDataSortByDate = [];
      let slicePayload = action.payload.slice(0, 6);
      let newSort = slicePayload.sort(
        (a, b) => (new Date(a["regis_date"]) - new Date(b["regis_date"])) * -1
      );
      state.employeeDataSortByDate = newSort;
    });
    builder.addCase(fetchAddEmployee.rejected, (state, action) => {
      state.employeeLoading = false;
      state.employeeError = action.payload;
    });
    builder.addCase(fetchUpdateEmployee.pending, (state, action) => {});
    builder.addCase(fetchUpdateEmployee.fulfilled, (state, action) => {});
    builder.addCase(fetchUpdateEmployee.rejected, (state, action) => {});
  },
});

export default employeeSlice.reducer;
