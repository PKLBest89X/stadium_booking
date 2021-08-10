import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetBookingByAdmin = createAsyncThunk(
  "reportBooking/getReportBooking",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { reportBookingLoading, reportBookingRequestId } =
        getState().reportBooking;
      if (
        reportBookingLoading !== true ||
        requestId !== reportBookingRequestId
      ) {
        return;
      }
      const getReportBooking = await Axios.get(
        `http://localhost:5050/report/admin/reportBooking/${params}`
      );
      return getReportBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const fetchGetBookingPaidByAdmin = createAsyncThunk(
//   "reportbooking/getReportBookingPaid",
//   async (params, { rejectWithValue, getState, requestId }) => {
//     try {
//       const { reportPaidLoading, reportPaidRequestId } = getState().ReportBooking;
//       if (reportPaidLoading !== true || requestId !== reportPaidRequestId) {
//         return;
//       }
//       const getReportBookingPaid = await Axios.get(
//         `http://localhost:5050/report/admin/reportBooking_paid/${params}`
//       );
//       return getReportBookingPaid.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchGetBookingUnPaidByAdmin = createAsyncThunk(
//   "reportBooking/getReportBookingUnPaid",
//   async (params, { rejectWithValue, getState, requestId }) => {
//     try {
//       const { reportUnPaidLoading, reportUnPaidRequestId } =
//         getState().ReportBooking;
//       if (reportUnPaidLoading !== true || requestId !== reportUnPaidRequestId) {
//         return;
//       }
//       const getReportBookingUnPaid = await Axios.get(
//         `http://localhost:5050/report/admin/reportBooking_unPaid/${params}`
//       );
//       return getReportBookingUnPaid.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );
