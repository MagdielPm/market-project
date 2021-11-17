import React from "react";
import { render, screen } from "@testing-library/react";
import Customers from "./Customers";

import "@testing-library/jest-dom/extend-expect";

test("Buttons no be disabled", () => {
  render(<Customers />);
  expect(screen.getByRole("button")).not.toBeDisabled();
});

test("Correct heading ID", () => {
  render(<Customers />);
  expect(screen.getByText("ID")).toHaveTextContent("ID");
});

test("Correct heading Full Name", () => {
  render(<Customers />);
  expect(screen.getByText("Full Name")).toHaveTextContent("Full Name");
});

test("Correct heading Number Phone", () => {
  render(<Customers />);
  expect(screen.getByText("Number Phone")).toHaveTextContent("Number Phone");
});

test("Correct heading Email", () => {
  render(<Customers />);
  expect(screen.getByText("Email")).toHaveTextContent("Email");
});

test("Correct heading Job", () => {
  render(<Customers />);
  expect(screen.getByText("Job")).toHaveTextContent("Job");
});

test("Correct heading State", () => {
  render(<Customers />);
  expect(screen.getByText("State")).toHaveTextContent("State");
});
