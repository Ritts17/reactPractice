import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from './expenseSlice';

function ExpenseList() {
  const expenses = useSelector((state) => state.expenses);
  const count = expenses.length
  // console.log(count);
  const totalExpense = expenses.reduce((acc, curr) => {
    return acc + Number(curr.amount)
  }, 0)
  console.log(totalExpense);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Total Expense: ₹{totalExpense} </h2>

      <h3>Expense List</h3>
      <ul>
        {expenses.length == 0 ? (<div>No expenses added yet.</div>) : (
          expenses.map((expense) => (
            <li key={expense.id}>
              <span>{expense.title}</span> - <span>₹{expense.amount}</span>
              <button onClick={() => dispatch(deleteExpense(expense.id))}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ExpenseList;