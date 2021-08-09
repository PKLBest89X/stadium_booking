import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";


export const fetchBookingListNonAccount = createAsyncThunk(
  "preBookingNonAccount/getBookingListNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { preBookingDetailsLoading, preBookingDetailsRequestId } =
        getState().preBookingNonAccount;
      if (
        preBookingDetailsLoading !== true ||
        requestId !== preBookingDetailsRequestId
      ) {
        return;
      }
      const getBookingListNonAccount = await Axios.get(
        `http://localhost:5050/reserve/bookingNonAccount_getBookingList/${params}`
      );
      return getBookingListNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const  fetchBookingListDetailsNonAccount = createAsyncThunk(
  "preBookingNonAccount/getBookingDetailsListNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { preBookingNonAccountDetailsLoading, preBookingNonAccountDetailsRequestId } =
        getState().preBookingNonAccount;
      if (
        preBookingNonAccountDetailsLoading !== true ||
        requestId !== preBookingNonAccountDetailsRequestId
      ) {
        return;
      }
      const getBookingDetailsListNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getBookingDetailsNonAccountList/${params}`
      );
      return getBookingDetailsListNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetStadiumsToBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/getStadiumsToBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const {
        bookingStadiumsNonAccountLoading,
        bookingStadiumsNonAccountRequestId,
      } = getState().getStadiumsNonAccount;
      if (
        bookingStadiumsNonAccountLoading !== true ||
        requestId !== bookingStadiumsNonAccountRequestId
      ) {
        return;
      }
      const getStadiumsToBookingNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getStadiumDetailsToBookingForNonAccount/${params}`
      );
      return getStadiumsToBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetTimesToBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/getTimesToBookingNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { bookingTimesNonAccountLoading, bookingTimesNonAccountRequestId } =
        getState().getTimesNonAccount;
      if (
        bookingTimesNonAccountLoading !== true ||
        requestId !== bookingTimesNonAccountRequestId
      ) {
        return;
      }
      const getTimesToBookingNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getPriceToBookingForNonAccount/${params}`
      );
      return getTimesToBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetBookingDetailsUnCheckoutNonAccount = createAsyncThunk(
  "bookingNonAccount/getBookingDetailsUnCheckoutNonAccount",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const {
        bookingUnCheckoutNonAccountLoading,
        bookingUnCheckoutNonAccountRequestId,
      } = getState().getTimesNonAccount;
      if (
        bookingUnCheckoutNonAccountLoading !== true ||
        requestId !== bookingUnCheckoutNonAccountRequestId
      ) {
        return;
      }
      const getBookingDetailsUnCheckoutNonAccount = await Axios.get(
        `http://localhost:5050/reserve/getBookingDetailsUnCheckoutForNonAccount/${params}`
      );
      return getBookingDetailsUnCheckoutNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/addNewBookingNonAccount",
  async (token, { rejectWithValue }) => {
    try {
      const addBookingNonAccount = await Axios.post(
        `http://localhost:5050/reserve/bookingForNonAccount/`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return addBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddBookingFieldsNonAccount = createAsyncThunk(
  "bookingNonAccount/addBookingFieldsNonAccount",
  async (details, { rejectWithValue }) => {
    try {
      const addBookingFieldsNonAccount = await Axios.post(
        `http://localhost:5050/reserve/bookingfield`,
        {
          data: details,
        }
      );
      return addBookingFieldsNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddUserNonAccount = createAsyncThunk(
  "bookingNonAccount/addUserNonAccount",
  async (nonAccount, { rejectWithValue }) => {
    try {
      const addUserNonAccount = await Axios.post(
        `http://localhost:5050/reserve/addNonAccountData/${nonAccount.bookingId}`,
        {
          name: nonAccount.firstName,
          surname: nonAccount.lastName,
          team: nonAccount.team,
          tel: nonAccount.tel
        }
      );
      return addUserNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchConfirmBookingNonAccount = createAsyncThunk(
  "bookingNonAccount/conformBookingNonAccount",
  async (params, { rejectWithValue }) => {
    try {
      const conformBookingNonAccount = await Axios.put(
        `http://localhost:5050/reserve/acceptForNonAccount/${params.stadiumId}/${params.bookingId}`
      );
      return conformBookingNonAccount.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
