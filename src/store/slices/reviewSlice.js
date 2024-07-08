import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const response = await axios.get(`${API_URL}/reviews`);
    return response.data;
});

export const fetchReviewById = createAsyncThunk('reviews/fetchReviewById', async (reviewId) => {
    const response = await axios.get(`${API_URL}/reviews/${reviewId}`);
    return response.data;
});

export const addReview = createAsyncThunk('reviews/addReview', async (review) => {
    const response = await axios.post(`${API_URL}/reviews`, review);
    return response.data;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async (review) => {
    const response = await axios.put(`${API_URL}/reviews/${review.id}`, review);
    return response.data;
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (id) => {
    await axios.delete(`${API_URL}/reviews/${id}`);
    return id;
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        currentReview: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchReviewById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchReviewById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentReview = action.payload;
            })
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.items.findIndex((review) => review.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.items = state.items.filter((review) => review.id !== action.payload);
            });
    },
});

export default reviewsSlice.reducer;
