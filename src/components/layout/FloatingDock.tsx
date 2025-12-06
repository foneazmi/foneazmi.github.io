import { NavLink } from "react-router-dom";
import { Home, Briefcase, LayoutGrid } from "lucide-react";

export const FloatingDock = () => {
  const navItems = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    {
      path: "/experience",
      label: "Experience",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      path: "/portfolio",
      label: "Portfolio",
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    // Add more items if needed, e.g., Contact or Blog
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
                            relative flex items-center justify-center p-3 rounded-xl transition-all duration-300
                            hover:bg-white/10 group
                            ${
                              isActive
                                ? "bg-white/15 text-white shadow-lg shadow-purple-500/20"
                                : "text-neutral-400 hover:text-white"
                            }
                        `}
          >
            <span className="relative z-10">{item.icon}</span>

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10 pointer-events-none">
              {item.label}
            </span>

            {/* Active Indicator */}
            {/* {isActive && (
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                        )} */}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
