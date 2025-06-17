import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import Button from '../common/Button';

const LandingNav = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Book className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-white">Scripture Threads</span>
              <div className="text-xs text-primary-200">Micaiah's Stand</div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              to="/login"
              className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20"
            >
              Sign In
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              to="/register"
              className="bg-white text-primary-800 hover:bg-secondary-50 shadow-soft"
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