import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchGetActiveApproveBooking = createAsyncThunk(
  "bookingNonAccount/getActiveApproveBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { activeApproveLoading, activeApproveRequestId } =
        getState().preBookingNonAccount;
      if (
        activeApproveLoading !== true ||
        requestId !== activeApproveRequestId
      ) {
        return;
      }
      const getActiveApproveBooking = await Axios.get(
        `http://localhost:5050/reserve/getActiveApprovingBooking/${params}`
      );
      return getActiveApproveBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetUnActiveApproveBooking = createAsyncThunk(
  "bookingNonAccount/getUnActiveApproveBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { unActiveApproveLoading, unActiveApproveRequestId } =
        getState().preBookingNonAccount;
      if (
        unActiveApproveLoading !== true ||
        requestId !== unActiveApproveRequestId
      ) {
        return;
      }
      const getUnActiveApproveBooking = await Axios.get(
        `http://localhost:5050/reserve/getUnActiveApprovingBooking/${params}`
      );
      return getUnActiveApproveBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetVoidBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/getVoidBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { voidBookingNonAccountLoading, voidBookingNonAccountRequestId } =
        getState().preBookingNonAccount;
      if (
        voidBookingNonAccountLoading !== true ||
        requestId !== voidBookingNonAccountRequestId
      ) {
        return;
      }
      const getVoidBookingNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getVoidBookingNonAccount/${params}`
      );
      return getVoidBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchApproveBookingSubStatus = createAsyncThunk(
  "bookingNonAccount/approveBookingSubStatus",
  async (details, { rejectWithValue }) => {
    try {
      const approveBookingSubStatus = await Axios.put(
        `http://localhost:5050/reserve/approveBooking/updateBookingSubStatus`,
        {
          data: details,
        }
      );
      return approveBookingSubStatus.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchConfirmApprovingBooking = createAsyncThunk(
  "bookingNonAccount/confirmApprovingBooking",
  async (data, { rejectWithValue }) => {
    try {
      const confirmApprovingBooking = await Axios.put(
        `http://localhost:5050/reserve/confirmApprovingBooking/${data.stadiumId}/${data.requestData.bookingId}`,
        {
          deposit_price: data.requestData.totalDeposit,
        }
      );
      return confirmApprovingBooking.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
