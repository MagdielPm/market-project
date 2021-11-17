import React from 'react';
import { render, screen } from "@testing-library/react";
import Products from "./Products";

import '@testing-library/jest-dom/extend-expect';


test('Buttons no be disabled', () => {
    render(<Products />);
    expect(screen.getByRole('button')).not.toBeDisabled()
});

test('Correct heading ID', () => {
    render(<Products />);
    expect(screen.getByText('ID')).toHaveTextContent('ID')
});

test('Correct heading Name', () => {
    render(<Products />);
    expect(screen.getByText('Name')).toHaveTextContent('Name')
});

test('Correct heading Description', () => {
    render(<Products />);
    expect(screen.getByText('Description')).toHaveTextContent('Description')
});

test('Correct heading Price', () => {
    render(<Products />);
    expect(screen.getByText('Price')).toHaveTextContent('Price')
});

test('Correct heading Price per kg', () => {
    render(<Products />);
    expect(screen.getByText('Price per kg')).toHaveTextContent('Price per kg')
});

test('Correct heading Stock', () => {
    render(<Products />);
    expect(screen.getByText('Stock')).toHaveTextContent('Stock')
});

test('Correct heading Require id to sell', () => {
    render(<Products />);
    expect(screen.getByText('Require id to sell')).toHaveTextContent('Require id to sell')
});