import {configureStore} from '@reduxjs/toolkit';
import ShoppingReducer from './shoppingSlice';

const store = configureStore({
    reducer : {
        shopping : ShoppingReducer
    }
});

export default store;