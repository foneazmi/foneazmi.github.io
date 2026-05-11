import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { MeData } from "@/types";
import {
  EMPTY_ME,
  STATIC_FALLBACK,
  CACHE_KEY,
  CACHE_TTL,
  RETRY_CONFIG,
} from "@/lib/portfolio-constants";
import { logger } from "@/lib/logger";

/* eslint-disable react-refresh/only-export-components */

interface MeContextValue {
  loading: boolean;
  error?: string;
  refetch: () => Promise<void>;
}

interface FetchState {
  data: MeData;
  loading: boolean;
  error?: string;
}

interface MeContextReturnType extends MeContextValue, MeData {}

interface CachedData {
  data: MeData;
  timestamp: number;
}

/**
 * Fetch with retry logic and exponential backoff
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param retries - Number of retries remaining
 * @param delay - Current delay before next retry
 * @returns Promise with fetch response
 */
async function fetchWithRetry(
  url: string,
  options?: RequestInit,
  retries: number = RETRY_CONFIG.maxRetries,
  delay: number = RETRY_CONFIG.baseDelay
): Promise<Response> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, options, retries - 1, Math.min(delay * 2, RETRY_CONFIG.maxDelay));
    }
    throw error;
  }
}

/**
 * Custom hook to fetch and manage portfolio data
 * Uses proper React 18+ patterns to avoid re-renders
 * Implements localStorage caching with TTL
 */
function usePortfolioData(): MeContextReturnType {
  const [state, setState] = useState<FetchState>(() => {
    // Initialize from cache if available and not expired
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp }: CachedData = JSON.parse(cached);
          const isExpired = Date.now() - timestamp > CACHE_TTL;
          if (!isExpired && data) {
            return { data, loading: false, error: undefined };
          }
        }
      } catch (err) {
        logger.warn("Failed to read from cache:", err);
      }
    }
    return { data: EMPTY_ME, loading: true, error: undefined };
  });

  const fetchData = useCallback(async (force = false) => {
    setState((prev) => ({ ...prev, loading: true, error: undefined }));

    // Clear cache if force refresh
    if (force && typeof window !== "undefined") {
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch (err) {
        logger.warn("Failed to clear cache:", err);
      }
    }

    try {
      // Use retry logic with exponential backoff
      const response = await fetchWithRetry("https://api.khan.my.id/me");
      const apiData = await response.json();
      const newData = apiData as MeData;

      // Cache the data
      if (typeof window !== "undefined") {
        try {
          const cacheData: CachedData = {
            data: newData,
            timestamp: Date.now(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (err) {
          logger.warn("Failed to cache data:", err);
        }
      }

      setState({ data: newData, loading: false, error: undefined });
    } catch (err) {
      logger.error("Failed to fetch portfolio data:", err);

      // Offline-first fallback strategy:
      // 1. Try to use expired cache if available
      // 2. Fall back to static fallback data if no cache exists
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data }: CachedData = JSON.parse(cached);
            if (data && data.name) {
              // Use expired cache
              setState({
                data,
                loading: false,
                error: "Using cached data (offline)",
              });
              return;
            }
          }
        } catch (cacheErr) {
          logger.warn("Failed to read from cache:", cacheErr);
        }
      }

      // No cache available, use static fallback
      setState({
        data: STATIC_FALLBACK,
        loading: false,
        error: "Using offline mode",
      });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initFetch = async () => {
      // Check cache first - use valid cache if available
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data, timestamp }: CachedData = JSON.parse(cached);
            const isExpired = Date.now() - timestamp > CACHE_TTL;
            if (!isExpired && data && data.name && isMounted) {
              setState({ data, loading: false, error: undefined });
              return;
            }
          }
        } catch (err) {
          logger.warn("Failed to read from cache:", err);
        }
      }

      if (isMounted) {
        setState((prev) => ({ ...prev, loading: true, error: undefined }));

        try {
          // Use retry logic with exponential backoff
          const response = await fetchWithRetry("https://api.khan.my.id/me");
          const apiData = await response.json();
          const newData = apiData as MeData;

          // Cache the data
          if (typeof window !== "undefined") {
            try {
              const cacheData: CachedData = {
                data: newData,
                timestamp: Date.now(),
              };
              localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            } catch (err) {
              logger.warn("Failed to cache data:", err);
            }
          }

          if (isMounted) {
            setState({ data: newData, loading: false, error: undefined });
          }
        } catch (err) {
          logger.error("Failed to fetch portfolio data:", err);

          if (isMounted) {
            // Offline-first fallback strategy:
            // 1. Try to use expired cache if available
            // 2. Fall back to static fallback data if no cache exists
            if (typeof window !== "undefined") {
              try {
                const cached = localStorage.getItem(CACHE_KEY);
                if (cached) {
                  const { data }: CachedData = JSON.parse(cached);
                  if (data && data.name) {
                    // Use expired cache
                    setState({
                      data,
                      loading: false,
                      error: "Using cached data (offline)",
                    });
                    return;
                  }
                }
              } catch (cacheErr) {
                logger.warn("Failed to read from cache:", cacheErr);
              }
            }

            // No cache available, use static fallback
            setState({
              data: STATIC_FALLBACK,
              loading: false,
              error: "Using offline mode",
            });
          }
        }
      }
    };

    initFetch();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - fetch only on mount

  return { ...state, ...state.data, refetch: () => fetchData(true) };
}

const MeContext = createContext<MeContextReturnType | null>(null);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const portfolioData = usePortfolioData();

  return (
    <MeContext.Provider value={portfolioData}>{children}</MeContext.Provider>
  );
};

/**
 * Custom hook to access portfolio data
 * Throws error if used outside PortfolioProvider
 */
export const useMe = (): MeContextReturnType => {
  const context = useContext(MeContext);
  if (context === null) {
    throw new Error("useMe must be used within a PortfolioProvider");
  }
  return context;
};
