import { memo, useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Search,
  Plus,
  Trash2,
  Globe,
  X,
  Settings,
  Clock,
  Monitor,
  Palette,
  AlertTriangle,
  Check,
  Quote,
  Pencil,
  Download,
  Upload,
  Grip,
} from "lucide-react";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface Shortcut {
  id: string;
  title: string;
  url: string;
  icon: string;
  iconType: "emoji" | "url";
}

interface NtpSettings {
  hourFormat: "12" | "24";
  searchEngine: "google" | "duckduckgo" | "bing";
  accentColor: string;
}

interface NtpBackup {
  version: number;
  shortcuts: Shortcut[];
  settings: NtpSettings;
}

type Panel = "none" | "add" | "settings" | "edit";

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────
const STORAGE_SHORTCUTS = "ntp_shortcuts";
const STORAGE_SETTINGS = "ntp_settings";

const SEARCH_ENGINES: Record<string, { name: string; url: string }> = {
  google: { name: "Google", url: "https://www.google.com/search?q=" },
  duckduckgo: { name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
  bing: { name: "Bing", url: "https://www.bing.com/search?q=" },
};

const ACCENT_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Emerald", value: "#10b981" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Cyan", value: "#06b6d4" },
];

const QUOTES: string[] = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Simplicity is the ultimate sophistication. — Leonardo da Vinci",
  "In the middle of difficulty lies opportunity. — Albert Einstein",
  "The future belongs to those who believe in the beauty of their dreams. — Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. — Confucius",
  "Everything you can imagine is real. — Pablo Picasso",
  "The best time to plant a tree was 20 years ago. The second best time is now. — Chinese Proverb",
  "An unexamined life is not worth living. — Socrates",
  "What we think, we become. — Buddha",
  "The journey of a thousand miles begins with one step. — Lao Tzu",
  "Happiness is not something ready-made. It comes from your own actions. — Dalai Lama",
  "The mind is everything. What you think you become. — Buddha",
  "Not all those who wander are lost. — J.R.R. Tolkien",
  "The purpose of our lives is to be happy. — Dalai Lama",
  "Life is what happens when you're busy making other plans. — John Lennon",
  "Get busy living or get busy dying. — Stephen King",
  "You only live once, but if you do it right, once is enough. — Mae West",
  "Many of life's failures are people who did not realize how close they were to success when they gave up. — Thomas Edison",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. — Nelson Mandela",
  "The way to get started is to quit talking and begin doing. — Walt Disney",
  "Don't let yesterday take up too much of today. — Will Rogers",
  "You learn more from failure than from success. Don't let it stop you. Failure builds character. — Unknown",
  "If you are working on something exciting that you really care about, you don't have to be pushed. The vision pulls you. — Steve Jobs",
  "Experience is a hard teacher because she gives the test first, the lesson afterwards. — Vernon Law",
  "Believe you can and you're halfway there. — Theodore Roosevelt",
  "Act as if what you do makes a difference. It does. — William James",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. — Zig Ziglar",
  "You miss 100% of the shots you don't take. — Wayne Gretzky",
  "Whether you think you can or you think you can't, you're right. — Henry Ford",
  "I have not failed. I've just found 10,000 ways that won't work. — Thomas Edison",
  "A person who never made a mistake never tried anything new. — Albert Einstein",
  "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless. — Jamie Paolinetti",
];

const DEFAULT_SETTINGS: NtpSettings = {
  hourFormat: "24",
  searchEngine: "google",
  accentColor: "#6366f1",
};

// ──────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────
function useLocalStorage<T>(
  key: string,
  fallback: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota exceeded – silent */
    }
  }, [key, value]);

  return [value, setValue];
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
const quoteOfTheDay = (): string => {
  const dayStr = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < dayStr.length; i++) {
    hash = (hash << 5) - hash + dayStr.charCodeAt(i);
    hash |= 0;
  }
  return QUOTES[Math.abs(hash) % QUOTES.length];
};

const greetForHour = (hour: number): string => {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const normalizeUrl = (raw: string): string => {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const isValidUrl = (raw: string): boolean => {
  try {
    new URL(normalizeUrl(raw));
    return true;
  } catch {
    return false;
  }
};

const faviconSrc = (url: string): string => {
  let hostname: string;
  try {
    hostname = new URL(normalizeUrl(url)).hostname;
  } catch {
    return "";
  }
  // Primary: Icon Horse (purpose-built for favicon extraction)
  return `https://icon.horse/icon/${hostname}`;
};

const fallbackFaviconSrc = (url: string): string => {
  try {
    const hostname = new URL(normalizeUrl(url)).hostname;
    // Fallback: Google S2
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
};

const directFaviconSrc = (url: string): string => {
  try {
    const hostname = new URL(normalizeUrl(url)).hostname;
    // Last resort: direct fetch (always https)
    return `https://${hostname}/favicon.ico`;
  } catch {
    return "";
  }
};

const formatTime = (date: Date, format: "12" | "24"): string => {
  if (format === "12") {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

// ──────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────

/* ---------- TimeDisplay ---------- */
const TimeDisplay = memo(({ format }: { format: "12" | "24" }) => {
  const [time, setTime] = useState(formatTime(new Date(), format));

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date(), format));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [format]);

  return (
    <h1
      className="text-7xl md:text-9xl font-extralight tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 select-none"
      aria-live="off"
    >
      {time}
    </h1>
  );
});

/* ---------- Greeting ---------- */
const Greeting = () => {
  const [label, setLabel] = useState(() => {
    const now = new Date();
    return `${greetForHour(now.getHours())} · ${formatDate(now)}`;
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLabel(`${greetForHour(now.getHours())} · ${formatDate(now)}`);
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return <p className="text-white/40 text-lg tracking-wide mt-2">{label}</p>;
};

/* ---------- QuoteOfTheDay ---------- */
const QuoteOfTheDay = () => {
  const text = useMemo(() => quoteOfTheDay(), []);
  return (
    <div className="flex items-start gap-2 max-w-lg text-center mx-auto mt-1">
      <Quote className="w-4 h-4 text-white/20 mt-1 shrink-0" />
      <p className="text-white/25 text-sm italic leading-relaxed">{text}</p>
    </div>
  );
};

/* ---------- SearchBar ---------- */
const SearchBar = memo(
  ({
    engine,
    accentColor,
  }: {
    engine: keyof typeof SEARCH_ENGINES;
    accentColor: string;
  }) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
          e.preventDefault();
          ref.current?.focus();
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, []);

    const handleSearch = useCallback(
      (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        // If user typed a URL-like thing, navigate directly
        if (
          /^(https?:\/\/)?[\w][\w.-]*\.\w{2,}/.test(trimmed) &&
          !trimmed.includes(" ")
        ) {
          window.location.href = normalizeUrl(trimmed);
        } else {
          const url = SEARCH_ENGINES[engine]?.url ?? SEARCH_ENGINES.google.url;
          window.location.href = `${url}${encodeURIComponent(trimmed)}`;
        }
      },
      [engine],
    );

    return (
      <form
        className="w-full max-w-2xl relative group"
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) handleSearch(ref.current.value);
        }}
      >
        {/* glow */}
        <div
          className="absolute -inset-1 rounded-full blur-xl opacity-50 group-focus-within:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}33, transparent)`,
          }}
        />
        <div className="relative flex items-center bg-[#0c0c0e] rounded-full border border-white/[0.08] group-focus-within:border-white/20 px-5 py-3.5 shadow-2xl transition-colors duration-300">
          <Search className="text-white/25 mr-3 shrink-0" size={18} />
          <input
            ref={ref}
            placeholder="Search the web or type a URL…"
            className="w-full bg-transparent outline-none text-[15px] placeholder:text-white/20 text-white"
          />
          <kbd className="hidden sm:inline-flex text-[10px] text-white/20 bg-white/5 px-1.5 py-0.5 rounded ml-2 border border-white/10">
            /
          </kbd>
        </div>
      </form>
    );
  },
);

/* ---------- FaviconLoader ---------- */
const FaviconLoader = memo(({ url }: { url: string }) => {
  const [tier, setTier] = useState(0);
  const [errored, setErrored] = useState(false);

  const sources = [faviconSrc, fallbackFaviconSrc, directFaviconSrc];

  // Advance tier if current source yields nothing
  useEffect(() => {
    if (sources[tier]?.(url)) return;
    setTier((t) => t + 1);
  }, [tier, url]);

  if (errored || tier >= sources.length) {
    return <Globe className="w-5 h-5 text-white/25" />;
  }

  const src = sources[tier](url);
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      className="w-6 h-6 object-contain"
      onError={() => setErrored(true)}
    />
  );
});

const ShortcutCard = memo(
  ({
    shortcut,
    onDelete,
    onEdit,
    accentColor,
    isDragging,
    isDragOver,
    onDragStart,
    onDragOver,
    onDragEnter,
    onDragEnd,
    onDrop,
  }: {
    shortcut: Shortcut;
    onDelete: (id: string) => void;
    onEdit: (s: Shortcut) => void;
    accentColor: string;
    isDragging?: boolean;
    isDragOver?: boolean;
    onDragStart?: () => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDragEnter?: () => void;
    onDragEnd?: () => void;
    onDrop?: (e: React.DragEvent) => void;
  }) => {
    const iconType = shortcut.iconType ?? "emoji";
    const emojiIcon = iconType === "emoji" ? shortcut.icon?.trim() : null;
    const iconUrl = iconType === "url" ? shortcut.icon?.trim() : null;

    return (
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 ${
          isDragging
            ? "opacity-40 scale-95 border-dashed border-white/20 bg-white/[0.02]"
            : isDragOver
              ? "bg-white/[0.08] border-white/25 scale-[1.02]"
              : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:-translate-y-0.5 hover:shadow-lg"
        }`}
        style={{
          boxShadow: isDragging ? "none" : `0 8px 32px ${accentColor}0d`,
          cursor: "grab",
        }}
      >
        <a
          href={shortcut.url}
          className="flex flex-col items-center gap-2.5 w-full"
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(shortcut);
          }}
        >
          <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 overflow-hidden shrink-0">
            {emojiIcon ? (
              <span className="text-2xl">{emojiIcon}</span>
            ) : iconUrl ? (
              <img
                src={iconUrl}
                alt=""
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <FaviconLoader url={shortcut.url} />
            )}
          </div>
          <span className="text-[11px] font-medium text-white/40 group-hover:text-white/80 truncate w-full text-center transition-colors duration-300">
            {shortcut.title}
          </span>
        </a>
        {/* drag grip handle */}
        <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
          <Grip size={12} className="text-white/15 hover:text-white/40" />
        </div>
        <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit(shortcut);
            }}
            className="p-1 text-white/15 hover:text-blue-400 rounded-md hover:bg-white/5"
            title="Edit shortcut (or double-click card)"
            aria-label={`Edit ${shortcut.title}`}
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(shortcut.id);
            }}
            className="p-1 text-white/15 hover:text-red-400 rounded-md hover:bg-white/5"
            title="Remove shortcut"
            aria-label={`Remove ${shortcut.title}`}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    );
  },
);

/* ---------- ShortcutModal (Add/Edit) ---------- */
const ShortcutModal = memo(
  ({
    shortcut,
    onClose,
    onSubmit,
    accentColor,
  }: {
    shortcut?: Shortcut;
    onClose: () => void;
    onSubmit: (s: Shortcut) => void;
    accentColor: string;
  }) => {
    const isEdit = !!shortcut;
    const [title, setTitle] = useState(shortcut?.title ?? "");
    const [url, setUrl] = useState(shortcut?.url ?? "");
    const [icon, setIcon] = useState(shortcut?.icon ?? "");
    const [iconType, setIconType] = useState<"emoji" | "url">(
      shortcut?.iconType ?? "emoji",
    );
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      if (!url.trim() || !isValidUrl(url)) {
        setError("Please enter a valid URL");
        return;
      }
      onSubmit({
        id: shortcut?.id ?? crypto.randomUUID(),
        title: title.trim(),
        url: normalizeUrl(url),
        icon: icon.trim(),
        iconType,
      });
      onClose();
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          className="relative w-full max-w-sm mx-4 bg-[#111114] rounded-2xl border border-white/[0.08] p-6 shadow-2xl"
          style={{ boxShadow: `0 24px 64px ${accentColor}1a` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
          >
            <X size={18} />
          </button>
          <h2 className="text-lg font-semibold text-white mb-5">
            {isEdit ? "Edit Shortcut" : "Add Shortcut"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                Title
              </label>
              <input
                ref={inputRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. GitHub"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                URL
              </label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. github.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-wider mb-1 block">
                Icon (optional)
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setIconType("emoji")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    iconType === "emoji"
                      ? "text-white"
                      : "text-white/40 bg-white/5 hover:text-white/60"
                  }`}
                  style={iconType === "emoji" ? { backgroundColor: accentColor } : undefined}
                >
                  Emoji
                </button>
                <button
                  type="button"
                  onClick={() => setIconType("url")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    iconType === "url"
                      ? "text-white"
                      : "text-white/40 bg-white/5 hover:text-white/60"
                  }`}
                  style={iconType === "url" ? { backgroundColor: accentColor } : undefined}
                >
                  Image URL
                </button>
              </div>
              <input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder={iconType === "emoji" ? "e.g. ⚡" : "e.g. https://example.com/icon.png"}
                maxLength={iconType === "emoji" ? 2 : undefined}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors"
              />
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs">
                <AlertTriangle size={12} />
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: accentColor }}
            >
              {isEdit ? "Save Changes" : "Add Shortcut"}
            </button>
          </form>
        </div>
      </div>
    );
  },
);

/* ---------- SettingsPanel ---------- */
const SettingsPanel = memo(
  ({
    settings,
    onUpdate,
    onClose,
    onClearShortcuts,
    onExport,
    onImport,
    accentColor,
  }: {
    settings: NtpSettings;
    onUpdate: (s: NtpSettings) => void;
    onClose: () => void;
    onClearShortcuts: () => void;
    onExport: () => void;
    onImport: (backup: NtpBackup) => void;
    accentColor: string;
  }) => {
    const [confirmClear, setConfirmClear] = useState(false);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#111114] border-l border-white/[0.06] shadow-2xl overflow-y-auto animate-slide-in"
          style={{ animation: "slideIn 0.25s ease-out" }}
        >
          <div className="p-6 flex flex-col gap-8">
            {/* header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
              <button
                onClick={onClose}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* 12/24 format */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={16} />
                Time Format
              </div>
              <div className="flex gap-2">
                {(["12", "24"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => onUpdate({ ...settings, hourFormat: fmt })}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      settings.hourFormat === fmt
                        ? "text-white shadow-md"
                        : "text-white/30 bg-white/5 hover:text-white/60"
                    }`}
                    style={
                      settings.hourFormat === fmt
                        ? { backgroundColor: accentColor }
                        : undefined
                    }
                  >
                    {fmt}h
                  </button>
                ))}
              </div>
            </section>

            {/* Search engine */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Search size={16} />
                Search Engine
              </div>
              <div className="flex gap-2">
                {(
                  Object.keys(SEARCH_ENGINES) as Array<
                    keyof typeof SEARCH_ENGINES
                  >
                ).map((key) => {
                  const engineKey = key as NtpSettings["searchEngine"];
                  return (
                    <button
                      key={engineKey}
                      onClick={() =>
                        onUpdate({ ...settings, searchEngine: engineKey })
                      }
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        settings.searchEngine === engineKey
                          ? "text-white shadow-md"
                          : "text-white/30 bg-white/5 hover:text-white/60"
                      }`}
                      style={
                        settings.searchEngine === engineKey
                          ? { backgroundColor: accentColor }
                          : undefined
                      }
                    >
                      {SEARCH_ENGINES[engineKey].name}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Accent color */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Palette size={16} />
                Accent Color
              </div>
              <div className="flex gap-3">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() =>
                      onUpdate({ ...settings, accentColor: c.value })
                    }
                    className={`w-8 h-8 rounded-full transition-all duration-200 ${
                      settings.accentColor === c.value
                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#111114] scale-110"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                    aria-label={`Select ${c.name} accent`}
                  />
                ))}
              </div>
            </section>

            {/* Danger zone */}
            <section className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Monitor size={16} />
                Data
              </div>
              <div className="flex flex-col gap-2">
                  <button
                  onClick={onExport}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/70 bg-white/5 hover:bg-white/10 transition-colors w-fit"
                >
                  <Download size={14} />
                  Export backup
                </button>
                <button
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".json";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        try {
                          const data = JSON.parse(e.target?.result as string);
                          if (Array.isArray(data)) {
                            // Backwards compatible: old format (shortcuts only)
                            onImport({ version: 0, shortcuts: data, settings });
                          } else if (data && typeof data === "object" && "shortcuts" in data) {
                            // New format: full backup
                            onImport(data as NtpBackup);
                          } else {
                            alert("Invalid backup file format");
                          }
                        } catch {
                          alert("Error reading file");
                        }
                      };
                      reader.readAsText(file);
                    };
                    input.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/70 bg-white/5 hover:bg-white/10 transition-colors w-fit"
                >
                  <Upload size={14} />
                  Import backup
                </button>
              </div>
              {!confirmClear ? (
                <button
                  onClick={() => setConfirmClear(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-400 bg-red-400/5 hover:bg-red-400/10 transition-colors w-fit"
                >
                  <Trash2 size={14} />
                  Clear all shortcuts
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClearShortcuts();
                      setConfirmClear(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white bg-red-500/20 hover:bg-red-500/30 transition-colors"
                  >
                    <Check size={14} />
                    Confirm
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="px-4 py-2 rounded-xl text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  },
);

/* ---------- Add Button ---------- */
const AddButton = memo(({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border border-dashed border-white/10 hover:border-white/25 transition-all duration-300 text-white/15 hover:text-white/50 group"
  >
    <div className="w-11 h-11 flex items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-white/5">
      <Plus size={20} />
    </div>
    <span className="text-[11px] font-medium">Add shortcut</span>
  </button>
));

/* ──────────────────────────────────────────────
   Main Page
   ────────────────────────────────────────────── */
export default function NtpPage() {
  const [shortcuts, setShortcuts] = useLocalStorage<Shortcut[]>(
    STORAGE_SHORTCUTS,
    [],
  );
  const [settings, setSettings] = useLocalStorage<NtpSettings>(
    STORAGE_SETTINGS,
    DEFAULT_SETTINGS,
  );
  const [panel, setPanel] = useState<Panel>("none");
  const [editingShortcut, setEditingShortcut] = useState<Shortcut | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const deleteShortcut = useCallback(
    (id: string) => {
      setShortcuts((prev) => prev.filter((s) => s.id !== id));
    },
    [setShortcuts],
  );

  const clearShortcuts = useCallback(() => {
    setShortcuts([]);
  }, [setShortcuts]);

  const openAdd = useCallback(() => setPanel("add"), []);
  const closePanel = useCallback(() => setPanel("none"), []);
  const openSettings = useCallback(() => setPanel("settings"), []);

  const reorderShortcuts = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      setShortcuts((prev) => {
        const result = [...prev];
        const [removed] = result.splice(fromIndex, 1);
        result.splice(toIndex, 0, removed);
        return result;
      });
    },
    [setShortcuts],
  );

  const handleDragStart = useCallback(
    (index: number) => {
      setDragIndex(index);
    },
    [],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
    },
    [],
  );

  const handleDragEnter = useCallback(
    (index: number) => {
      if (dragIndex !== null && dragIndex !== index) {
        setDropIndex(index);
      }
    },
    [dragIndex],
  );

  const handleDragEnd = useCallback(() => {
    if (dragIndex !== null && dropIndex !== null) {
      reorderShortcuts(dragIndex, dropIndex);
    }
    setDragIndex(null);
    setDropIndex(null);
  }, [dragIndex, dropIndex, reorderShortcuts]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
    },
    [],
  );

  const startEdit = useCallback((s: Shortcut) => {
    setEditingShortcut(s);
    setPanel("edit");
  }, []);

  const handleModalSubmit = useCallback(
    (s: Shortcut) => {
      if (editingShortcut) {
        // Edit mode: update existing
        setShortcuts((prev) =>
          prev.map((item) => (item.id === s.id ? s : item)),
        );
      } else {
        // Add mode
        setShortcuts((prev) => [...prev, s]);
      }
      setEditingShortcut(null);
    },
    [setShortcuts, editingShortcut],
  );

  const exportSettings = useCallback(() => {
    const backup: NtpBackup = {
      version: 1,
      shortcuts,
      settings,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ntp-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [shortcuts, settings]);

  const importBackup = useCallback(
    (backup: NtpBackup) => {
      // Import shortcuts
      if (Array.isArray(backup.shortcuts)) {
        const valid = backup.shortcuts.every(
          (item) =>
            typeof item === "object" &&
            item !== null &&
            "title" in item &&
            "url" in item,
        );
        if (!valid) {
          alert("Invalid shortcut data in backup file");
          return;
        }
        const parsed: Shortcut[] = backup.shortcuts.map((item) => ({
          id: item.id ?? crypto.randomUUID(),
          title: String(item.title),
          url: String(item.url),
          icon: String(item.icon ?? ""),
          iconType: (item.iconType === "url" ? "url" : "emoji") as "emoji" | "url",
        }));
        setShortcuts(parsed);
      }

      // Import settings
      if (backup.settings && typeof backup.settings === "object") {
        const s = backup.settings;
        setSettings({
          hourFormat: s.hourFormat === "12" ? "12" : "24",
          searchEngine: ["google", "duckduckgo", "bing"].includes(s.searchEngine)
            ? s.searchEngine
            : "google",
          accentColor: typeof s.accentColor === "string" ? s.accentColor : DEFAULT_SETTINGS.accentColor,
        });
      }

      setPanel("none");
    },
    [setShortcuts, setSettings],
  );

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white flex flex-col items-center justify-center p-6 selection:bg-white/10 overflow-hidden relative">
      {/* ── mesh gradient background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.07] blur-[120px] mix-blend-screen animate-drift-1"
          style={{
            background: settings.accentColor,
            top: "-10%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] blur-[100px] mix-blend-screen animate-drift-2"
          style={{
            background:
              ACCENT_COLORS.find((c) => c.value === settings.accentColor)
                ?.name === "Indigo"
                ? "#8b5cf6"
                : settings.accentColor,
            bottom: "-15%",
            right: "-10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.04] blur-[90px] mix-blend-screen animate-drift-3"
          style={{ background: settings.accentColor, top: "40%", left: "50%" }}
        />
      </div>

      {/* ── settings cog ── */}
      <button
        onClick={openSettings}
        className="fixed top-5 right-5 z-40 p-2.5 rounded-xl text-white/20 hover:text-white/60 hover:bg-white/5 transition-all duration-300"
        aria-label="Open settings"
      >
        <Settings size={18} />
      </button>

      {/* ── main content ── */}
      <div className="z-10 w-full max-w-2xl flex flex-col items-center gap-8 md:gap-10">
        {/* greeting + clock */}
        <div className="text-center flex flex-col items-center gap-0">
          <TimeDisplay format={settings.hourFormat} />
          <Greeting />
        </div>

        {/* quote */}
        <QuoteOfTheDay />

        {/* search */}
        <SearchBar
          engine={settings.searchEngine}
          accentColor={settings.accentColor}
        />

        {/* shortcuts grid */}
        <div className="w-full">
          {shortcuts.length === 0 && panel === "none" ? (
            <div className="text-center py-8">
              <p className="text-white/20 text-sm">
                No shortcuts yet. Click + to add one.
              </p>
            </div>
          ) : null}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {shortcuts.map((s, idx) => (
              <ShortcutCard
                key={s.id}
                shortcut={s}
                onDelete={deleteShortcut}
                onEdit={startEdit}
                accentColor={settings.accentColor}
                isDragging={dragIndex === idx}
                isDragOver={dropIndex === idx}
                onDragStart={() => handleDragStart(idx)}
                onDragOver={handleDragOver}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
              />
            ))}
            <AddButton onClick={openAdd} />
          </div>
        </div>
      </div>

      {/* ── panels / modals ── */}
      {(panel === "add" || panel === "edit") && (
        <ShortcutModal
          shortcut={editingShortcut ?? undefined}
          onClose={() => {
            setEditingShortcut(null);
            closePanel();
          }}
          onSubmit={handleModalSubmit}
          accentColor={settings.accentColor}
        />
      )}
      {panel === "settings" && (
        <SettingsPanel
          settings={settings}
          onUpdate={setSettings}
          onClose={closePanel}
          onClearShortcuts={clearShortcuts}
          onExport={exportSettings}
          onImport={importBackup}
          accentColor={settings.accentColor}
        />
      )}

      {/* ── inline keyframe styles ── */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(80px, 60px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-60px, -80px); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 50px); }
        }
        .animate-drift-1 { animation: drift1 20s ease-in-out infinite; }
        .animate-drift-2 { animation: drift2 25s ease-in-out infinite; }
        .animate-drift-3 { animation: drift3 22s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
