import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import EventOrder from '../components/EventOrder';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ✅ Test 1: Check if UI elements are rendered
test('renders_all_ui_elements', () => {
  render(<EventOrder />);
  expect(screen.getByText('Event Order Management')).toBeInTheDocument();
  expect(screen.getByText('All Event Orders')).toBeInTheDocument();
});

// ✅ Test 2: Fetch and display event orders from API
test('fetches_and_displays_event_orders', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, eventName: 'Music Concert', eventDate: '2025-09-10', eventTime: '07:00', customerName: 'Alice' },
      { id: 2, eventName: 'Tech Expo', eventDate: '2025-09-11', eventTime: '09:30', customerName: 'Bob' }
    ],
  });

  render(<EventOrder />);

  await waitFor(() => {
    expect(screen.getByText('Music Concert')).toBeInTheDocument();
    expect(screen.getByText('Tech Expo')).toBeInTheDocument();
    expect(screen.getByText(/Ordered by Alice/)).toBeInTheDocument();
    expect(screen.getByText(/Ordered by Bob/)).toBeInTheDocument();
  });
});

// ✅ Test 3: Delete an event order successfully
test('deletes_event_order_successfully', async () => {
  // Initial GET returns 2 orders
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, eventName: 'Food Festival', eventDate: '2025-09-12', eventTime: '18:00', customerName: 'Charlie' }
    ],
  });

  // Mock DELETE response
  fetch.mockResolvedValueOnce({ ok: true });

  render(<EventOrder />);

  await waitFor(() => {
    expect(screen.getByText('Food Festival')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText('Remove'));

  await waitFor(() => {
    expect(screen.queryByText('Food Festival')).not.toBeInTheDocument();
  });
});

// ✅ Test 4: Shows empty list when no event orders exist
test('shows_empty_list_when_no_orders', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(<EventOrder />);

   await waitFor(() => {
    expect(screen.getByText('No event orders found.')).toBeInTheDocument();
  });
});