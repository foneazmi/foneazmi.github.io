import { useState } from 'react';
import { DATA } from '../data';
import {
    IconGitHub, IconLinkedIn, IconTelegram, IconWhatsapp, IconEmail
} from '../components/common/Icons';

import { MapPin } from 'lucide-react';

// Helper for conditional icon rendering
const SocialIcon = ({ type, className }: { type: string, className?: string }) => {
    switch (type) {
        case 'gh': return <IconGitHub className={className} />;
        case 'li': return <IconLinkedIn className={className} />;
        case 'tg': return <IconTelegram className={className} />;
        case 'wa': return <IconWhatsapp className={className} />;
        case 'email': return <IconEmail className={className} />;
        default: return null;
    }
};

const Home = () => {
    const [isWaving, setIsWaving] = useState(false);

    const triggerWave = () => {
        setIsWaving(true);
        setTimeout(() => setIsWaving(false), 2000);
    };

    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section with Marquee Background */}
            <section className="relative min-h-[70vh] flex items-center">
                {/* X-Crossing Marquee Background - Edge to Edge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-full overflow-hidden pointer-events-none opacity-30 z-0">

                    {/* Gradient Masks for Edges and Center */}
                    <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_20%,#030014_100%)]"></div>
                    <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#030014] to-transparent z-20"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#030014] to-transparent z-20"></div>

                    {/* First Diagonal - Top-Left to Bottom-Right */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center mix-blend-screen" style={{ transform: 'rotate(-15deg) scale(1.2)' }}>
                        <div className="flex gap-8 whitespace-nowrap animate-marquee-diagonal-1">
                            {[...DATA.skills, ...DATA.skills, ...DATA.skills].map((skill, index) => (
                                <span
                                    key={`diag1-${index}`}
                                    className="px-6 py-3 rounded-2xl bg-white/5 text-purple-200/80 text-lg font-medium border border-purple-500/20 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                                >
                                    {skill}
                                </span>
                            ))}
                            {[...DATA.skills, ...DATA.skills, ...DATA.skills].map((skill, index) => (
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
                    <div className="absolute top-0 left-0 w-full h-full flex items-center mix-blend-screen" style={{ transform: 'rotate(15deg) scale(1.2)' }}>
                        <div className="flex gap-8 whitespace-nowrap animate-marquee-diagonal-2">
                            {[...DATA.skills, ...DATA.skills, ...DATA.skills].map((skill, index) => (
                                <span
                                    key={`diag2-${index}`}
                                    className="px-6 py-3 rounded-2xl bg-white/5 text-blue-200/80 text-lg font-medium border border-blue-500/20 whitespace-nowrap backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                >
                                    {skill}
                                </span>
                            ))}
                            {[...DATA.skills, ...DATA.skills, ...DATA.skills].map((skill, index) => (
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

                {/* Hero Content */}
                <div className="relative z-10 max-w-3xl mx-auto w-full animate-fade-in space-y-12">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        {/* Photo */}
                        <div
                            className="relative shrink-0 group cursor-pointer select-none mx-auto md:mx-0"
                            onClick={triggerWave}
                        >
                            <img
                                src={DATA.photo}
                                alt={DATA.name}
                                className="relative w-40 h-40 rounded-4xl object-cover shadow-2xl ring-4 ring-white dark:ring-neutral-900 z-10"
                            />
                            <div className={`absolute bottom-2 right-2 z-20 p-2 rounded-2xl bg-white/15 text-white shadow-lg shadow-purple-500/20 glass backdrop-blur-xl`}>
                                <span className={`text-2xl wave-on-group-hover ${isWaving ? 'animate-wave' : ''}`}>👋</span>
                            </div>
                        </div>

                        {/* Info & Description */}
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            {/* Name & Title */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {DATA.name}
                                </h1>
                                <p className="text-lg text-purple-200/80 mb-4">
                                    {DATA.job}
                                </p>
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
                                {DATA.description}
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider text-center md:text-left">Contact</h2>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {DATA.contacts.filter(c => c.enable).map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={contact.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/10 transition-colors group border border-white/5"
                                >
                                    <SocialIcon type={contact.type} className="w-4 h-4 text-neutral-400 group-hover:text-purple-400 transition-colors" />
                                    <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                                        {contact.type === 'gh' ? 'GitHub' : contact.type === 'li' ? 'LinkedIn' : contact.type === 'email' ? 'Email' : contact.type}
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
