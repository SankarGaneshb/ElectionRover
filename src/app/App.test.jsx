import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import '../shared/lib/i18n'; // Init i18n for tests

describe('Election Rover Landing Page', () => {
  it('renders the welcome message', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to Election Rover/i)).toBeDefined();
  });

  it('renders the role selection cards', () => {
    render(<App />);
    expect(screen.getByText(/General Elector/i)).toBeDefined();
    expect(screen.getByText(/Candidate/i)).toBeDefined();
  });
});
