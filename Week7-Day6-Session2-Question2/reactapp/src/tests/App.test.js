import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';


test('renders_the_heading', () => {
  render(<App />);
  const heading = screen.getByText(/Employee Directory/i);
  expect(heading).toBeInTheDocument();
});
test('renders_the_input_placeholder_text', () => {
  render(<App />);
  const content = screen.getByPlaceholderText("Search employees...");
  expect(content).toBeInTheDocument();
});
test('renders_the_employee_john_doe', () => {
  render(<App />);
  const content = screen.getByText(/John Doe/i);
  expect(content).toBeInTheDocument();
});
test('renders_the_employee_jane_smith', () => {
  render(<App />);
  const content = screen.getByText(/Jane Smith/i);
  expect(content).toBeInTheDocument();
});
test('renders_the_employee_mike_johnson', () => {
  render(<App />);
  const content = screen.getByText(/Mike Johnson/i);
  expect(content).toBeInTheDocument();
});
test('renders_the_employee_james_brown', () => {
  render(<App />);
  const content = screen.getByText(/James Brown/i);
  expect(content).toBeInTheDocument();
});

test('renders_the_employee_based_on_search', () => {
  render(<App />);
    fireEvent.change(screen.getByPlaceholderText("Search employees..."), {
      target: { value: 'John' },
    });
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.queryByText(/Jane Smith/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/James Brown/i)).not.toBeInTheDocument();
});
