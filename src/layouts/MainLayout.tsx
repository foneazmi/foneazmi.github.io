import { memo, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FloatingDock } from '@/components/layout/FloatingDock';

const MainLayout = memo(() => {
  const { pathname } = useLocation();

  // Reset scroll when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen text-white selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Effects */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse mix-blend-screen" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse mix-blend-screen"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] animate-float" />
      </div>

      {/* Navigation */}
      <FloatingDock />

      {/* Main Content */}
      <main className="min-h-screen flex flex-col pb-24 relative z-0">
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 flex flex-col justify-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
