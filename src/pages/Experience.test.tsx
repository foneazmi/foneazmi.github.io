import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from '@/context/MeContext';
import Experience from './Experience';
import { mockMeData } from '@/test/mocks';

const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

const renderExperience = () => {
  return render(
    <BrowserRouter>
      <PortfolioProvider>
        <Experience />
      </PortfolioProvider>
    </BrowserRouter>
  );
};

describe('Experience Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should show loading state initially', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    expect(screen.getByText('🙈 🙉 🙊')).toBeInTheDocument();
  });

  it('should display page title', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      expect(screen.getByText('Experience')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display page description', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      expect(
        screen.getByText(/My professional journey and work history/i)
      ).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display all companies', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      mockMeData.experiences.forEach((exp) => {
        expect(screen.getByText(exp.company)).toBeInTheDocument();
      });
    }, { timeout: 2000 });
  });

  it('should display all roles', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      mockMeData.experiences.forEach((exp) => {
        exp.roles.forEach((role) => {
          expect(screen.getByText(role.role)).toBeInTheDocument();
        });
      });
    }, { timeout: 2000 });
  });

  it('should display locations', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      mockMeData.experiences.forEach((exp) => {
        exp.roles.forEach((role) => {
          expect(screen.getByText(role.location)).toBeInTheDocument();
        });
      });
    }, { timeout: 2000 });
  });

  it('should show "Present" for current positions', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      // Check time element for "Present" text
      const timeElements = document.querySelectorAll('time');
      expect(timeElements.length).toBeGreaterThan(0);
      expect(timeElements[0].textContent).toContain('Present');
    }, { timeout: 2000 });
  });

  it('should show fallback data on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    renderExperience();

    await waitFor(() => {
      // Should show fallback data instead of error
      expect(screen.getByText('Experience')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should have proper heading structure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display date ranges', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    renderExperience();

    await waitFor(() => {
      // Check for date format in the document
      const timeElements = document.querySelectorAll('time');
      expect(timeElements.length).toBeGreaterThan(0);
    }, { timeout: 2000 });
  });
});
