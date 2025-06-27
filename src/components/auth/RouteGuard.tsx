import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isProtectedRoute, isAuthRoute } from '../../utils/routeGuards';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const currentPath = location.pathname;

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && isAuthRoute(currentPath)) {
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
      return;
    }

    // Redirect unauthenticated users from protected routes
    if (!isAuthenticated && isProtectedRoute(currentPath)) {
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
      return;
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="p-4 bg-primary-100 rounded-2xl w-fit mx-auto mb-6">
            <Shield className="h-12 w-12 text-primary-600 animate-pulse" />
          </div>
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
            Verifying Access...
          </h2>
          <p className="text-neutral-600">Please wait while we check your permissions</p>
        </motion.div>
      </div>
    );
  }

  // Show access denied for unauthenticated users on protected routes
  if (!isAuthenticated && isProtectedRoute(location.pathname)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="p-4 bg-red-100 rounded-2xl w-fit mx-auto mb-6">
            <Lock className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
            Authentication Required
          </h2>
          <p className="text-neutral-600 mb-6">
            You need to be signed in to access this page. Please log in to continue your biblical journey.
          </p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;