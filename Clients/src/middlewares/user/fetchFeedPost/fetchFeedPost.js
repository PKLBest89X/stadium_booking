import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const fetchFeedPost = createAsyncThunk(
  "post/feed",
  async (data, { rejectWithValue, getState, requestId }) => {
    try {
      const { feedPostLoading, feedPostRequestId } = getState().feedPost;
      if (feedPostLoading !== true && requestId !== feedPostRequestId) {
        return;
      }
      const feedPost = await Axios.get("http://localhost:5050/post/feedPost");
      return feedPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFeedPostOfStadium = createAsyncThunk(
  "post/feedOfStadium",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { postOfStadiumLoading, postOfStadiumRequestId } =
        getState().feedPost;
      if (
        postOfStadiumLoading !== true &&
        requestId !== postOfStadiumRequestId
      ) {
        return;
      }
      const feedOfStadium = await Axios.get(
        `http://localhost:5050/post/feedPostOfStadium/${params}`
      );
      return feedOfStadium.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchFeedPostOfStadiumOnSeleted = createAsyncThunk(
  "post/feedOfStadiumOnSelected",
  async (params, { rejectWithValue, getState, requestId }) => {
    try {
      const { postOnSelectedLoading, postOnSelectedRequestId } =
        getState().feedPost;
      if (
        postOnSelectedLoading !== true &&
        requestId !== postOnSelectedRequestId
      ) {
        return;
      }
      const feedOfStadiumOnSelected = await Axios.get(
        `http://localhost:5050/post/feedPostOfStadium/${params.stadiumId}/${params.postId}`
      );
      return feedOfStadiumOnSelected.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
