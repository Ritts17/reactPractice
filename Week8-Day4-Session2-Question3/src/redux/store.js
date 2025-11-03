import {configureStore} from '@reduxjs/toolkit';
import ClubReducer from './clubSlice';

const store = configureStore({
    reducer : {
        clubs : ClubReducer
    }
})

export default store;