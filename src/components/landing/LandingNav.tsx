import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import Button from '../common/Button';

const LandingNav = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-white" />
            <span className="font-heading font-semibold text-xl text-white">Micaiah's Stand</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              to="/login"
              className="text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              to="/register"
              className="bg-white text-primary-600 hover:bg-white/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;