export const Marquee = ({ skills }: { skills: any }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-full overflow-hidden pointer-events-none opacity-30 z-0">
      {/* Gradient Masks for Edges and Center */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_20%,#030014_100%)]"></div>
      <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#030014] to-transparent z-20"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#030014] to-transparent z-20"></div>

      {/* First Diagonal - Top-Left to Bottom-Right */}
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center mix-blend-screen"
        style={{ transform: "rotate(-15deg) scale(1.2)" }}
      >
        <div className="flex gap-8 whitespace-nowrap animate-marquee-diagonal-1">
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={`diag1-${index}`}
              className="px-6 py-3 rounded-2xl bg-white/5 text-purple-200/80 text-lg font-medium border border-purple-500/20 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]"
            >
              {skill}
            </span>
          ))}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={`diag1-dup-${index}`}
              className="px-6 py-3 rounded-2xl bg-white/5 text-purple-200/80 text-lg font-medium border border-purple-500/20 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Second Diagonal - Top-Right to Bottom-Left */}
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center mix-blend-screen"
        style={{ transform: "rotate(15deg) scale(1.2)" }}
      >
        <div className="flex gap-8 whitespace-nowrap animate-marquee-diagonal-2">
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={`diag2-${index}`}
              className="px-6 py-3 rounded-2xl bg-white/5 text-blue-200/80 text-lg font-medium border border-blue-500/20 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              {skill}
            </span>
          ))}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <span
              key={`diag2-dup-${index}`}
              className="px-6 py-3 rounded-2xl bg-white/5 text-blue-200/80 text-lg font-medium border border-blue-500/20 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
