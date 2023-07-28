import React from "react";
import {
  DashboardScreen,
  CakePrivacyPolicyScreen,
  PortfolioScreen,
  CakeLandingScreen,
} from "./ui/screens";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout, Loader } from "./ui/components";
import { useSelector } from "react-redux";
import { FaRegLaughWink, FaRegObjectGroup, FaRocket } from "react-icons/fa";

export const OTHER_ROUTE = [
  {
    path: "/cake",
    element: <CakeLandingScreen />,
  },
  {
    path: "/cake/privacy-policy",
    element: <CakePrivacyPolicyScreen />,
  },
];

export const SIDE_MENU = [
  {
    text: "Me",
    path: "/",
    badge: "#",
    icon: <FaRegLaughWink size={18} />,
    element: <DashboardScreen />,
    sidebar: true,
  },
  {
    text: "Portfolio",
    path: "/portfolio",
    icon: <FaRegObjectGroup size={18} />,
    element: <PortfolioScreen />,
    sidebar: true,
  },
];

export const OTHER_SIDE_MENU = [
  {
    text: "Status",
    path: "https://foneazmi.github.io/status/",
    icon: <FaRocket size={18} />,
  },
];

const RouterApp = () => {
  return (
    <Routes>
      {OTHER_ROUTE.concat(SIDE_MENU).map((route) => (
        <Route
          key={`${route.path}-sidebar`}
          path={route.path}
          element={route.element}
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
        <Layout content={<RouterApp />} />
      </Router>
    </div>
  );
};
