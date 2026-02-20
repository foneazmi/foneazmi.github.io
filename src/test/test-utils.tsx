import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from '@/context/MeContext';

interface RenderWithProvidersOptions {
  router?: boolean;
  provider?: boolean;
  [key: string]: unknown;
}

/**
 * Custom render function that wraps components with necessary providers
 */
export function renderWithProviders(
  ui: ReactNode,
  {
    router = true,
    provider = false,
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    let wrapped = children;

    if (router) {
      wrapped = <BrowserRouter>{wrapped}</BrowserRouter>;
    }

    if (provider) {
      wrapped = <PortfolioProvider>{wrapped}</PortfolioProvider>;
    }

    return wrapped;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything from testing-library
export * from '@testing-library/react';
