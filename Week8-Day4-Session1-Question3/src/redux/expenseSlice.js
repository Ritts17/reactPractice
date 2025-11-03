import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push({ ...action.payload, id: Date.now() });
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;