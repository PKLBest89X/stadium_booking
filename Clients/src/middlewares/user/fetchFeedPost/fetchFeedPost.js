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
      const feedPost = await Axios.get(
        "http://localhost:5050/post/feedPost"
      );
      return feedPost.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
