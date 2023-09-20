import "./App.css";
import { Layout } from "./ui/components";
import { useBio, useTheme } from "./stores";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./routes";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();
  const { bio, fetch } = useBio();

  useEffect(() => {
    fetch();
  }, []);

  if (!bio) {
    return (
      <div
        data-theme={theme}
        className="flex h-screen w-screen bg-base-300 flex-col-reverse justify-center items-center"
      >
        <span className="loading loading-infinity loading-lg scale-150 text-primary"></span>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Layout content={<RouterApp />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
