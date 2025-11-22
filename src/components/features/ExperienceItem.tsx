import type { Experience } from '../../types';
import { MapPin, Calendar } from 'lucide-react';

export const ExperienceItem = ({ data, index, isLast }: { data: Experience, index: number, isLast: boolean }) => {
    return (
        <div
            className="relative pl-8 md:pl-0"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Timeline Line for Mobile */}
            <div className="md:hidden absolute left-0 top-2 bottom-0 w-px bg-white/10">
                <div className="absolute top-0 left-[-3px] w-2 h-2 rounded-full bg-purple-500"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8">

                {/* Date & Company (Left) */}
                <div className="md:text-right">
                    <h3 className="text-xl font-bold text-white">{data.company}</h3>
                    <div className="flex items-center md:justify-end gap-2 text-sm text-neutral-400 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>{data.roles[0].startDate} — {data.roles[0].endDate || 'Present'}</span>
                    </div>
                </div>

                {/* Timeline Dot (Center Desktop) */}
                <div className="hidden md:flex flex-col items-center relative">
                    <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] z-10 mt-2"></div>
                    {!isLast && (
                        <div className="absolute top-5 bottom-[-32px] w-px bg-gradient-to-b from-purple-500/50 to-transparent"></div>
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
                                <MapPin className="w-3 h-3" />
                                {role.location}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
