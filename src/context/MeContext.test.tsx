import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { PortfolioProvider, useMe } from '@/context/MeContext';
import { mockMeData } from '@/test/mocks';
import type { ReactNode } from 'react';

// Mock the fetch API
const mockFetch = vi.fn();
global.fetch = mockFetch as unknown as typeof fetch;

const wrapper = ({ children }: { children: ReactNode }) => (
  <PortfolioProvider>{children}</PortfolioProvider>
);

describe('MeContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('should provide initial loading state', () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    const { result } = renderHook(() => useMe(), { wrapper });

    // Initial state should be loading
    expect(result.current.loading).toBe(true);
  });

  it('should fetch and provide data successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 10000 }
    );

    expect(result.current.name).toBe(mockMeData.name);
    expect(result.current.job).toBe(mockMeData.job);
    expect(result.current.skills).toEqual(mockMeData.skills);
    expect(result.current.error).toBeUndefined();
  });

  it('should use static fallback when API fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 10000 }
    );

    // Should use static fallback
    expect(result.current.name).toBe('Farkhan Azmi');
    expect(result.current.error).toBe('Using offline mode');
  });

  it('should provide refetch function', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 10000 }
    );

    // Verify refetch function exists
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useMe());
    }).toThrow('useMe must be used within a PortfolioProvider');
  });

  it('should use expired cache when API fails', async () => {
    // Set up expired cache
    const expiredData = { ...mockMeData, name: 'Cached User' };
    const expiredCache = JSON.stringify({
      data: expiredData,
      timestamp: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days ago (expired)
    });
    localStorage.setItem('portfolio_me_data', expiredCache);

    // Mock fetch to fail
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 10000 }
    );

    expect(result.current.name).toBe('Cached User');
    expect(result.current.error).toBe('Using cached data (offline)');
  });

  it('should use static fallback when no cache exists', async () => {
    // No cache set
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 10000 }
    );

    expect(result.current.name).toBe('Farkhan Azmi');
    expect(result.current.job).toBe('Software Engineer');
    expect(result.current.error).toBe('Using offline mode');
  });
});
