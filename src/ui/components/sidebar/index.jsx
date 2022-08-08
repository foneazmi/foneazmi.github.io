import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MenuIcon,
  SparklesIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import { FaUserCircle, FaPoo } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../../stores/actions";

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

const ThemeItem = ({ theme }) => {
  const dispatch = useDispatch();
  return (
    <div
      class="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
      data-set-theme={theme}
      data-act-class="outline"
      onClick={() => dispatch(setTheme(theme))}
    >
      <div
        data-theme={theme}
        class="bg-base-100 text-base-content w-full cursor-pointer font-sans"
      >
        <div class="grid grid-cols-5 grid-rows-3">
          <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
            <div class="flex-grow text-sm font-bold">{theme}</div>
            <div class="flex flex-shrink-0 flex-wrap gap-1">
              <div class="bg-primary w-2 rounded"></div>
              <div class="bg-secondary w-2 rounded"></div>
              <div class="bg-accent w-2 rounded"></div>
              <div class="bg-neutral w-2 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Navbar = () => (
  <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 text-primary-content">
    <nav class="navbar w-full">
      <div className="flex flex-1">
        <label
          htmlFor="my-drawer-3"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <MenuIcon className="h-6 w-6 text-primary" />
        </label>
        <div class="font-black text-primary inline-flex text-lg">
          <span class="text-primary">Kh</span>
          <span class="text-base-content">an</span>
        </div>
      </div>
      <div class="flex-0">
        <div title="Change Theme" class="dropdown dropdown-end ">
          <div tabindex="0" class="btn gap-1 normal-case btn-ghost">
            <SparklesIcon className="inline-block h-5 w-5 text-primary stroke-current md:h-6 md:w-6" />
            <span class="hidden md:inline text-primary">Theme</span>
            <ChevronDownIcon className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" />
          </div>
          <div class="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
            <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
              {THEME.map((element, index) => (
                <ThemeItem theme={element} key={`${index}-theme`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
);

export const Sidebar = ({ content }) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
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
