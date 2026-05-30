import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Portfolio from '@/pages/Portfolio';
import Experience from '@/pages/Experience';
import NtpPage from '@/pages/NtpPage';
import NotFound from '@/pages/NotFound';

export const AppRouter = () => {
  return (
    <Routes>
      {/* NTP is a top-level route — no MainLayout wrapper */}
      <Route path="ntp" element={<NtpPage />} />

      {/* All other routes use MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="experience" element={<Experience />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
