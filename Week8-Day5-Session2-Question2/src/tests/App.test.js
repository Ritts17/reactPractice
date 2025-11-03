import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

const queryClient = new QueryClient();

const customRender = (ui, { ...renderOptions } = {}) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
    renderOptions
  );
};

const mockBooks = [
  {
    key: '/works/OL12345W',
    title: 'Learning React',
    author_name: ['Alex Banks', 'Eve Porcello'],
    author_key: ['OL63258A', 'OL8360836A'],
    first_publish_year: 2020,
    publisher: ['O\'Reilly Media'],
    edition_count: 1,
    language: ['eng'],
    cover_edition_key: 'OL12345M',
    has_fulltext: false,
    ebook_access: 'no_ebook',
    public_scan_b: false,
  },
  {
    key: '/works/OL67890W',
    title: 'React Explained',
    author_name: ['Zac Gordon'],
    author_key: ['OL99999A'],
    first_publish_year: 2019,
    publisher: ['Self Published'],
    edition_count: 1,
    language: ['eng'],
    cover_edition_key: 'OL67890M',
    has_fulltext: true,
    ebook_access: 'public',
    public_scan_b: true,
  },
];

describe('BookList App', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    fetch.mockClear();
  });

  afterAll(() => {
    global.fetch.mockRestore();
  });

  test('book_list_heading_is_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockBooks }),
    });

    customRender(<App />);
    const headings = await screen.findAllByText(/Book Library/i);
    expect(headings.length).toBeGreaterThan(0);
  });

  test('search_input_is_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockBooks }),
    });

    customRender(<App />);
    const inputs = await screen.findAllByPlaceholderText(/Search by title or author/i);
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('book_list_items_are_present', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockBooks }),
    });

    customRender(<App />);

    const book1Items = await screen.findAllByText(/Learning React/i);
    const book2Items = await screen.findAllByText(/React Explained/i);

    expect(book1Items.length).toBeGreaterThan(0);
    expect(book2Items.length).toBeGreaterThan(0);
  });

  test('search_filters_books', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockBooks }),
    });

    customRender(<App />);

    const inputs = await screen.findAllByPlaceholderText(/Search by title or author/i);
    fireEvent.change(inputs[0], { target: { value: 'Learning' } });

    await waitFor(() => {
      const filtered = screen.getAllByText(/Learning React/i);
      expect(filtered.length).toBeGreaterThan(0);
      expect(screen.queryByText(/React Explained/i)).not.toBeInTheDocument();
    });
  });

  test('clicking_book_opens_modal', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ docs: mockBooks }),
    });

    customRender(<App />);

    const bookItems = await screen.findAllByText(/Learning React/i);
    fireEvent.click(bookItems[0]);

    const modalTitles = await screen.findAllByText(/Languages/i);
    expect(modalTitles.length).toBeGreaterThan(0);
  });
});
