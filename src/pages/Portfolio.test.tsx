import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from '@/context/MeContext';
import Portfolio from './Portfolio';
import { mockMeData } from '@/test/mocks';

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

const renderPortfolio = () => {
  return render(
    <BrowserRouter>
      <PortfolioProvider>
        <Portfolio />
      </PortfolioProvider>
    </BrowserRouter>
  );
};

describe('Portfolio Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading state initially', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    expect(screen.getByText('🙈 🙉 🙊')).toBeInTheDocument();
  });

  it('should display page title', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      expect(screen.getByText('Portfolio')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display page description', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      expect(
        screen.getByText(/A collection of projects, apps, and experiments/i)
      ).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display portfolio items', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      // Check for at least one project title
      expect(screen.getByText('Project One')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(screen.getByText('Web App')).toBeInTheDocument();
  });

  it('should display project descriptions', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      mockMeData.portfolio.forEach((item) => {
        expect(screen.getByText(item.description)).toBeInTheDocument();
      });
    }, { timeout: 2000 });
  });

  it('should have links to project pages', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });

  it('should show error state on fetch failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderPortfolio();

    await waitFor(() => {
      expect(screen.getByText('☠️')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should have proper heading structure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should have grid layout for projects', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderPortfolio();

    await waitFor(() => {
      const section = screen.getByLabelText('Portfolio projects');
      expect(section).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
