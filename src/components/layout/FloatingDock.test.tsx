import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FloatingDock } from './FloatingDock';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('FloatingDock', () => {
  it('should render navigation dock', () => {
    renderWithRouter(<FloatingDock />);
    
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('should render all navigation items', () => {
    renderWithRouter(<FloatingDock />);
    
    // Use getAllByText since text appears in both sr-only span and tooltip
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0);
  });

  it('should render navigation links', () => {
    renderWithRouter(<FloatingDock />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
    
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/experience');
    expect(links[2]).toHaveAttribute('href', '/portfolio');
  });

  it('should have proper accessibility attributes', () => {
    renderWithRouter(<FloatingDock />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    // Check for tooltips
    const tooltips = document.querySelectorAll('[role="tooltip"]');
    expect(tooltips.length).toBe(3);
  });

  it('should apply correct styling classes', () => {
    renderWithRouter(<FloatingDock />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('glass');
    expect(nav).toHaveClass('backdrop-blur-xl');
  });
});
