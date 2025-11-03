import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import MovieList from "../components/MovieList";

describe("Header", () => {
  test("renders_header_component", () => {
    render(<App />);
    expect(screen.getByText("Movie Catalog App")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  test("renders_footer_component", () => {
    render(<App />);
    const footerText = screen.getByText(/Neo Movies/i);
    expect(footerText).toBeInTheDocument();
  });
});

describe("MovieList", () => {
  test("renders_the_movie_list", () => {
    render(<MovieList />);
    expect(screen.getByText("Movie List")).toBeInTheDocument();
  });

  test("renders_each_movie_title_1", () => {
    render(<MovieList />);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  test("renders_each_movie_title_2", () => {
    render(<MovieList />);
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  test("renders_each_movie_title_3", () => {
    render(<MovieList />);
    expect(screen.getByText("Movie 3")).toBeInTheDocument();
  });

  test("renders_each_movie_title_5", () => {
    render(<MovieList />);
    expect(screen.getByText("Movie 5")).toBeInTheDocument();
  });

  test("renders_each_movie_description_1", () => {
    render(<MovieList />);
    expect(screen.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")).toBeInTheDocument();
  });

  test("renders_each_movie_description_2", () => {
    render(<MovieList />);
    expect(screen.getByText("Vestibulum id ligula porta felis euismod semper.")).toBeInTheDocument();
  });

  test("renders_each_movie_description_3", () => {
    render(<MovieList />);
    expect(screen.getByText("Nullam quis risus eget urna mollis ornare vel eu leo.")).toBeInTheDocument();
  });

  test("renders_each_movie_description_5", () => {
    render(<MovieList />);
    expect(screen.getByText("Aenean lacinia bibendum nulla sed consectetur.")).toBeInTheDocument();
  });

  test("render_the_img_tag_is_used", () => {
    render(<MovieList />);
    const imgTag = screen.getAllByRole("img");
    expect(imgTag).toHaveLength(5);
  });
});
