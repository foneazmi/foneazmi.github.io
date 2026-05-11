import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from '@/context/MeContext';
import Home from './Home';
import { mockMeData } from '@/test/mocks';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

const renderHome = () => {
  return render(
    <BrowserRouter>
      <PortfolioProvider>
        <Home />
      </PortfolioProvider>
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should show loading state initially', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    // Should show loading emojis
    expect(screen.getByText('🙈 🙉 🙊')).toBeInTheDocument();
  });

  it('should display user name and job after loading', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    await waitFor(() => {
      expect(screen.getByText(mockMeData.name)).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByText(mockMeData.job)).toBeInTheDocument();
  });

  it('should display user description', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    await waitFor(() => {
      expect(screen.getByText(mockMeData.description)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display enabled contact links', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    await waitFor(() => {
      expect(screen.getAllByText('GitHub').length).toBeGreaterThan(0);
      expect(screen.getAllByText('LinkedIn').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Email').length).toBeGreaterThan(0);
      expect(screen.getAllByText('WhatsApp').length).toBeGreaterThan(0);
    }, { timeout: 2000 });

    // Telegram should not be shown (enable: false)
    expect(screen.queryByText('Telegram')).not.toBeInTheDocument();
  });

  it('should display skills in marquee', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    await waitFor(() => {
      // Skills should be rendered multiple times due to marquee effect
      mockMeData.skills.forEach((skill) => {
        expect(screen.getAllByText(skill).length).toBeGreaterThan(0);
      });
    }, { timeout: 2000 });
  });

  it('should show fallback data on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderHome();

    await waitFor(() => {
      // Should show fallback data instead of error
      expect(screen.getByText('Farkhan Azmi')).toBeInTheDocument();
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should have proper heading structure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByRole('heading', { level: 2, name: /contact/i })).toBeInTheDocument();
  });

  it('should have accessible photo with alt text', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderHome();

    await waitFor(() => {
      const img = screen.getByRole('img', { name: mockMeData.name });
      expect(img).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
