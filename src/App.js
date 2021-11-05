import { DashboardScreen, PoopScreen } from "./ui/screens";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaPoo } from "react-icons/fa";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/poop" element={<PoopScreen />} />
        <Route path="/" element={<DashboardScreen />} />
      </Routes>
    </Router>
  );
}

const SIDEBAR_DATA = [
  {
    text: "Farkhan Azmi",
    link: "/",
    icon: <FaUserCircle size={24} />,
  },
  {
    text: "Poop 💩",
    link: "/poop",
    icon: <FaPoo size={24} />,
  },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar">
      {SIDEBAR_DATA.map((element, index) => (
        <SideBarIcon
          key={`${index}-sidebar`}
          {...element}
          selected={index === selected}
          onClick={() => setSelected(index)}
        />
      ))}
    </div>
  );
};

const SideBarIcon = (props) => (
  <Link to={props.link}>
    <div className="sidebar-icon group" onClick={props.onClick}>
      {props.selected && <span className="sidebar-active" />}
      {props.icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {props.text}
      </span>
    </div>
  </Link>
);

export default App;
