import { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BoltBadge from '../components/common/BoltBadge';
import ConnectionStatus from '../components/common/ConnectionStatus';
import { useAuth } from '../contexts/AuthContext';

const MainLayout = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header transparency effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Protected routes check
  const protectedRoutes = ['/dashboard', '/bible-reading', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Auth routes check
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.includes(pathname);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname } }} replace />;
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Determine if this is a login/register page
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <Header isScrolled={isScrolled} isAuthPage={isAuthPage} />
      <ConnectionStatus />
      <BoltBadge />
      
      <main className="flex-grow">
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="container mx-auto px-4 py-6 md:py-8"
        >
          <Outlet />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;