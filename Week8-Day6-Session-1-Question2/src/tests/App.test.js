// src/tests/App.test.js

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';

import App from '../App';

// Utility for rendering the App
const renderApp = () => {
  return render(<App />);
};

// Utility to fill and submit complete form
const fillAndSubmitForm = async (overrides = {}) => {
  const data = {
    travelerName: 'Alice Walker',
    destination: 'Rome',
    travelDate: '2025-11-15',
    numberOfTravelers: '3',
    transportMode: 'Train',
    specialRequests: 'Vegan meals',
    contactEmail: 'alice@example.com',
    ...overrides,
  };

  fireEvent.change(screen.getByLabelText(/Traveler's Name/i), {
    target: { value: data.travelerName },
  });
  fireEvent.change(screen.getByLabelText(/Destination/i), {
    target: { value: data.destination },
  });
  fireEvent.change(screen.getByLabelText(/Travel Date/i), {
    target: { value: data.travelDate },
  });
  fireEvent.change(screen.getByLabelText(/Number of Travelers/i), {
    target: { value: data.numberOfTravelers },
  });
  fireEvent.change(screen.getByLabelText(/Mode of Transport/i), {
    target: { value: data.transportMode },
  });
  fireEvent.change(screen.getByLabelText(/Special Requests/i), {
    target: { value: data.specialRequests },
  });

  if (data.contactEmail !== undefined) {
    fireEvent.change(screen.getByLabelText(/Contact Email/i), {
      target: { value: data.contactEmail },
    });
  }

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
};

describe('TravelForm_Integration_Tests', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(msg => {
      if (msg.includes('ReactDOMTestUtils.act')) return;
      console.error(msg);
    });
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  test('1. Renders the Travel Booking Form header', () => {
    renderApp();
    expect(screen.getByText(/Travel Booking Form/i)).toBeInTheDocument();
  });



  test('2. Shows validation errors for all required fields when empty', async () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Traveler’s name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Destination is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Travel date is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Number of travelers is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Transport mode is required/i)).toBeInTheDocument();
      expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
    });
  });

  test('3. Validates minimum number of travelers as 1', async () => {
    renderApp();
    await fillAndSubmitForm({ numberOfTravelers: '0' });

    await waitFor(() => {
      expect(screen.getByText(/Must be at least 1 traveler/i)).toBeInTheDocument();
    });
  });

  test('4. Validates invalid email format if provided', async () => {
    renderApp();
    await fillAndSubmitForm({ contactEmail: 'invalid@' });

    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });

  test('5. Allows email field to remain empty without error', async () => {
    renderApp();
    await fillAndSubmitForm({ contactEmail: '' });

    const confirmation = await screen.findByText(/Booking Confirmation/i);
    const section = confirmation.closest('div');

    expect(within(section).queryByText(/Contact Email:/)).not.toBeInTheDocument();
  });

  test('6. Clears form inputs after successful submission', async () => {
    renderApp();
    await fillAndSubmitForm();

    await waitFor(() => {
      expect(screen.getByText(/Booking Confirmation/i)).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Traveler's Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Destination/i)).toHaveValue('');
    expect(screen.getByLabelText(/Travel Date/i)).toHaveValue('');
    expect(screen.getByLabelText(/Number of Travelers/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Mode of Transport/i)).toHaveValue('');
    expect(screen.getByLabelText(/Special Requests/i)).toHaveValue('');
    expect(screen.getByLabelText(/Contact Email/i)).toHaveValue('');
  });

  test("7. Prevents form from submitting if only one required field is missing", async () => {
    renderApp();

    // Fill all but travelDate
    await fillAndSubmitForm({ travelDate: '' });

    await waitFor(() => {
      expect(screen.getByText(/Travel date is required/i)).toBeInTheDocument();
    });

    // No confirmation should appear
    expect(screen.queryByText(/Booking Confirmation/i)).not.toBeInTheDocument();
  });
});
