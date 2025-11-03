import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !title || !amount) {
      alert('Please fill in all required fields.');
      return;
    }
    const newExpense = {
      userName,
      title,
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };
    addExpense(newExpense);
    setUserName('');
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="User Name"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        placeholder="Expense Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <input type="date" value="2025-09-25" readOnly />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;