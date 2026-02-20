import { AppRouter } from './routes';
import { PortfolioProvider } from './context/MeContext';

function App() {
  return (
    <PortfolioProvider>
      <AppRouter />
    </PortfolioProvider>
  );
}

export default App;
