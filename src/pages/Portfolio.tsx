import { memo } from 'react';
import { useMe } from '@/context/MeContext';
import { PortfolioCard } from '@/components/features/PortfolioCard';

const Portfolio = memo(() => {
  const data = useMe();

  if (data.loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-label="Loading portfolio"
      >
        <span className="text-3xl">🙈 🙉 🙊</span>
      </div>
    );
  }

  if (data.error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="alert"
        aria-label="Error loading portfolio"
      >
        <span className="text-3xl">☠️</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-fade-in">
      {/* Header */}
      <section className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Portfolio</h1>
        <p className="text-neutral-400 max-w-2xl">
          A collection of projects, apps, and experiments I've worked on.
        </p>
      </section>

      {/* Projects Grid */}
      <section aria-label="Portfolio projects">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.portfolio.map((item, index) => (
            <PortfolioCard key={`${item.title}-${index}`} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
