import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PatientForm from '../components/PatientForm';

describe('PatientForm Component', () => {
  test('renders form elements correctly', () => {
    render(<PatientForm />);
    expect(screen.getByText(/Patient Intake Form/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  test('shows validation errors when submitted empty', async () => {
    render(<PatientForm />);
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText(/Full Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone must be 10 digits/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of birth is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select an option/i)).toBeInTheDocument();
    expect(screen.getByText(/Emergency contact is required/i)).toBeInTheDocument();
  });



  test('shows error for user under 18', async () => {
    render(<PatientForm />);
    userEvent.type(screen.getByLabelText(/Date of Birth/i), '2010-01-01');
    fireEvent.click(screen.getByText(/Submit/i));
    expect(await screen.findByText(/You must be at least 18 years old/i)).toBeInTheDocument();
  });

  test('displays allergy textarea when selecting Yes', async () => {
    render(<PatientForm />);
    fireEvent.change(screen.getByLabelText(/Has Allergies/i), { target: { value: 'Yes' } });
    expect(await screen.findByLabelText(/Allergy List/i)).toBeInTheDocument();
  });

  test('shows error when allergy list is empty and Yes is selected', async () => {
    render(<PatientForm />);
    fireEvent.change(screen.getByLabelText(/Has Allergies/i), { target: { value: 'Yes' } });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(await screen.findByText(/Please list your allergies/i)).toBeInTheDocument();
  });
  test('submits form and shows summary when all fields are valid (with allergies)', async () => {
    render(<PatientForm />);
    userEvent.type(screen.getByLabelText(/Full Name/i), 'Alice Smith');
    userEvent.type(screen.getByLabelText(/Email/i), 'alice@example.com');
    userEvent.type(screen.getByLabelText(/Phone Number/i), '9876543210');
    userEvent.type(screen.getByLabelText(/Date of Birth/i), '1995-05-10');
    userEvent.type(screen.getByLabelText(/Insurance Provider/i), 'ABC Insurance');
    fireEvent.change(screen.getByLabelText(/Has Allergies/i), { target: { value: 'Yes' } });
    userEvent.type(await screen.findByLabelText(/Allergy List/i), 'Peanuts, Dust');
    userEvent.type(screen.getByLabelText(/Emergency Contact/i), '1234567890');
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText(/Patient Intake Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();
    expect(screen.getByText(/alice@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/9876543210/)).toBeInTheDocument();
    expect(screen.getByText(/Peanuts, Dust/)).toBeInTheDocument();
  });

  test('resets form after successful submission', async () => {
    render(<PatientForm />);
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    userEvent.type(fullNameInput, 'Bob Martin');
    userEvent.type(screen.getByLabelText(/Email/i), 'bob@example.com');
    userEvent.type(screen.getByLabelText(/Phone Number/i), '9998887777');
    userEvent.type(screen.getByLabelText(/Date of Birth/i), '1990-03-15');
    fireEvent.change(screen.getByLabelText(/Has Allergies/i), { target: { value: 'No' } });
    userEvent.type(screen.getByLabelText(/Emergency Contact/i), '1112223333');
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText(/Patient Intake Summary/i)).toBeInTheDocument();
    expect(fullNameInput.value).toBe('');
  });

  test('does not display allergy list when No is selected', async () => {
    render(<PatientForm />);
    fireEvent.change(screen.getByLabelText(/Has Allergies/i), { target: { value: 'No' } });
    expect(screen.queryByLabelText(/Allergy List/i)).not.toBeInTheDocument();
  });


});
