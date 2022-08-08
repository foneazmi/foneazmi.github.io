import { DashboardScreen, PoopScreen } from "./ui/screens";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Sidebar, Loader } from "./ui/components";
import "./App.css";
import { useSelector } from "react-redux";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/poop" element={<PoopScreen />} />
      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};

export const RouteApp = () => {
  const { theme } = useSelector(({ global }) => global);
  return (
    <div data-theme={theme}>
      <Router>
        <Loader />
        <Sidebar content={<RouterApp />} />
      </Router>
    </div>
  );
};
