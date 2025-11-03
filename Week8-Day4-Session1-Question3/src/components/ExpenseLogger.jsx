import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseSummary from './ExpenseSummary';

const ExpenseLogger = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    const existingExpense = expenses.find(
      (expense) =>
        expense.userName === newExpense.userName &&
        expense.title === newExpense.title
    );
    if (existingExpense) {
      window.alert(
        'This expense title has already been logged for today by this user.'
      );
      return;
    }
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((expense, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      <h1>Daily Expense Logger</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseSummary expenses={expenses} deleteExpense={deleteExpense} />
    </div>
  );
};

export default ExpenseLogger;