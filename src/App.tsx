import { Suspense } from "react";
import { AppRouter } from "./routes";
import { PortfolioProvider } from "./context/MeContext";

function App() {
  return (
    <PortfolioProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <span className="text-xl text-white">
              Loading portfolio data...
            </span>
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </PortfolioProvider>
  );
}

export default App;
