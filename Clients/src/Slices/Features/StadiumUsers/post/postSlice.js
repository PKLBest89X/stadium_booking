import { createSlice } from "@reduxjs/toolkit";
import { fetchAddPost, fetchUpdatePost, fetchDeletePost } from "../../../../middlewares/stadiumUser/fetchPost/fetchPost";

const initialState = {
    postLoading: false,
    postDatas: [],
    postError: null
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAddPost.pending]: (state, action) => {

        },
        [fetchAddPost.fulfilled]: (state, action) => {

        },
        [fetchAddPost.rejected]: (state, action) => {

        },
        [fetchUpdatePost.pending]: (state, action) => {

        },
        [fetchUpdatePost.fulfilled]: (state, action) => {

        },
        [fetchUpdatePost.rejected]: (state, action) => {

        },
        [fetchDeletePost.pending]: (state, action) => {

        },
        [fetchDeletePost.fulfilled]: (state, action) => {

        },
        [fetchDeletePost.rejected]: (state, action) => {

        },
    },
})

export default postSlice.reducer;