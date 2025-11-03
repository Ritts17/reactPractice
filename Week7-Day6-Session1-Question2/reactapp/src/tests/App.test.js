import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { BookProvider } from '../components/BookContext';

const renderWithProvider = () => {
  render(
    <BookProvider>
      <App />
    </BookProvider>
  );
};

test('renders_the_add_new_book_button', () => {
  renderWithProvider();
  const button = screen.getByText("Add New Book");
  expect(button).toBeInTheDocument();
});

test('renders_the_book_name_input_field_with_placeholder', () => {
  renderWithProvider();
  const inputField = screen.getByPlaceholderText("Enter book name");
  expect(inputField).toBeInTheDocument();
});

test('renders_the_quantity_input_field_with_placeholder', () => {
  renderWithProvider();
  const inputField = screen.getByPlaceholderText("Enter quantity");
  expect(inputField).toBeInTheDocument();
});

test('ensures_the_total_books_count_is_correctly_updated_after_adding_or_removing_a_book', async () => {
  renderWithProvider();

  const bookNameInput = screen.getByPlaceholderText("Enter book name");
  const quantityInput = screen.getByPlaceholderText("Enter quantity");
  const addButton = screen.getByText("Add New Book");

  fireEvent.change(bookNameInput, { target: { value: 'React Basics' } });
  fireEvent.change(quantityInput, { target: { value: '3' } });
  fireEvent.click(addButton);

  const totalBooksAfterAdd = screen.getByText(/Total Books:/);
  expect(totalBooksAfterAdd).toHaveTextContent('Total Books: 1');

  const deleteButton = await screen.findByText("Remove");
  fireEvent.click(deleteButton);

  const totalBooksAfterRemove = screen.getByText(/Total Books:/);
  expect(totalBooksAfterRemove).toHaveTextContent('Total Books: 0');
});

test('removes_a_book_from_the_list', async () => {
  renderWithProvider();

  const bookNameInput = screen.getByPlaceholderText("Enter book name");
  const quantityInput = screen.getByPlaceholderText("Enter quantity");
  const addButton = screen.getByText("Add New Book");

  fireEvent.change(bookNameInput, { target: { value: 'React Basics' } });
  fireEvent.change(quantityInput, { target: { value: '3' } });
  fireEvent.click(addButton);

  const deleteButton = await screen.findByText("Remove");
  fireEvent.click(deleteButton);

  await waitFor(() => {
    const bookItem = screen.queryByText("React Basics -");
    expect(bookItem).not.toBeInTheDocument();
  });
});

test('edits_and_saves_the_book_name', async () => {
  renderWithProvider();

  const bookNameInput = screen.getByPlaceholderText("Enter book name");
  const quantityInput = screen.getByPlaceholderText("Enter quantity");
  const addButton = screen.getByText("Add New Book");

  fireEvent.change(bookNameInput, { target: { value: 'React Basics' } });
  fireEvent.change(quantityInput, { target: { value: '2' } });
  fireEvent.click(addButton);

  const editButton = await screen.findByText("Edit");
  fireEvent.click(editButton);

  fireEvent.change(bookNameInput, { target: { value: 'Advanced React' } });
  const saveButton = screen.getByText("Save Changes");
  fireEvent.click(saveButton);

  const updatedBook = screen.getByText("Advanced React -");
  expect(updatedBook).toBeInTheDocument();
});

test('adds_a_book_to_the_list_with_correct_name_and_quantity', () => {
  renderWithProvider();

  const bookNameInput = screen.getByPlaceholderText("Enter book name");
  const quantityInput = screen.getByPlaceholderText("Enter quantity");
  const addButton = screen.getByText("Add New Book");

  fireEvent.change(bookNameInput, { target: { value: 'React Basics' } });
  fireEvent.change(quantityInput, { target: { value: '3' } });
  fireEvent.click(addButton);

  const bookItem = screen.getByText("React Basics -");
  expect(bookItem).toBeInTheDocument();
});

test('ensures_the_quantity_input_field_only_accepts_positive_numbers', () => {
  renderWithProvider();

  const bookNameInput = screen.getByPlaceholderText("Enter book name");
  const quantityInput = screen.getByPlaceholderText("Enter quantity");
  const addButton = screen.getByText("Add New Book");

  fireEvent.change(bookNameInput, { target: { value: 'React Basics' } });
  fireEvent.change(quantityInput, { target: { value: '-3' } });
  fireEvent.click(addButton);

  expect(quantityInput.value).toBe('1');

  fireEvent.change(quantityInput, { target: { value: '5' } });
  fireEvent.click(addButton);

  expect(quantityInput.value).toBe('5');
});