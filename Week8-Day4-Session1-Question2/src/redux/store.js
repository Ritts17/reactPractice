import { configureStore } from '@reduxjs/toolkit';
import wellnessReducer, { addEntry, clearEntries } from './wellnessSlice';

const store = configureStore({
  reducer: wellnessReducer
});

export { addEntry, clearEntries };
export default store;