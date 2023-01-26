import {
  DashboardScreen,
  ComingSoonScreen,
  CakeLandingScreen,
  CakePrivacyPolicyScreen,
} from "./ui/screens";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout, Loader } from "./ui/components";
import { useSelector } from "react-redux";
import {
  FaRegLaughWink,
  FaVestPatches,
  FaRegObjectGroup,
} from "react-icons/fa";

export const OTHER_ROUTE = [
  {
    path: "/cake/privacy-policy",
    element: <CakePrivacyPolicyScreen />,
  },
  {
    path: "/cake",
    element: <CakeLandingScreen />,
  },
];

export const SIDE_MENU = [
  {
    text: "Farkhan Azmi",
    path: "/",
    badge: "#",
    icon: <FaRegLaughWink size={18} />,
    element: <DashboardScreen />,
    mode: "layout-1",
  },
  {
    text: "Portfolio",
    path: "/portfolio",
    icon: <FaRegObjectGroup size={18} />,
    element: <ComingSoonScreen />,
    mode: "layout-1",
  },
  {
    text: "#ComingSoon🦄",
    path: "/coming-soon",
    icon: <FaVestPatches size={18} />,
    element: <ComingSoonScreen />,
    mode: "layout-1",
  },
];

const RouterApp = () => {
  return (
    <Routes>
      {OTHER_ROUTE.concat(SIDE_MENU).map((route) => (
        <Route
          key={`${route.path}-sidebar`}
          path={route.path}
          element={<Layout content={route.element} mode={route?.mode} />}
        />
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
        <RouterApp />
      </Router>
    </div>
  );
};
