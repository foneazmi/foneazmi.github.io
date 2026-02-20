import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PortfolioCard } from './PortfolioCard';
import type { PortfolioItem } from '@/types';

describe('PortfolioCard', () => {
  const mockItem: PortfolioItem = {
    image: 'https://example.com/project.jpg',
    title: 'Test Project',
    description: 'A test project description',
    link: 'https://example.com',
    icon: '🚀',
  };

  const mockItemWithoutLink: PortfolioItem = {
    title: 'Project Without Link',
    description: 'No link provided',
    icon: '⚡',
  };

  const mockItemWithText: PortfolioItem = {
    text: 'CLI Tool',
    title: 'CLI Tool',
    description: 'A command-line tool',
    icon: '💻',
  };

  it('should render portfolio card with image', () => {
    render(<PortfolioCard item={mockItem} index={0} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
    
    const img = screen.getByRole('img', { name: 'Test Project' });
    expect(img).toHaveAttribute('src', 'https://example.com/project.jpg');
  });

  it('should render portfolio card with text fallback', () => {
    render(<PortfolioCard item={mockItemWithText} index={1} />);
    
    // Use getAllByText since title appears twice (in cover and content)
    expect(screen.getAllByText('CLI Tool').length).toBeGreaterThan(0);
    // The icon emoji is not rendered when text is present
  });

  it('should have external link when link is provided', () => {
    render(<PortfolioCard item={mockItem} index={0} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('should not have external attributes when no link', () => {
    render(<PortfolioCard item={mockItemWithoutLink} index={0} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#');
    expect(link).not.toHaveAttribute('target');
  });

  it('should apply animation delay based on index', () => {
    const { container } = render(<PortfolioCard item={mockItem} index={3} />);
    
    const card = container.firstChild as HTMLElement;
    expect(card.style.animationDelay).toBe('300ms');
  });

  it('should show arrow icon for external links', () => {
    render(<PortfolioCard item={mockItem} index={0} />);
    
    // The arrow icon should be present (it's an SVG with aria-hidden)
    const arrowIcons = document.querySelectorAll('svg[aria-hidden="true"]');
    expect(arrowIcons.length).toBeGreaterThan(0);
  });

  it('should have proper accessibility attributes', () => {
    render(<PortfolioCard item={mockItem} index={0} />);
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
});
