import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import store from '../components/store';
import expenseReducer, { addExpense, deleteExpense } from '../components/expenseSlice';
import App from '../App';

describe('ExpenseApp Integration Tests', () => {
  const renderExpenseApp = () => {
    return render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  };

  test('expense_app_renders_with_heading', () => {
    renderExpenseApp();
    const heading = screen.getByText(/expense tracker/i);
    expect(heading).toBeInTheDocument();
  });

  test('expense_app_adds_new_expense', () => {
    renderExpenseApp();
  
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    const addButton = screen.getByRole('button', { name: /add expense/i });
  
    fireEvent.change(titleInput, { target: { value: 'Grocery' } });
    fireEvent.change(amountInput, { target: { value: '150' } });
    fireEvent.click(addButton);
  
    expect(screen.getByText('Grocery')).toBeInTheDocument();
  
    const rupeeTexts = screen.getAllByText((_, el) => el.textContent === '₹150');
    expect(rupeeTexts.length).toBeGreaterThan(0);
  });
  
  test('expense_app_does_not_add_invalid_amount', () => {
    renderExpenseApp();

    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    const addButton = screen.getByRole('button', { name: /add expense/i });

    fireEvent.change(titleInput, { target: { value: 'Invalid' } });
    fireEvent.change(amountInput, { target: { value: '-100' } });
    expect(addButton).toBeDisabled();
  });

  test('expense_app_deletes_expense', () => {
    renderExpenseApp();

    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    const addButton = screen.getByRole('button', { name: /add expense/i });

    fireEvent.change(titleInput, { target: { value: 'To Be Deleted' } });
    fireEvent.change(amountInput, { target: { value: '200' } });
    fireEvent.click(addButton);

    expect(screen.getByText('To Be Deleted')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[deleteButtons.length - 1]);

    expect(screen.queryByText('To Be Deleted')).toBeNull();
  });


  test('expense_slice_adds_expense', () => {
    const initialState = [];
    const action = addExpense({ title: 'Electricity', amount: 300 });
    const newState = expenseReducer(initialState, action);

    expect(newState.length).toBe(1);
    expect(newState[0].title).toBe('Electricity');
    expect(newState[0].amount).toBe(300);
  });

  test('expense_slice_deletes_expense', () => {
    const initialState = [
      { id: 1, title: 'A', amount: 50 },
      { id: 2, title: 'B', amount: 100 }
    ];
    const action = deleteExpense(1);
    const newState = expenseReducer(initialState, action);

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe(2);
  });
});
