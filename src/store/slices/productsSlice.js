import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3001/allProducts', product);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
