import { useMe } from '../context/MeContext';
import { PortfolioCard } from '../components/features/PortfolioCard';

const Portfolio = () => {
    const data = useMe();
    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-fade-in">
            {/* Header */}
            <section className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Portfolio
                </h1>
                <p className="text-neutral-400 max-w-2xl">
                    A collection of projects, apps, and experiments I've worked on.
                </p>
            </section>

            {/* Projects Grid */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.portfolio.map((item, index) => (
                        <PortfolioCard key={index} item={item} index={index} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
