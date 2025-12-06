import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { MeData } from "../types";

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
export interface MeContextValue extends MeData {
  loading: boolean;
  error?: string;
}

const MeContext = createContext<MeContextValue>({
  photo: "",
  name: "",
  job: "",
  year: 0,
  description: "",
  contacts: [],
  portfolio: [],
  experiences: [],
  skills: [],
  loading: true,
  error: undefined,
});

// Global promise variable to be accessed by the hook
let portfolioPromise: Promise<void> | null = null;

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<MeData>(EMPTY_ME);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.khan.my.id/me");
        if (response.ok) {
          const apiData = await response.json();
          // Directly replace the data with the API payload (no initial data to merge with)
          setData(apiData as any);
        } else {
          setError(`Failed to fetch: ${response.status}`);
        }
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };
    // Store the promise globally for Suspense
    portfolioPromise = fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MeContext.Provider value={{ ...data, loading, error }}>
      {children}
    </MeContext.Provider>
  );
};

export const useMe = () => {
  const context = useContext(MeContext);
  if (context.loading) {
    // Throw the stored promise to trigger Suspense fallback
    if (portfolioPromise) {
      throw portfolioPromise;
    }
  }
  return context;
};
