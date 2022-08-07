import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle, FaPoo } from "react-icons/fa";

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

export const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar select-none">
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
  <Link to={props.link} className="sidebar-icon group" onClick={props.onClick}>
    {props.selected && <span className="sidebar-active" />}
    {props.icon}
    <span className="sidebar-tooltip group-hover:scale-100">{props.text}</span>
  </Link>
);
