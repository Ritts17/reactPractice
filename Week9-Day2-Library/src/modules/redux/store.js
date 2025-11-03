import { configureStore } from "@reduxjs/toolkit";
import bookReducer from '../books/redux/bookSlice';

const store = configureStore({
    reducer : {
        books : bookReducer
    }
});

export default store;