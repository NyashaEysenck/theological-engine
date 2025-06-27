import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

const PublicRoute = ({ 
  children, 
  redirectIfAuthenticated = true, 
  redirectTo = '/dashboard' 
}: PublicRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary-200 mb-4"></div>
          <div className="h-4 w-32 bg-primary-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (redirectIfAuthenticated && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;