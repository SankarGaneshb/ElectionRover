import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import '../shared/lib/i18n'; // Init i18n for tests

describe('Election Rover Landing Page', () => {
  it('renders the hero title', () => {
    render(<App />);
    expect(screen.getByText(/DEFEND YOUR/i)).toBeDefined();
    expect(screen.getByText(/DEMOCRACY/i)).toBeDefined();
  });

  it('renders the role selection sections', () => {
    render(<App />);
    // Check for portal titles specifically
    expect(screen.getByText(/Voter Portal/i)).toBeDefined();
    expect(screen.getByText(/Contestant Portal/i)).toBeDefined();
  });
});
