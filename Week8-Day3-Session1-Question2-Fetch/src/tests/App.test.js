import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import App from "../App";
 
describe("App", () => {
  test("renders_todo_list_manager_heading", () => {
    const { getByText } = render(<App />);
    const heading = getByText("Todo List Manager");
    expect(heading).toBeInTheDocument();
  });
  test("renders_add_todo_button", () => {
    const { getByText } = render(<App />);
    const button = getByText("Add Todo");
    expect(button).toBeInTheDocument();
  });
  test("displays_todo_list_heading", () => {
    const { getByText } = render(<App />);
    const content = getByText("Todo List");
    expect(content).toBeInTheDocument();
  });
   test("displays_input_field_with_placeholder", () => {
    const { getByPlaceholderText } = render(<App />);
    const content = getByPlaceholderText("Enter new todo");
    expect(content).toBeInTheDocument();
  });
});
 