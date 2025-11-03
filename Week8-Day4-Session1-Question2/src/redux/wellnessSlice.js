import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: []
};

const wellnessSlice = createSlice({
  name: 'wellness',
  initialState,
  reducers: {
    addEntry: (state, action) => {
      state.entries.push(action.payload);
    },
    clearEntries: (state) => {
      state.entries = [];
    }
  }
});

export const { addEntry, clearEntries } = wellnessSlice.actions;
export default wellnessSlice.reducer;