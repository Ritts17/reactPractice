import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from './expenseSlice';
import { nanoid } from 'nanoid'
function ExpenseForm() {
  const [formData, setFormData] = useState({
    id: nanoid(),
    title: "",
    amount: ""
  })
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount && !parseInt(formData.amount) <= 0) {
      return alert("enter all fields")
      
    }
    console.log('formValidated');
    dispatch(addExpense(formData));
    setFormData({
      id:nanoid(),
      title: "",
      amount: ""
    })
  };
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData(prev=>({
      ...prev,[name]:value
    }))

  }

  const isValid = !formData.amount || parseInt(formData.amount) <= 0;
  console.log(isValid);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter title"
        name='title'
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="number"
        name='amount'
        placeholder="Enter amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <button type="submit" disabled={isValid} >Add Expense</button>
    </form>
  );
}

export default ExpenseForm;