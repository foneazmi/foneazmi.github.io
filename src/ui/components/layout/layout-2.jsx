import { Link, useLocation } from "react-router-dom";
import { FaHamburger, FaSwatchbook, FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTheme } from "../../../stores/actions";
import { THEME } from "../../../helpers";
import { SIDE_MENU } from "../../../routes";

export const Layout2 = ({ content }) => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="overflow-auto mb-20 md:mb-0 flex-1">{content}</div>
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="md:h-screen md:w-24 h-20 w-screen bg-base-300 flex justify-center md:flex-col flex-row items-center md:relative absolute bottom-0 left-0 right-0">
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
    ? "bg-primary px-4 py-1 rounded-full text-primary-content transition-all duration-100"
    : "px-4 py-1 rounded-full text-base-content bg-blend-darken transition-all duration-100";
  return (
    <Link
      className="w-24 flex items-center justify-center flex-col my-4"
      to={props.path}
    >
      <div className={iconStyle}>{props.icon}</div>
      <span className="truncate text-base-content overflow-hidden">
        {props.text}
      </span>
    </Link>
  );
};
