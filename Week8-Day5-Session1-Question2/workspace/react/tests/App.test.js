import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

const queryClient = new QueryClient();

const customRender = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <QueryClientProvider client={queryClient} {...providerProps}>
      {ui}
    </QueryClientProvider>,
    renderOptions
  );
};

const mockBreeds = [
  { id: 1, name: 'Breed 1', description: 'Description 1', origin: 'Origin 1', life_span: '10 years' },
  { id: 2, name: 'Breed 2', description: 'Description 2', origin: 'Origin 2', life_span: '12 years' },
];

describe('App', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    fetch.mockClear();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  test('list_of_dog_breeds_heading_is_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBreeds,
    });

    customRender(<App />);
    const heading = await screen.findByText(/Dog Breeds/i);
    expect(heading).toBeInTheDocument();
  });

  test('breed_table_is_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBreeds,
    });

    customRender(<App />);

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // header + data rows
  });

  test('breed_list_items_are_present_in_table', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBreeds,
    });

    customRender(<App />);

    const breed1Cell = await screen.findByText(/Breed 1/i);
    const breed2Cell = await screen.findByText(/Breed 2/i);

    expect(breed1Cell).toBeInTheDocument();
    expect(breed2Cell).toBeInTheDocument();
  });



  test('breed_search_filters_the_table', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockBreeds,
    });

    customRender(<App />);

    const searchInput = await screen.findByPlaceholderText(/search breeds/i);
    fireEvent.change(searchInput, { target: { value: 'Breed 1' } });

    await waitFor(() => {
      const breed1Cell = screen.getByText(/Breed 1/i);
      expect(breed1Cell).toBeInTheDocument();
      expect(screen.queryByText(/Breed 2/i)).not.toBeInTheDocument();
    });
  });
});
