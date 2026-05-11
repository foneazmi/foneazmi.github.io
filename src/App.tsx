import { AppRouter } from './routes';
import { PortfolioProvider } from './context/MeContext';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <AppRouter />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}

export default App;
