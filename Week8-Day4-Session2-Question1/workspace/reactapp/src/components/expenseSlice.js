import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
      console.log(current(state));

    },
    deleteExpense: (state, action) => {
      return state.filter((expense) => expense.id !== action.payload);
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;