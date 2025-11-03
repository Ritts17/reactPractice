import React from 'react';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
}

export default App;