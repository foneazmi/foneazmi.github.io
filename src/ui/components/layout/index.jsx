import { Link, useLocation } from "react-router-dom";
import { FaSwatchbook } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTheme } from "../../../stores/actions";
import { THEME } from "../../../helpers";
import { SIDE_MENU } from "../../../routes";

const FAB = () => {
  return (
    <div className="dropdown dropdown-left dropdown-end fixed bottom-24 md:bottom-4 right-4">
      <label tabIndex="0" className="btn btn-ghost btn-circle bg-base-300">
        <FaSwatchbook className="inline-block h-4 w-4 text-base-content stroke-current md:h-5 md:w-5" />
      </label>
      <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box h-52 w-52 overflow-y-auto shadow-2xl mt-16">
        <div className="grid grid-cols-1 gap-3 p-3" tabIndex="0">
          {THEME.map((element, index) => (
            <ThemeItem theme={element} key={`${index}-theme`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Layout = ({ content }) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="overflow-auto mb-20 md:mb-0 flex-1">{content}</div>
      <FAB />
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="md:h-screen md:w-24 h-20 w-screen bg-base-300 flex justify-center md:flex-col flex-row items-center md:relative fixed bottom-0">
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
    </div>
  );
};

const NavbarItem = (props) => {
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
};

const ThemeItem = ({ theme }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="outline-base-content overflow-hidden rounded-lg outline-2 outline-offset-2"
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
};
