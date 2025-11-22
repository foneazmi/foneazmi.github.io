import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { FloatingDock } from '../components/layout/FloatingDock';

const MainLayout = () => {
    const { pathname } = useLocation();

    // Reset scroll when route changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return (
        <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-purple-200">

            {/* Background Effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse mix-blend-screen"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-float"></div>
            </div>

            {/* Navigation */}
            <FloatingDock />

            {/* Main Content */}
            <main className="min-h-screen flex flex-col pb-24 relative z-0">
                <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
