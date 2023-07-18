import React from "react";
import {
  DashboardScreen,
  // CakeLandingScreen,
  CakePrivacyPolicyScreen,
  PortfolioScreen,
} from "./ui/screens";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Layout, Loader } from "./ui/components";
import { useSelector } from "react-redux";
import { FaRegLaughWink, FaRegObjectGroup } from "react-icons/fa";

//? if got error delete this
const InvitationScreen = React.lazy(() => import("./module/invitation"));
const PlanetaryScreen = React.lazy(() => import("./module/planetary"));

export const OTHER_ROUTE = [
  {
    path: "/cake/privacy-policy",
    element: <CakePrivacyPolicyScreen />,
  },
  // {
  //   path: "/cake",
  //   element: <CakeLandingScreen />,
  // },
  //? if got error delete this
  {
    path: "/wedding/gallery",
    element: <InvitationScreen type={"gallery"} />,
  },
  {
    path: "/wedding/bts",
    element: <InvitationScreen type={"gallery-2"} />,
  },
  {
    path: "/invitation",
    element: <InvitationScreen />,
  },

  //? Planetary
  {
    path: "/planetary",
    element: <PlanetaryScreen />,
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
