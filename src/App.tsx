import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import MythsPage from './pages/MythsPage';
import MythDetailPage from './pages/MythDetailPage';
import DoctrinesPage from './pages/DoctrinesPage';
import DoctrineDetailPage from './pages/DoctrineDetailPage';
import QueryEnginePage from './pages/QueryEnginePage';
import ScriptureContextPage from './pages/ScriptureContextPage';
import BibleReadingPage from './pages/BibleReadingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Components
import { useAuth } from './contexts/AuthContext';

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* Landing Page - Public */}
        <Route index element={<LandingPage />} />

        {/* Main App Routes */}
        <Route path="/" element={<MainLayout />}>
          {/* Protected Routes - Require Authentication */}
          {isAuthenticated && (
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="bible-reading" element={<BibleReadingPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </>
          )}
          
          {/* Public Routes - Available to all users */}
          <Route path="myths" element={<MythsPage />} />
          <Route path="myths/:id" element={<MythDetailPage />} />
          <Route path="doctrines" element={<DoctrinesPage />} />
          <Route path="doctrines/:id" element={<DoctrineDetailPage />} />
          <Route path="query" element={<QueryEnginePage />} />
          <Route path="scripture-context" element={<ScriptureContextPage />} />
          
          {/* Auth Routes - Only show if not authenticated */}
          {!isAuthenticated && (
            <>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </>
          )}
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;