import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PortfolioItem } from '@/types';

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export const PortfolioCard = memo(({ item, index }: PortfolioCardProps) => {
  const hasImage = !!item.image && !item.text;
  const displayContent = item.text || item.icon;

  return (
    <a
      href={item.link || '#'}
      target={item.link ? '_blank' : undefined}
      rel={item.link ? 'noreferrer noopener' : undefined}
      className="
                group relative flex flex-col h-full rounded-3xl overflow-hidden
                glass-panel border border-white/5 hover:border-purple-500/30
                transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10
            "
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image / Cover */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
        {hasImage ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10" />
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl select-none bg-gradient-to-br from-purple-500/20 to-blue-500/20">
            {displayContent}
          </div>
        )}

        {/* Floating Action Button */}
        {item.link && (
          <div
            className="absolute top-4 right-4 z-20 w-10 h-10 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-white hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Glow Effect */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {item.title}
          </h3>

          <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3 mb-4">
            {item.description}
          </p>

          {/* Tech Stack Badges */}
          {item.stack && item.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-300 group-hover:border-purple-500/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {item.stack.length > 4 && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-300 group-hover:border-purple-500/30 transition-colors">
                  +{item.stack.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </a>
  );
});

PortfolioCard.displayName = 'PortfolioCard';
