import { useAuth } from '../contexts/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';

// Route protection utilities
export const useRouteProtection = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  const requireAuth = () => {
    if (isLoading) return 'loading';
    if (!isAuthenticated) return 'redirect';
    return 'allowed';
  };

  const requireGuest = () => {
    if (isLoading) return 'loading';
    if (isAuthenticated) return 'redirect';
    return 'allowed';
  };

  const getRedirectPath = (fallback: string = '/') => {
    return location.state?.from?.pathname || fallback;
  };

  return {
    requireAuth,
    requireGuest,
    getRedirectPath,
    isAuthenticated,
    isLoading
  };
};

// Protected route configuration
export const PROTECTED_ROUTES = [
  '/dashboard',
  '/bible-reading',
  '/profile'
];

export const PUBLIC_ROUTES = [
  '/',
  '/myths',
  '/myths/*',
  '/doctrines',
  '/doctrines/*',
  '/query',
  '/scripture-context'
];

export const AUTH_ROUTES = [
  '/login',
  '/register'
];

export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );
};

export const isAuthRoute = (pathname: string): boolean => {
  return AUTH_ROUTES.includes(pathname);
};

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some(route => {
    if (route.endsWith('/*')) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return pathname === route;
  });
};