import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Crop from '../components/Crop';

jest.mock('axios');
import axios from 'axios';

//Test 1: Check if all UI elements are rendered
test('renders_all_ui_elements', () => {
  render(<Crop />);
  
  expect(screen.getByText('Crop Management System')).toBeInTheDocument();
  expect(screen.getByText('Crop List')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Crop Name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Season')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Quantity')).toBeInTheDocument();
  expect(screen.getByText('Add Crop')).toBeInTheDocument();
});

// Test 2: Fetch and display crops from API
test('fetches_and_displays_crops', async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, name: 'Wheat', season: 'Winter', quantity: 100 },
      { id: 2, name: 'Rice', season: 'Summer', quantity: 200 }
    ]
  });

  render(<Crop />);

  await waitFor(() => {
    expect(screen.getByText('Wheat')).toBeInTheDocument();
    expect(screen.getByText('Rice')).toBeInTheDocument();
    expect(screen.getByText('(Winter) - 100 kg')).toBeInTheDocument();
    expect(screen.getByText('(Summer) - 200 kg')).toBeInTheDocument();
  });
});

// Test 3: Add a new crop successfully
test('adds_new_crop_successfully', async () => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({
    data: { id: 1, name: 'Corn', season: 'Summer', quantity: 150 }
  });

  render(<Crop />);

  // Fill form
  fireEvent.change(screen.getByPlaceholderText('Crop Name'), {
    target: { value: 'Corn' }
  });
  fireEvent.change(screen.getByPlaceholderText('Season'), {
    target: { value: 'Summer' }
  });
  fireEvent.change(screen.getByPlaceholderText('Quantity'), {
    target: { value: '150' }
  });

  // Submit form
  fireEvent.click(screen.getByText('Add Crop'));

  await waitFor(() => {
    expect(screen.getByText('Corn')).toBeInTheDocument();
    expect(screen.getByText('(Summer) - 150 kg')).toBeInTheDocument();
  });
});

// Test 4: Form fields are cleared after adding crop
test('clears_form_after_adding_crop', async () => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({
    data: { id: 1, name: 'Barley', season: 'Winter', quantity: 80 }
  });

  render(<Crop />);

  const nameInput = screen.getByPlaceholderText('Crop Name');
  const seasonInput = screen.getByPlaceholderText('Season');
  const quantityInput = screen.getByPlaceholderText('Quantity');

  // Fill and submit form
  fireEvent.change(nameInput, { target: { value: 'Barley' } });
  fireEvent.change(seasonInput, { target: { value: 'Winter' } });
  fireEvent.change(quantityInput, { target: { value: '80' } });
  fireEvent.click(screen.getByText('Add Crop'));

  // Check form is cleared
  await waitFor(() => {
    expect(nameInput.value).toBe('');
    expect(seasonInput.value).toBe('');
    expect(quantityInput.value).toBe('');
  });
});

// Test 5: Shows empty list when no crops exist
test('shows_empty_list_when_no_crops', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(<Crop />);

  await waitFor(() => {
    const emptyMessage = screen.getByText(/No crops have been added yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});

// Test 6: Input fields show correct placeholder text
test('input_fields_show_placeholder_text', () => {
  axios.get.mockResolvedValue({ data: [] });
  
  render(<Crop />);

  const nameInput = screen.getByPlaceholderText('Crop Name');
  const seasonInput = screen.getByPlaceholderText('Season');
  const quantityInput = screen.getByPlaceholderText('Quantity');

  expect(nameInput).toHaveAttribute('placeholder', 'Crop Name');
  expect(seasonInput).toHaveAttribute('placeholder', 'Season');
  expect(quantityInput).toHaveAttribute('placeholder', 'Quantity');
  
});