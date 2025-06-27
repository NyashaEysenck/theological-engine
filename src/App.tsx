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

// Protected Routes
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

function App() {
  const location = useLocation();

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
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="bible-reading" 
            element={
              <ProtectedRoute>
                <BibleReadingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes - Available to all users */}
          <Route path="myths" element={<MythsPage />} />
          <Route path="myths/:id" element={<MythDetailPage />} />
          <Route path="doctrines" element={<DoctrinesPage />} />
          <Route path="doctrines/:id" element={<DoctrineDetailPage />} />
          <Route path="query" element={<QueryEnginePage />} />
          <Route path="scripture-context" element={<ScriptureContextPage />} />
          
          {/* Auth Routes - Redirect if already authenticated */}
          <Route 
            path="login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;