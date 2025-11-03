// StudentRegistrationForm.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentRegistrationForm from '../components/StudentRegistrationForm';

describe('StudentRegistrationForm', () => {
  // Helper to fill base valid fields (Hostel = No)
  const fillValidForm = async () => {
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'Jane Doe');
    await userEvent.type(screen.getByLabelText(/Email/i), 'jane@example.com');
    await userEvent.type(screen.getByLabelText(/Date of Birth/i), '1995-04-10');
    await userEvent.type(screen.getByLabelText(/Phone Number/i), '9876543210');
    await userEvent.selectOptions(screen.getByLabelText(/Gender/i), 'Female');
    await userEvent.selectOptions(screen.getByLabelText(/Course/i), 'BCA');
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'securepass');
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'securepass');
    await userEvent.selectOptions(screen.getByLabelText(/Hostel Required/i), 'No');
  };

  test('renders the form correctly', () => {
    render(<StudentRegistrationForm />);
    expect(screen.getByText(/Student Registration Form/i)).toBeInTheDocument();
  });
  test('shows email format validation error', async () => {
    render(<StudentRegistrationForm />);
    await userEvent.type(screen.getByLabelText(/Email/i), 'invalid-email');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email');
  });

  test('shows password mismatch error', async () => {
    render(<StudentRegistrationForm />);
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'abc123');
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'def456');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Passwords do not match');
  });

  test('shows minimum password length validation', async () => {
    render(<StudentRegistrationForm />);
    await userEvent.type(screen.getByLabelText(/^Password$/i), '123');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Minimum 6 characters');
  });

  test('shows phone number must be 10 digits error', async () => {
    render(<StudentRegistrationForm />);
    await userEvent.type(screen.getByLabelText(/Phone Number/i), '12345');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Phone number must be 10 digits');
  });

  test('shows age validation error if DOB < 18', async () => {
    render(<StudentRegistrationForm />);
    await userEvent.type(screen.getByLabelText(/Date of Birth/i), '2010-01-01');
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/Age must be between 18 and 60/);
  });

  test('shows hostel details textarea when Hostel = Yes', async () => {
    render(<StudentRegistrationForm />);
    await userEvent.selectOptions(screen.getByLabelText(/Hostel Required/i), 'Yes');
    expect(await screen.findByLabelText(/Hostel Details/i)).toBeInTheDocument();
  });
  test('disables submit button when form is invalid', () => {
    render(<StudentRegistrationForm />);
    const submit = screen.getByRole('button', { name: /submit/i });
    expect(submit).toBeDisabled();
  });
});
