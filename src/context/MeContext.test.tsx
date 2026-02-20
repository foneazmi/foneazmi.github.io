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
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.name).toBe(mockMeData.name);
    expect(result.current.job).toBe(mockMeData.job);
    expect(result.current.skills).toEqual(mockMeData.skills);
    expect(result.current.error).toBeUndefined();
  });

  it('should handle fetch error gracefully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch: 500');
    expect(result.current.name).toBe('');
  });

  it('should handle network error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
  });

  it('should provide refetch function', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMeData,
    });

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

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
});
