import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import store from '../redux/store';

describe('DailyExpenseLogger_Integration_Tests', () => {
  const renderApp = () =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  const generateTestData = () => ({
    userName: `User_${Math.floor(Math.random() * 1000)}`,
    title: `Expense_${Math.floor(Math.random() * 1000)}`,
    amount: `${Math.floor(Math.random() * 1000 + 1)}`
  });

  const fillExpenseForm = ({ userName, title, amount }) => {
    fireEvent.change(screen.getByPlaceholderText(/user name/i), {
      target: { value: userName }
    });
    fireEvent.change(screen.getByPlaceholderText(/expense title/i), {
      target: { value: title }
    });
    fireEvent.change(screen.getByPlaceholderText(/amount/i), {
      target: { value: amount }
    });
    fireEvent.click(screen.getByRole('button', { name: /add expense/i }));
  };

  test('renders_expense_logger_heading', () => {
    renderApp();
    expect(screen.getByText(/daily expense logger/i)).toBeInTheDocument();
  });

  test('shows_error_on_missing_required_fields', () => {
    window.alert = jest.fn();
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /add expense/i }));
    expect(window.alert).toHaveBeenCalledWith('Please fill in all required fields.');
  });

  test('adds_expense_and_displays_in_summary', async () => {
    renderApp();
    const data = generateTestData();
    fillExpenseForm(data);

    const entryItems = await screen.findAllByRole('listitem');
    const matched = entryItems.find(item =>
      item.textContent.includes(data.userName) &&
      item.textContent.includes(data.title) &&
      item.textContent.includes(`₹${data.amount}`)
    );
    expect(matched).toBeInTheDocument();
  });

  test('prevents_duplicate_expense_titles_for_same_user_same_day', () => {
    window.alert = jest.fn();
    renderApp();
    const data = generateTestData();
    fillExpenseForm(data);
    fillExpenseForm(data); // duplicate
    expect(window.alert).toHaveBeenCalledWith(
      'This expense title has already been logged for today by this user.'
    );
  });

  test('allows_multiple_users_to_add_unique_expenses', async () => {
    renderApp();
    const user1 = generateTestData();
    const user2 = generateTestData();
    fillExpenseForm(user1);
    fillExpenseForm(user2);

    const user1Text = await screen.findByText(new RegExp(user1.userName, 'i'));
    const user2Text = await screen.findByText(new RegExp(user2.userName, 'i'));

    expect(user1Text).toBeInTheDocument();
    expect(user2Text).toBeInTheDocument();
  });



  test('form_resets_after_submission', async () => {
    renderApp();
    const data = generateTestData();
    const nameInput = screen.getByPlaceholderText(/user name/i);
    const titleInput = screen.getByPlaceholderText(/expense title/i);
    const amountInput = screen.getByPlaceholderText(/amount/i);
    fillExpenseForm(data);

    await waitFor(() => expect(nameInput.value).toBe(''));
    expect(titleInput.value).toBe('');
    expect(amountInput.value).toBe('');
  });

  test('date_field_is_readonly', () => {
    renderApp();
    const dateField = screen.getByDisplayValue(/\d{4}-\d{2}-\d{2}/);
    expect(dateField).toHaveAttribute('readOnly');
  });

  test('category_field_has_default_value', () => {
    renderApp();
    const category = screen.getByDisplayValue(/food/i);
    expect(category).toBeInTheDocument();
  });

  test('delete_button_removes_expense_entry', async () => {
    renderApp();
    const data = generateTestData();
    fillExpenseForm(data);

    const deleteButtons = await screen.findAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText(new RegExp(data.title, 'i'))).not.toBeInTheDocument();
    });
  });
});
