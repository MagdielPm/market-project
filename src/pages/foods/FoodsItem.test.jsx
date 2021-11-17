import React from 'react';
import { render, screen } from "@testing-library/react";
import Foods from "./Foods";

import '@testing-library/jest-dom/extend-expect';


test('Buttons no be disabled', () => {
    render(<Foods />);
    expect(screen.getByRole('button')).not.toBeDisabled()
});

test('Correct heading ID', () => {
    render(<Foods />);
    expect(screen.getByText('ID')).toHaveTextContent('ID')
});

test('Correct heading Name Food', () => {
    render(<Foods />);
    expect(screen.getByText('Name Food')).toHaveTextContent('Name Food')
});

test('Correct heading Food Description', () => {
    render(<Foods />);
    expect(screen.getByText('Food Description')).toHaveTextContent('Food Description')
});

test('Correct heading Ingredients', () => {
    render(<Foods />);
    expect(screen.getByText('Ingredients')).toHaveTextContent('Ingredients')
});

test('Correct heading   Food Price', () => {
    render(<Foods />);
    expect(screen.getByText(' Food Price')).toHaveTextContent(' Food Price')
});

test('Correct heading Food Expiration', () => {
    render(<Foods />);
    expect(screen.getByText('Food Expiration')).toHaveTextContent('Food Expiration')
});