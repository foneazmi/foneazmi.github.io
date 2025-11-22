import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="portfolio" element={<Portfolio />} />
            </Route>
        </Routes>
    );
};
