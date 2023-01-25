import { DashboardScreen, ComingSoonScreen } from "./ui/screens";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout, Loader } from "./ui/components";
import { useSelector } from "react-redux";
import {
  FaRegLaughWink,
  FaVestPatches,
  FaRegObjectGroup,
} from "react-icons/fa";

export const SIDEBAR_DATA = [
  {
    text: "Farkhan Azmi",
    path: "/",
    badge: "#",
    icon: <FaRegLaughWink size={18} />,
    element: <DashboardScreen />,
  },
  {
    text: "Portfolio",
    path: "/portfolio",
    icon: <FaRegObjectGroup size={18} />,
    element: <ComingSoonScreen />,
  },
  {
    text: "#ComingSoon🦄",
    path: "/coming-soon",
    icon: <FaVestPatches size={18} />,
    element: <ComingSoonScreen />,
  },
];

const RouterApp = () => {
  return (
    <Routes>
      {SIDEBAR_DATA.map((sidebar) => (
        <Route path={sidebar.path} element={sidebar.element} />
      ))}
    </Routes>
  );
};

export const RouteApp = () => {
  const { theme } = useSelector(({ global }) => global);
  return (
    <div data-theme={theme}>
      <Router>
        <Loader />
        <Layout content={<RouterApp />} />
      </Router>
    </div>
  );
};
