import { memo } from 'react';
import { useMe } from '@/context/MeContext';
import { ExperienceItem } from '@/components/features/ExperienceItem';

const Experience = memo(() => {
  const data = useMe();

  if (data.loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="status"
        aria-label="Loading experience"
      >
        <span className="text-3xl">🙈 🙉 🙊</span>
      </div>
    );
  }

  // Offline-first: Show error only if we have no data at all
  // If API fails but we have cached data, show the cached data instead
  if (data.error && !data.name) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        role="alert"
        aria-label="Error loading experience"
      >
        <span className="text-3xl">☠️</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Experience
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          My professional journey and work history
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-8 pt-8">
        {data.experiences.map((exp, idx) => (
          <ExperienceItem
            key={`${exp.company}-${idx}`}
            data={exp}
            index={idx}
            isLast={idx === data.experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
});

Experience.displayName = 'Experience';

export default Experience;
