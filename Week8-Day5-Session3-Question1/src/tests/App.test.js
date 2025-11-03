import React from 'react';
import { render, fireEvent, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import UserManagement from '../components/UserManagement';

// Setup mocks
beforeAll(() => {
  global.alert = jest.fn();
});

afterAll(() => {
  global.alert.mockRestore();
});

// 1. Heading is rendered
test('renders_User_Management_System_heading_is_present', () => {
  render(<UserManagement />);
  const heading = screen.getByRole('heading', { name: /User Management System/i });
  expect(heading).toBeInTheDocument();
});

// 2. Initial users are present
test('displays_initial_user_entries_is_present', async () => {
  render(<UserManagement />);
  await waitFor(() => {
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Charlie Davis')).toBeInTheDocument();
  });
});

// 3. Alert on empty form submission
test('displays_alert_if_form_fields_are_empty_when_adding_user', async () => {
  render(<UserManagement />);
  const addBtn = screen.getByText('Add User');
  fireEvent.click(addBtn);
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });
});

// 4. Add new user successfully
test('adds_a_new_user_to_the_list_is_working', async () => {
  render(<UserManagement />);
  fireEvent.change(screen.getByPlaceholderText('Name'), {
    target: { value: 'David Lee' },
  });
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: 'david@example.com' },
  });
  fireEvent.change(screen.getByLabelText('User Role'), {
    target: { value: 'Editor' },
  });
  fireEvent.click(screen.getByText('Add User'));

  await waitFor(() => {
    expect(screen.getByText('David Lee')).toBeInTheDocument();
    expect(screen.getByText('david@example.com')).toBeInTheDocument();
    expect(
      screen.getAllByText('Editor').some((el) => el.tagName === 'TD')
    ).toBe(true);
  });
});

// 5. Component renders in App
test('renders_UserManagement_component_within_App_is_working', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /User Management System/i });
  expect(heading).toBeInTheDocument();
});

// 6. Add User button renders
test('renders_Add_User_button_is_working', () => {
  render(<UserManagement />);
  expect(screen.getByText('Add User')).toBeInTheDocument();
});

// 7. Filter users by role
test('filters_users_by_role_is_working', async () => {
  render(<UserManagement />);
  fireEvent.change(screen.getByLabelText('Filter by Role'), {
    target: { value: 'Editor' },
  });

  await waitFor(() => {
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie Davis')).not.toBeInTheDocument();
  });
});

// 8. Delete a user
test('deletes_a_user_from_the_list_is_working', async () => {
  render(<UserManagement />);
  const bobRow = screen.getByText('Bob Smith').closest('tr');
  expect(bobRow).toBeInTheDocument();
  const deleteButton = within(bobRow).getByText('Delete');
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });
});
