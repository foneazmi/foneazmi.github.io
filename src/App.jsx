import "./App.css";
import { Layout } from "./ui/components";
import { useBio, useTheme } from "./stores";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./routes";
import { useEffect } from "react";

function App() {
  const { theme } = useTheme();
  const { fetch } = useBio();

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Layout content={<RouterApp />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
