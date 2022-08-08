import { Link } from "react-router-dom";
import { useState } from "react";
import { MenuIcon, SparklesIcon } from "@heroicons/react/solid";
import { FaUserCircle, FaPoo } from "react-icons/fa";

const SIDEBAR_DATA = [
  {
    text: "Farkhan Azmi",
    link: "/",
    icon: <FaUserCircle size={18} />,
  },
  {
    text: "Poop 💩",
    link: "/poop",
    icon: <FaPoo size={18} />,
  },
];

const THEME = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export const Sidebar = ({ content }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <MenuIcon className="h-6 w-6" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">Farkhan Azmi</div>
        </div>
        {content}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
          {SIDEBAR_DATA.map((element, index) => (
            <SideBarIcon
              key={`${index}-sidebar`}
              {...element}
              active={index === selected}
              onClick={() => setSelected(index)}
              sideText={element.badge}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const SideBarIcon = (props) => (
  <li onClick={props.onClick} className="btn-md">
    <Link
      to={props.link}
      id="active-menu"
      className={`flex ${props.active ? "active" : ""}`}
    >
      {props.icon}
      <span className="flex-1">{props.text}</span>
      {props.sideText && (
        <span className="badge badge-sm flex-none lowercase">
          {props.sideText}
        </span>
      )}
    </Link>
  </li>
);
