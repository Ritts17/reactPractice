import React from "react";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import BookCatalog from "../components/BookCatalog";
import BookItem from "../components/BookItem";

// App.js - 2 test cases
describe("App", () => {

  test("renders_book_catalog_component", () => {
    render(<App />);
    const bookCatalogDiv = screen.getByText("Discounted Bookstore").closest('div');
    expect(bookCatalogDiv).toBeInTheDocument();
  });
});

describe("BookCatalog", () => {
  test("renders_catalog_header", () => {
    render(<BookCatalog />);
    expect(screen.getByText("Discounted Bookstore")).toBeInTheDocument();
  });

  test("renders_sort_button", () => {
    render(<BookCatalog />);
    expect(screen.getByText(/Sort by Price/i)).toBeInTheDocument();
  });

  test("renders_all_books", () => {
    render(<BookCatalog />);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("Book 3")).toBeInTheDocument();
    expect(screen.getByText("Book 4")).toBeInTheDocument();
    expect(screen.getByText("Book 5")).toBeInTheDocument();
  });

  test("renders_correct_number_of_books", () => {
    render(<BookCatalog />);
    const bookImages = screen.getAllByRole("img");
    expect(bookImages).toHaveLength(5);
  });

  test("sort_button_changes_text_on_click", () => {
    render(<BookCatalog />);
    const sortButton = screen.getByText("Sort by Price (Low to High)");
    fireEvent.click(sortButton);
    expect(screen.getByText("Sort by Price (High to Low)")).toBeInTheDocument();
  });
});

describe("BookItem", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    price: 19.99,
    image: "test-image.jpg"
  };

  test("renders_book_title", () => {
    render(<BookItem book={mockBook} />);
    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });

  test("renders_book_author", () => {
    render(<BookItem book={mockBook} />);
    expect(screen.getByText("By Test Author")).toBeInTheDocument();
  });

  test("renders_book_price", () => {
    render(<BookItem book={mockBook} />);
    expect(screen.getByText("₹19.99")).toBeInTheDocument();
  });
});