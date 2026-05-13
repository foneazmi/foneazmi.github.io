import { memo, useMemo } from 'react';
import type { Experience } from '@/types';
import { MapPin, Calendar } from 'lucide-react';

interface ExperienceItemProps {
  data: Experience;
  index: number;
  isLast: boolean;
}

/**
 * Converts date string (MM/YYYY) to comparable number
 * Validates date format before conversion
 */
const toComparable = (date: string): number | null => {
  // Validate date format (MM/YYYY)
  const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  if (!dateRegex.test(date.trim())) {
    return null;
  }
  
  const [mm, yyyy] = date.split('/');
  const month = Number(mm);
  const year = Number(yyyy);
  
  // Additional validation for month range
  if (month < 1 || month > 12) {
    return null;
  }
  
  // Validate year is reasonable (1900-2100)
  if (year < 1900 || year > 2100) {
    return null;
  }
  
  return year * 100 + month;
};

export const ExperienceItem = memo(
  ({ data, index, isLast }: ExperienceItemProps) => {
    // Memoize date calculations to prevent unnecessary recalculations
    const dateRange = useMemo(() => {
      const hasPresent = data.roles.some(
        (r) => !r.endDate || r.endDate.trim() === ''
      );

      const earliestStart = data.roles.reduce(
        (acc, r) => {
          const val = toComparable(r.startDate);
          if (val === null) return acc;
          return acc === null || val < acc.val
            ? { val, str: r.startDate }
            : acc;
        },
        null as { val: number; str: string } | null
      );

      const latestEnd = data.roles.reduce(
        (acc, r) => {
          if (!r.endDate || r.endDate.trim() === '') return acc;
          const val = toComparable(r.endDate);
          if (val === null) return acc;
          return acc === null || val > acc.val
            ? { val, str: r.endDate }
            : acc;
        },
        null as { val: number; str: string } | null
      );

      return {
        startLabel: earliestStart?.str ?? '',
        endLabel: hasPresent ? 'Present' : latestEnd?.str ?? '',
      };
    }, [data.roles]);

    return (
      <div
        className="relative pl-8 md:pl-0"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Timeline Line for Mobile */}
        <div
          className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-white/10"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-[-3px] w-2 h-2 rounded-full bg-purple-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8">
          {/* Date & Company (Left) */}
          <div className="md:text-right">
            <h3 className="text-xl font-bold text-white">{data.company}</h3>
            <div className="flex items-center md:justify-end gap-2 text-sm text-neutral-400 mt-1">
              <Calendar className="w-3 h-3" aria-hidden="true" />
              <time dateTime={`${dateRange.startLabel}-${dateRange.endLabel}`}>
                {dateRange.startLabel} — {dateRange.endLabel}
              </time>
            </div>
          </div>

          {/* Timeline Dot (Center Desktop) */}
          <div className="hidden md:flex flex-col items-center relative">
            <div
              className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10 mt-2"
              aria-hidden="true"
            />
            {!isLast && (
              <div
                className="absolute top-5 -bottom-8 w-px bg-linear-to-b from-purple-500/50 to-transparent"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Roles (Right) */}
          <div className="pb-8 md:pb-0">
            {data.roles.map((role, rIdx) => (
              <div key={rIdx} className="mb-4 last:mb-0">
                <h4 className="text-lg font-medium text-purple-200">
                  {role.role}
                </h4>
                <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  <span>{role.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ExperienceItem.displayName = 'ExperienceItem';
