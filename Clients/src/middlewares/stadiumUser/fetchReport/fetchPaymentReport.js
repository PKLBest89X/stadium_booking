import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

// export const fetchGetPaymentByAdmin = createAsyncThunk(
//   "reportPayment/getReportPayment",
//   async (params, { rejectWithValue, getState, requestId }) => {
//     try {
//       const { reportPaymentLoading, reportPaymentRequestId } =
//         getState().reportPayment;
//       if (
//         reportPaymentLoading !== true ||
//         requestId !== reportPaymentRequestId
//       ) {
//         return;
//       }
//       const getReportPayment = await Axios.get(
//         `http://localhost:5050/customer/user/bookingHistory/${params}`
//       );
//       return getReportPayment.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );


export const fetchGetPaymentByAdmin = createAsyncThunk(
  "reportPayment/getReportPayment",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { reportPaymentLoading, reportPaymentRequestId } =
        getState().reportPayment;
      if (reportPaymentLoading !== true || requestId !== reportPaymentRequestId) {
        return;
      }
      const getReportPayment = await Axios.get(
        `http://localhost:5050/report/admin/reportPayment/${params}`
      );
      return getReportPayment.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetStadiumsPaymentByAdmin = createAsyncThunk(
  "reportPayment/getReportStadiumsPayment",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { reportStadiumsLoading, reportStadiumsRequestId } =
        getState().reportPayment;
      if (reportStadiumsLoading !== true || requestId !== reportStadiumsRequestId) {
        return;
      }
      const getReportStadiumsPayment = await Axios.get(
        `http://localhost:5050/report/admin/reportStadiumsPayment/${params}`
      );
      return getReportStadiumsPayment.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetWaterPaymentByAdmin = createAsyncThunk(
    "reportPayment/getReportWaterPayment",
    async (params, { rejectWithValue, getState, requestId }) => {
      try {
        const { reportWaterLoading, reportWaterRequestId } =
          getState().reportPayment;
        if (reportWaterLoading !== true || requestId !== reportWaterRequestId) {
          return;
        }
        const getReportWaterPayment = await Axios.get(
          `http://localhost:5050/report/admin/reportWaterPayment/${params}`
        );
        return getReportWaterPayment.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
