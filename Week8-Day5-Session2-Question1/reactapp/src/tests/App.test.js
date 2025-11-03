import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MedicalShop from '../components/MedicalShop';
import App from '../App';

// Mocking window.alert
beforeAll(() => {
  global.alert = jest.fn();
});

afterAll(() => {
  global.alert.mockRestore();
});

test('renders_Medical_Shop_Inventory_heading_is_present', () => {
  render(<MedicalShop />);
  expect(screen.getByText('Medical Shop Inventory')).toBeInTheDocument();
});

test('displays_initial_inventory_items_is_present', async () => {
  render(<MedicalShop />);
  await waitFor(() => {
    expect(screen.getByText('Paracetamol')).toBeInTheDocument();
    expect(screen.getByText('Aspirin')).toBeInTheDocument();
    expect(screen.getByText('Band-Aid')).toBeInTheDocument();
  });
});

test('displays_an_alert_if_all_fields_are_not_filled_when_adding_a_new_medicine_is_working', async () => {
  render(<MedicalShop />);
  fireEvent.click(screen.getByText('Add Medicine'));
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
  });
});

test('adds_a_new_medicine_to_the_inventory_is_working', () => {
  render(<MedicalShop />);
  fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Ibuprofen' } });
  fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: '40' } });
  fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '1.5' } });
  fireEvent.click(screen.getByText('Add Medicine'));

  expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
  expect(screen.getByText('40')).toBeInTheDocument();
  expect(screen.getByText('1.5')).toBeInTheDocument();
});

test('renders_MedicalShop_component_within_App_is_working', () => {
  render(<App />);
  const medicalShopComponent = screen.getByRole('heading', { name: /Medical Shop Inventory/i });
  expect(medicalShopComponent).toBeInTheDocument();
});

test('renders_Add_Medicine_button_is_working', () => {
  render(<MedicalShop />);
  const addMedicineButton = screen.getByText('Add Medicine');
  expect(addMedicineButton).toBeInTheDocument();
});

test('filters_inventory_based_on_search_term_is_working', async () => {
  render(<MedicalShop />);
  
  // Verify all items are initially visible
  expect(screen.getByText('Paracetamol')).toBeInTheDocument();
  expect(screen.getByText('Aspirin')).toBeInTheDocument();
  expect(screen.getByText('Band-Aid')).toBeInTheDocument();
  
  // Search for specific medicine
  const searchInput = screen.getByPlaceholderText('Search by name...');
  fireEvent.change(searchInput, { target: { value: 'Para' } });
  
  // Verify filtered results
  await waitFor(() => {
    expect(screen.getByText('Paracetamol')).toBeInTheDocument();
    expect(screen.queryByText('Aspirin')).not.toBeInTheDocument();
    expect(screen.queryByText('Band-Aid')).not.toBeInTheDocument();
  });
  
  // Test no results scenario
  fireEvent.change(searchInput, { target: { value: 'NonExistent' } });
  await waitFor(() => {
    expect(screen.getByText('No medicines found matching "NonExistent".')).toBeInTheDocument();
  });
});
