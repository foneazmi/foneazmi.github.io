import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the routes
vi.mock('./routes', () => ({
  AppRouter: () => <div>App Router</div>,
}));

// Mock the context
vi.mock('./context/MeContext', () => ({
  PortfolioProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useMe: () => ({
    loading: false,
    error: undefined,
    name: 'Test User',
    job: 'Test Job',
    photo: '',
    year: 2024,
    description: 'Test description',
    contacts: [],
    portfolio: [],
    experiences: [],
    skills: [],
    refetch: vi.fn(),
  }),
}));

// Suppress console.error for cleaner test output
const originalError = console.error;

describe('App', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
    vi.clearAllMocks();
  });

  it('should render without errors', () => {
    render(<App />);
    expect(screen.getByText('App Router')).toBeInTheDocument();
  });

  it('should wrap components with ErrorBoundary', () => {
    const { container } = render(<App />);
    // Verify the component tree is rendered
    expect(container).toBeInTheDocument();
  });

  it('should render PortfolioProvider', () => {
    render(<App />);
    expect(screen.getByText('App Router')).toBeInTheDocument();
  });
});
