import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import Experience from '../pages/Experience';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="experience" element={<Experience />} />
            </Route>
        </Routes>
    );
};
