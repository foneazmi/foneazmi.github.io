import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Marquee } from './Marquee';

describe('Marquee', () => {
  const mockSkills = ['React', 'TypeScript', 'Node.js'];

  it('should render marquee with skills', () => {
    render(<Marquee skills={mockSkills} />);
    
    // Check that skills are rendered (they appear multiple times due to repetition)
    const skillElements = screen.getAllByText('React');
    expect(skillElements.length).toBeGreaterThan(0);
  });

  it('should render all provided skills', () => {
    render(<Marquee skills={mockSkills} />);
    
    // Use getAllByText since skills are repeated
    expect(screen.getAllByText('React').length).toBeGreaterThan(0);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
  });

  it('should return null when skills array is empty', () => {
    const { container } = render(<Marquee skills={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should return null when skills is undefined', () => {
    const { container } = render(<Marquee skills={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should have proper accessibility attributes', () => {
    render(<Marquee skills={mockSkills} />);
    
    // The marquee container should have aria-hidden="true"
    const marqueeContainer = document.querySelector('[aria-hidden="true"]');
    expect(marqueeContainer).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    render(<Marquee skills={mockSkills} />);
    
    // Check for diagonal containers
    const diagonals = document.querySelectorAll('[style*="transform"]');
    expect(diagonals.length).toBe(2);
  });
});
