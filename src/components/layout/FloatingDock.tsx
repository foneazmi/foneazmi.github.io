import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Home, Briefcase, LayoutGrid } from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: Home },
  {
    path: "/experience",
    label: "Experience",
    icon: Briefcase,
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    icon: LayoutGrid,
  },
] as const;

export const FloatingDock = memo(() => {
  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl glass border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          aria-describedby={`tooltip-${item.path}`}
          className={({ isActive }) =>
            `
                            relative flex items-center justify-center p-3 rounded-xl transition-all duration-300
                            hover:bg-white/10 group
                            ${
                              isActive
                                ? "bg-white/15 text-white shadow-lg shadow-purple-500/20"
                                : "text-neutral-400 hover:text-white"
                            }
                        `
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className="relative z-10 w-5 h-5" aria-hidden="true" />
              <span className="sr-only">{item.label}</span>

              {/* Tooltip */}
              <span
                id={`tooltip-${item.path}`}
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-white/10 pointer-events-none"
                role="tooltip"
              >
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                  aria-hidden="true"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
});

FloatingDock.displayName = "FloatingDock";
