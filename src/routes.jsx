import { DashboardScreen, ComingSoonScreen } from "./ui/screens";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Sidebar, Loader } from "./ui/components";
import "./App.css";
import { useSelector } from "react-redux";
import {
  FaRegLaughWink,
  FaVestPatches,
  FaRegObjectGroup,
} from "react-icons/fa";

export const SIDEBAR_DATA = [
  {
    text: "Farkhan Azmi",
    link: "/",
    icon: <FaRegLaughWink size={18} />,
  },
  {
    text: "Portfolio",
    link: "/portfolio",
    icon: <FaRegObjectGroup size={18} />,
  },
  {
    text: "#ComingSoon🦄",
    link: "/coming-soon",
    icon: <FaVestPatches size={18} />,
  },
];

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/coming-soon" element={<ComingSoonScreen />} />
      <Route path="/portfolio" element={<ComingSoonScreen />} />
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
