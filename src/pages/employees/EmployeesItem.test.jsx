import React from 'react';
import { render, screen } from "@testing-library/react";
import Employees from "./Employees";

test('Inputs no be disabled', () => {
    render(<Employees />);
    expect(screen.getByRole('input')).not.toBeDisabled()
});

test('Buttons no be disabled', () => {
    render(<Employees />);
    expect(screen.getByRole('button')).not.toBeDisabled()
});

test('Correct heading ID', () => {
    render(<Employees />);
    expect(screen.getByRole('heading')).toHaveTextContent('ID')
});

test('Correct heading Full Name', () => {
    render(<Employees />);
    expect(screen.getByRole('heading')).toHaveTextContent('Full Name')
});

test('Correct heading Number Phone', () => {
    render(<Employees />);
    expect(screen.getByRole('heading')).toHaveTextContent('Number Phone')
});

test('Correct heading Email', () => {
    render(<Employees />);
    expect(screen.getByRole('heading')).toHaveTextContent('Email')
});

test('Correct heading Job', () => {
    render(<Employees />);
    expect(screen.getByRole('heading')).toHaveTextContent('Job')
});

test('Correct heading State', () => {
    render(<Employees />);
    expect(screen.getByRole('heading')).toHaveTextContent('State')
});