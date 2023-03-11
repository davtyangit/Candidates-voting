import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchComments = createAsyncThunk("comments/FetchComments", async () => {
    try {
        const res = await axios.get('http://localhost:8080/comments')
        const data = res.data
        return data
    }
    catch (error) {
        console.log(error)
    }
})

export const WriteComment = createAsyncThunk("comments/WriteComment", async (newData) => {
    try {
        const res = await axios.post('http://localhost:8080/comments', newData)
        const data = res.data
        return data
    }
    catch (error) {
        console.log(error)
    }
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        loading: false,
        comments: [],
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(FetchComments.pending, (state, action) => {
                state.loading = true
            }).addCase(FetchComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload
            }).addCase(FetchComments.rejected, (state, action) => {
                state.loading = false
            })

            .addCase(WriteComment.pending, (state, action) => {
                state.loading = true
            }).addCase(WriteComment.fulfilled, (state, action) => {
                state.loading = false
            }).addCase(WriteComment.rejected, (state, action) => {
                state.loading = false
            })
    }

})

export default commentsSlice.reducer