import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
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

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />
          <Route path="myths" element={<MythsPage />} />
          <Route path="myths/:id" element={<MythDetailPage />} />
          <Route path="doctrines" element={<DoctrinesPage />} />
          <Route path="doctrines/:id" element={<DoctrineDetailPage />} />
          <Route path="query" element={<QueryEnginePage />} />
          <Route path="scripture-context" element={<ScriptureContextPage />} />
          
          {/* Protected Routes */}
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
          
          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;