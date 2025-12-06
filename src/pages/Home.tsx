import { useState } from "react";
import { useMe } from "../context/MeContext";
import {
  IconGitHub,
  IconLinkedIn,
  IconTelegram,
  IconWhatsapp,
  IconEmail,
} from "../components/common/Icons";

import { MapPin } from "lucide-react";
import { Marquee } from "@/components/common/Marquee";

// Helper for conditional icon rendering
const SocialIcon = ({
  type,
  className,
}: {
  type: string;
  className?: string;
}) => {
  switch (type) {
    case "gh":
      return <IconGitHub className={className} />;
    case "li":
      return <IconLinkedIn className={className} />;
    case "tg":
      return <IconTelegram className={className} />;
    case "wa":
      return <IconWhatsapp className={className} />;
    case "email":
      return <IconEmail className={className} />;
    default:
      return null;
  }
};

const Home = () => {
  const data = useMe();
  const [isWaving, setIsWaving] = useState(false);

  const triggerWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-3xl">🙈 🙉 🙊</span>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-3xl">☠️</span>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section with Marquee Background */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* X-Crossing Marquee Background - Edge to Edge */}
        <Marquee skills={data.skills} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto w-full animate-fade-in space-y-12">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Photo */}
            <div
              className="relative shrink-0 group cursor-pointer select-none mx-auto md:mx-0"
              onClick={triggerWave}
            >
              <img
                src={data.photo}
                srcSet={`${data.photo}&s=160 1x, ${data.photo}&s=320 2x, ${data.photo}&s=480 3x`}
                alt={data.name}
                className="relative w-40 h-40 rounded-4xl object-cover shadow-2xl ring-4 ring-white dark:ring-neutral-900 z-10"
              />
              <div
                className={`absolute bottom-2 right-2 z-20 p-2 rounded-2xl bg-white/15 text-white shadow-lg shadow-purple-500/20 glass backdrop-blur-xl`}
              >
                <span
                  className={`text-2xl wave-on-group-hover ${
                    isWaving ? "animate-wave" : ""
                  }`}
                >
                  👋
                </span>
              </div>
            </div>

            {/* Info & Description */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              {/* Name & Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {data.name}
                </h1>
                <p className="text-lg text-purple-200/80 mb-4">{data.job}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-neutral-400 text-xs border border-white/5">
                    <MapPin className="w-3 h-3 text-purple-400" />
                    Remote / Worldwide
                  </div>
                  <div className="px-3 py-1.5 rounded-lg glass text-xs text-green-400 border border-green-500/20 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Available for work
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-400 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider text-center md:text-left">
              Contact
            </h2>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {data.contacts
                .filter((c) => c.enable)
                .map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors group border border-white/5"
                  >
                    <SocialIcon
                      type={contact.type}
                      className="w-4 h-4 text-neutral-400 group-hover:text-purple-400 transition-colors"
                    />
                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                      {contact.type === "gh"
                        ? "GitHub"
                        : contact.type === "li"
                        ? "LinkedIn"
                        : contact.type === "email"
                        ? "Email"
                        : contact.type}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
