import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { MapView } from '../widgets/MapView/MapView';
import React from 'react';
import '../shared/lib/i18n'; 

describe('Election Rover Core Dashboard Flow', () => {
  it('renders the core title & roles successfully', () => {
    render(<App />);
    expect(screen.getByText(/Voter Portal/i)).toBeDefined();
    expect(screen.getByText(/Contestant Portal/i)).toBeDefined();
  });

  it('renders spatial map boundaries seamlessly', () => {
    render(<MapView />);
    const exploreButton = screen.getByText(/Explore Geospatial Polling Maps/i);
    fireEvent.click(exploreButton);
    expect(screen.getByText(/Constituency Boundaries: New Delhi/i)).toBeDefined();
    expect(screen.getByText(/Show PWD Accessible/i)).toBeDefined();
  });

  it('triggers local criteria accessibility toggles correctly', () => {
    render(<MapView />);
    const exploreButton = screen.getByText(/Explore Geospatial Polling Maps/i);
    fireEvent.click(exploreButton);
    const toggleButton = screen.getByText(/Show PWD Accessible/i);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/PWD Only/i)).toBeDefined();
  });
});


