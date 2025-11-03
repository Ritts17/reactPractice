import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TrainSchedule from '../components/TrainSchedule';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ✅ Test 1: Check if all UI elements are rendered
test('renders_all_ui_elements', () => {
  render(<TrainSchedule />);
  expect(screen.getByText('Train Schedule Management')).toBeInTheDocument();
  expect(screen.getByText('All Trains')).toBeInTheDocument();
});

// ✅ Test 2: Fetch and display train schedules from API
test('fetches_and_displays_train_schedules', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, trainName: 'Express 101', departureTime: '08:00', arrivalTime: '12:00', availableSeats: 120 },
      { id: 2, trainName: 'Express 202', departureTime: '14:00', arrivalTime: '18:00', availableSeats: 80 },
    ],
  });

  render(<TrainSchedule />);

  await waitFor(() => {
    expect(screen.getByText('Express 101')).toBeInTheDocument();
    expect(screen.getByText('Express 202')).toBeInTheDocument();
    expect(screen.getByText(/Seats: 120/)).toBeInTheDocument();
    expect(screen.getByText(/Seats: 80/)).toBeInTheDocument();
  });
});

// ✅ Test 3: Update a train schedule successfully
test('updates_train_schedule_successfully', async () => {
  // Initial GET returns 1 train
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, trainName: 'Express 101', departureTime: '08:00', arrivalTime: '12:00', availableSeats: 120 }
    ],
  });

  render(<TrainSchedule />);

  await waitFor(() => {
    expect(screen.getByText('Express 101')).toBeInTheDocument();
  });

  // Click Edit
  fireEvent.click(screen.getByText('Edit'));

  // Change fields
  fireEvent.change(screen.getByPlaceholderText('Train Name'), { target: { value: 'Express 101 Updated' } });
  fireEvent.change(screen.getByDisplayValue('08:00'), { target: { value: '09:00' } }); // departureTime
  fireEvent.change(screen.getByDisplayValue('12:00'), { target: { value: '13:00' } }); // arrivalTime
  fireEvent.change(screen.getByDisplayValue('120'), { target: { value: '110' } }); // availableSeats

  // Mock PUT response
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      id: 1,
      trainName: 'Express 101 Updated',
      departureTime: '09:00',
      arrivalTime: '13:00',
      availableSeats: 110,
    }),
  });

  // Click Update
  fireEvent.click(screen.getByText('Update'));

  await waitFor(() => {
    expect(screen.getByText('Express 101 Updated')).toBeInTheDocument();
    expect(screen.getByText(/09:00 to 13:00/)).toBeInTheDocument();
    expect(screen.getByText(/Seats: 110/)).toBeInTheDocument();
  });
});

// ✅ Test 4: Shows empty list when no trains exist
test('shows_empty_list_when_no_trains', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [],
  });

  render(<TrainSchedule />);

  await waitFor(() => {
      expect(screen.getByText('No trains scheduled.')).toBeInTheDocument();
  });
});

// ✅ Test 5: Cancel edit mode returns to view mode
test('cancel_edit_returns_to_view_mode', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id: 1, trainName: 'Express 101', departureTime: '08:00', arrivalTime: '12:00', availableSeats: 120 }
    ],
  });

  render(<TrainSchedule />);

  await waitFor(() => {
    expect(screen.getByText('Express 101')).toBeInTheDocument();
  });

  // Click Edit to enter edit mode
  fireEvent.click(screen.getByText('Edit'));

  // Verify we're in edit mode (form inputs are visible)
  expect(screen.getByPlaceholderText('Train Name')).toBeInTheDocument();
  expect(screen.getByText('Update')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();

  // Click Cancel
  fireEvent.click(screen.getByText('Cancel'));

  // Verify we're back in view mode
  expect(screen.getByText('Express 101')).toBeInTheDocument();
  expect(screen.getByText('Edit')).toBeInTheDocument();
  expect(screen.queryByPlaceholderText('Train Name')).not.toBeInTheDocument();
});
