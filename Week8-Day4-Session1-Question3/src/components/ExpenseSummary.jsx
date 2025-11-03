import React from 'react';

const ExpenseSummary = ({ expenses, deleteExpense }) => {
  return (
    <ul>
      {expenses.map((expense, index) => (
        <li key={index}>
          {expense.userName} - {expense.title} - ₹{expense.amount} - {expense.category} -
          <button onClick={() => deleteExpense(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseSummary;