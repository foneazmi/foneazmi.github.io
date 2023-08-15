import React from "react";
import {
  DashboardScreen,
  CakePrivacyPolicyScreen,
  PortfolioScreen,
  CakeLandingScreen,
} from "./ui/screens";
import { Routes, Route } from "react-router-dom";
import { FaRegLaughWink, FaRegObjectGroup, FaRocket } from "react-icons/fa";
import { isDev } from "./helpers";

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
  !isDev && {
    text: "Status",
    path: "https://foneazmi.github.io/status/",
    icon: <FaRocket size={18} />,
  },
];

export const RouterApp = () => {
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
