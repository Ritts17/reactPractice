import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CricketScoreboard from "../components/CricketScoreboard";
import axios from "axios";

jest.mock("axios");

// Test 1: Renders all UI elements
test("renders_all_ui_elements", () => {
  render(<CricketScoreboard />);
  expect(screen.getByText("Cricket Scoreboard")).toBeInTheDocument();
});

// Test 2: Fetch and display matches
test("fetches_and_displays_matches", async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, teamA: "India", teamB: "Australia", score: "120/2", overs: 15 },
      { id: 2, teamA: "England", teamB: "Pakistan", score: "90/3", overs: 12 },
    ],
  });

  render(<CricketScoreboard />);

  await waitFor(() => {
    expect(screen.getByText("India vs Australia")).toBeInTheDocument();
    expect(screen.getByText("England vs Pakistan")).toBeInTheDocument();
    expect(screen.getByText(/120\/2 in 15 overs/)).toBeInTheDocument();
    expect(screen.getByText(/90\/3 in 12 overs/)).toBeInTheDocument();
  });
});

// Test 3: Edit and update match score
test("updates_match_score_successfully", async () => {
  axios.get.mockResolvedValue({
    data: [{ id: 1, teamA: "India", teamB: "Australia", score: "120/2", overs: 15 }],
  });

  axios.put.mockResolvedValue({
    data: { id: 1, teamA: "India", teamB: "Australia", score: "150/3", overs: 18 },
  });

  render(<CricketScoreboard />);

  await waitFor(() => {
    expect(screen.getByText("India vs Australia")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Edit"));

  fireEvent.change(screen.getByPlaceholderText("Score"), {
    target: { value: "150/3" },
  });
  fireEvent.change(screen.getByPlaceholderText("Overs"), {
    target: { value: "18" },
  });

  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => {
    expect(screen.getByText(/150\/3 in 18 overs/)).toBeInTheDocument();
  });
});

// Test 4: Shows empty list when no matches exist
test("shows_empty_list_when_no_matches", async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(<CricketScoreboard />);

  await waitFor(() => {
    const emptyMessage = screen.getByText(/No matches have been added yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });
});


// Test 5: Clicking edit shows input fields
test("clicking_edit_shows_input_fields", async () => {
  axios.get.mockResolvedValue({
    data: [{ id: 1, teamA: "India", teamB: "Australia", score: "120/2", overs: 15 }],
  });

  render(<CricketScoreboard />);

  await waitFor(() => {
    expect(screen.getByText("India vs Australia")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("Edit"));

  expect(screen.getByPlaceholderText("Score")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Overs")).toBeInTheDocument();
});
