import "./App.css";
import { Layout } from "./ui/components";
import { useTheme } from "./stores";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./routes";

function App() {
  const { theme } = useTheme();
  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Layout content={<RouterApp />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
