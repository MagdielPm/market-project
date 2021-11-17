import React from 'react';
import { render, screen } from "@testing-library/react";
import Employees from "./Employees";

import '@testing-library/jest-dom/extend-expect';


test('Buttons no be disabled', () => {
    render(<Employees />);
    expect(screen.getByRole('button')).not.toBeDisabled()
});

test('Correct heading ID', () => {
    render(<Employees />);
    expect(screen.getByText('ID')).toHaveTextContent('ID')
});

test('Correct heading Full Name', () => {
    render(<Employees />);
    expect(screen.getByText('Full Name')).toHaveTextContent('Full Name')
});

test('Correct heading Number Phone', () => {
    render(<Employees />);
    expect(screen.getByText('Number Phone')).toHaveTextContent('Number Phone')
});

test('Correct heading Email', () => {
    render(<Employees />);
    expect(screen.getByText('Email')).toHaveTextContent('Email')
});

test('Correct heading Job', () => {
    render(<Employees />);
    expect(screen.getByText('Job')).toHaveTextContent('Job')
});

test('Correct heading State', () => {
    render(<Employees />);
    expect(screen.getByText('State')).toHaveTextContent('State')
});