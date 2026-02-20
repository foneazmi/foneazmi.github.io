import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { MeData } from '@/types';

const EMPTY_ME: MeData = {
  photo: '',
  name: '',
  job: '',
  year: 0,
  description: '',
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

/**
 * Custom hook to fetch and manage portfolio data
 * Uses proper React 18+ patterns to avoid re-renders
 */
function usePortfolioData(): MeContextReturnType {
  const [state, setState] = useState<FetchState>({
    data: EMPTY_ME,
    loading: true,
    error: undefined,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: undefined }));

    try {
      const response = await fetch('https://api.khan.my.id/me');
      if (response.ok) {
        const apiData = await response.json();
        setState({ data: apiData as MeData, loading: false, error: undefined });
      } else {
        setState({
          data: EMPTY_ME,
          loading: false,
          error: `Failed to fetch: ${response.status}`,
        });
      }
    } catch (err) {
      console.error('Failed to fetch portfolio data:', err);
      setState({
        data: EMPTY_ME,
        loading: false,
        error: 'Network error',
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, ...state.data, refetch: fetchData };
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
    throw new Error('useMe must be used within a PortfolioProvider');
  }
  return context;
};
