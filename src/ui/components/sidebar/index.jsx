import { Link } from "react-router-dom";
import { useState } from "react";
import { AcademicCapIcon, HandIcon } from "@heroicons/react/solid";

const SIDEBAR_DATA = [
  {
    text: "Farkhan Azmi",
    link: "/",
    icon: <AcademicCapIcon className="h-8 w-8" />,
  },
  {
    text: "#WIP🦄",
    link: "/wip",
    icon: <HandIcon className="h-8 w-8" />,
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
