import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import reviewReducer from './slices/reviewSlice';


export const store = configureStore({
    reducer: {
        products: productsReducer,
        reviews: reviewReducer,
    },
});
