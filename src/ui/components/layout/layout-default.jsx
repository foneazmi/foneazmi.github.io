import { Link, useLocation } from "react-router-dom";
import { FaHamburger, FaSwatchbook, FaChevronDown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setTheme } from "../../../stores/actions";
import { THEME } from "../../../helpers";
import { SIDE_MENU } from "../../../routes";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="absolute w-full bottom-0 p-4 bg-base-300 text-base-content">
      <p className="text-sm">
        {`Copyright © ${date.getFullYear()} - Farkhan Azmi`}
      </p>
    </footer>
  );
};

export const DefaultLayout = ({ content }) => {
  return (
    <div className="flex h-screen">
      {content}
      <Footer />
    </div>
  );
};
