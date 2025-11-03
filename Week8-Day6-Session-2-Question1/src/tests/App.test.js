import React from 'react';
import { render, screen, fireEvent, waitFor ,within } from '@testing-library/react';
import App from '../App';
import AppointmentForm from '../components/AppointmentForm';
import '@testing-library/jest-dom/extend-expect';

describe('AppointmentForm Integration Tests', () => {
  const fillForm = ({
    name = '',
    age = '',
    gender = '',
    specialist = '',
    date = '',
    time = '',
    isFollowUp = ''
  }) => {
    fireEvent.change(screen.getByLabelText(/patient name/i), { target: { value: name } });
    fireEvent.change(screen.getByLabelText(/age/i), { target: { value: age } });
    fireEvent.change(screen.getByLabelText(/gender/i), { target: { value: gender } });
    fireEvent.change(screen.getByLabelText(/specialist/i), { target: { value: specialist } });
    fireEvent.change(screen.getByLabelText(/preferred date/i), { target: { value: date } });
    fireEvent.change(screen.getByLabelText(/preferred time/i), { target: { value: time } });

    if (specialist === 'Cardiologist') {
      fireEvent.change(screen.getByLabelText(/follow-up visit/i), {
        target: { value: isFollowUp }
      });
    }
  };

  test('appointment_form_renders_with_heading', () => {
    render(<App />);
    expect(screen.getByText(/book medical appointment/i)).toBeInTheDocument();
  });

  test('appointment_form_shows_errors_on_empty_submit', async () => {
    render(<AppointmentForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/age is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/gender is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/specialist is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/date is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/time is required/i)).toBeInTheDocument();
  });

  test('appointment_form_validates_time_range', async () => {
    render(<AppointmentForm />);
    fillForm({
      name: 'Jane',
      age: 30,
      gender: 'Female',
      specialist: 'Dermatologist',
      date: '2025-07-20',
      time: '08:00'
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/appointments are allowed from 9am to 5pm/i)).toBeInTheDocument();
  });

  test('appointment_form_submits_valid_data_and_shows_summary', async () => {
    render(<AppointmentForm />);
    
    fillForm({
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      specialist: 'Orthopedic',
      date: '2025-07-21',
      time: '10:00'
    });
  
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
    await waitFor(() => {
      const summary = screen.getByText(/appointment summary/i).closest('div');
      expect(summary).toBeInTheDocument();
  
      const { getByText } = within(summary);
      expect(getByText(/john doe/i)).toBeInTheDocument();
      expect(getByText(/45/i)).toBeInTheDocument();
      expect(getByText(/male/i)).toBeInTheDocument();
      expect(getByText(/orthopedic/i)).toBeInTheDocument(); // ✅ now scoped
      expect(getByText(/2025-07-21/i)).toBeInTheDocument();
      expect(getByText(/10:00/i)).toBeInTheDocument();
    });
  });
  

  test('appointment_form_handles_cardiologist_followup', async () => {
    render(<AppointmentForm />);
    fillForm({
      name: 'Alice',
      age: 55,
      gender: 'Female',
      specialist: 'Cardiologist',
      date: '2025-07-25',
      time: '11:00',
      isFollowUp: 'Yes'
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/follow-up/i)).toBeInTheDocument();
      expect(screen.getByText(/yes/i)).toBeInTheDocument();
    });
  });

  test('appointment_form_resets_after_submit', async () => {
    render(<AppointmentForm />);
    const nameInput = screen.getByLabelText(/patient name/i);

    fillForm({
      name: 'Bob',
      age: 60,
      gender: 'Male',
      specialist: 'Dermatologist',
      date: '2025-08-01',
      time: '12:00'
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(nameInput.value).toBe('');
    });
  });
});
