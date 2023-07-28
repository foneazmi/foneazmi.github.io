import { Link, useLocation } from "react-router-dom";
import { FaSwatchbook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTheme } from "../../../stores/actions";
import { THEME } from "../../../helpers";
import { OTHER_SIDE_MENU, SIDE_MENU } from "../../../routes";
import { memo } from "react";

export const Layout = memo(({ content }) => {
  return (
    <div className="flex h-screen w-screen bg-base-300 flex-col-reverse sm:flex-row">
      <Navbar />
      <div className="flex-1 w-full bg-base-100 sm:rounded-3xl overflow-hidden sm:my-2 sm:mr-2">
        {content}
      </div>
      <FAB />
    </div>
  );
});

const FAB = memo(() => {
  return (
    <div className="dropdown dropdown-hover dropdown-end absolute top-4 right-4">
      <label tabIndex="0" className="btn btn-ghost btn-circle bg-base-300">
        <FaSwatchbook className="inline-block h-4 w-4 text-base-content stroke-current sm:h-5 sm:w-5" />
      </label>
      <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box h-52 w-52 overflow-y-auto shadow-2xl scrollbar-hide">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex="0">
          {THEME.map((element, index) => (
            <ThemeItem theme={element} key={`${index}-theme`} />
          ))}
        </div>
      </div>
    </div>
  );
});

const Navbar = memo(() => {
  const location = useLocation();
  return (
    <div className="sm:h-screen sm:w-24 h-20 w-screen bg-base-300 flex justify-center sm:flex-col flex-row items-center sm:relative duration-300">
      {SIDE_MENU.map((element, index) => (
        <NavbarItem
          key={`${index}-sidebar`}
          path={element.path}
          icon={element.icon}
          text={element.text}
          active={element.path === location.pathname}
          sideText={element.badge}
        />
      ))}

      {OTHER_SIDE_MENU.map((element, index) => (
        <NavbarItem
          key={`${index}-other-sidebar`}
          path={element.path}
          icon={element.icon}
          text={element.text}
          active={false}
          sideText=""
        />
      ))}
    </div>
  );
});

const NavbarItem = memo((props) => {
  const iconStyle = props.active
    ? "bg-primary px-4 py-2 rounded-full text-primary-content"
    : "py-2 rounded-full text-base-content bg-blend-darken duration-500 transition-all group-hover:bg-primary group-hover:text-primary-content group-hover:px-4";
  return (
    <Link
      className="w-24 flex items-center justify-center flex-col my-4 select-none group"
      to={props.path}
    >
      <div className={iconStyle}>{props.icon}</div>
      <span className="truncate text-sm text-base-content overflow-hidden">
        {props.text}
      </span>
    </Link>
  );
});

const ThemeItem = memo(({ theme }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2 hover:scale-105 duration-150"
      data-set-theme={theme}
      data-act-class="outline"
      onClick={() => dispatch(setTheme(theme))}
    >
      <div
        data-theme={theme}
        className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
      >
        <div className="grid grid-cols-5 grid-rows-3">
          <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
            <div className="flex-grow text-sm font-bold">{theme}</div>
            <div className="flex flex-shrink-0 flex-wrap gap-1">
              <div className="bg-primary w-2 rounded"></div>
              <div className="bg-secondary w-2 rounded"></div>
              <div className="bg-accent w-2 rounded"></div>
              <div className="bg-neutral w-2 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
