import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { MeData } from "@/types";

const EMPTY_ME: MeData = {
  photo: "",
  name: "",
  job: "",
  year: 0,
  description: "",
  contacts: [],
  portfolio: [],
  experiences: [],
  skills: [],
};

export interface MeContextValue {
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

const CACHE_KEY = "portfolio_me_data";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

interface CachedData {
  data: MeData;
  timestamp: number;
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
        console.warn("Failed to read from cache:", err);
      }
    }
    return { data: EMPTY_ME, loading: true, error: undefined };
  });

  const fetchData = useCallback(async (force = false) => {
    // Skip fetch if we have valid cache and not forcing
    if (!force) {
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data, timestamp }: CachedData = JSON.parse(cached);
            const isExpired = Date.now() - timestamp > CACHE_TTL;
            if (!isExpired && data) {
              setState({ data, loading: false, error: undefined });
              return;
            }
          }
        } catch (err) {
          console.warn("Failed to read from cache:", err);
        }
      }
    }

    setState((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response = await fetch("https://api.khan.my.id/me");
      if (response.ok) {
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
            console.warn("Failed to cache data:", err);
          }
        }

        setState({ data: newData, loading: false, error: undefined });
      } else {
        setState({
          data: EMPTY_ME,
          loading: false,
          error: `Failed to fetch: ${response.status}`,
        });
      }
    } catch (err) {
      console.error("Failed to fetch portfolio data:", err);
      setState({
        data: EMPTY_ME,
        loading: false,
        error: "Network error",
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
