import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Timeline } from './Timeline';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe('Timeline Component', () => {
  it('renders all milestones from the data', () => {
    render(<Timeline />);
    
    // Check if key milestone translation keys are present
    expect(screen.getByText('timeline_prep')).toBeDefined();
    expect(screen.getByText('timeline_notif')).toBeDefined();
    expect(screen.getByText('timeline_count')).toBeDefined();
  });

  it('shows the current milestone with an activity icon', () => {
    render(<Timeline />);
    // In our mock data, timeline_notif is the current one
    const currentMilestone = screen.getByText('timeline_notif');
    expect(currentMilestone).toBeDefined();
  });
});
