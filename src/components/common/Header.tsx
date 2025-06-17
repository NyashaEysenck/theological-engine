import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Book, Menu, X, LogOut, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

interface HeaderProps {
  isScrolled: boolean;
  isAuthPage: boolean;
}

const Header = ({ isScrolled, isAuthPage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  // If it's a login/register page or landing page, use simplified header
  if (isAuthPage || location.pathname === '/') {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-primary-700' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <Book className={`h-5 w-5 ${isScrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <span className={`font-heading font-bold text-xl transition-colors ${
                isScrolled ? 'text-primary-800' : 'text-white'
              }`}>
                Scripture Threads
              </span>
              <div className={`text-xs transition-colors ${
                isScrolled ? 'text-primary-600' : 'text-primary-200'
              }`}>
                Micaiah's Stand
              </div>
            </div>
          </Link>
          {location.pathname === '/' && (
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/login')}
                className={`transition-colors ${
                  isScrolled 
                    ? 'border-primary-300 text-primary-700 hover:bg-primary-50' 
                    : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                Sign In
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate('/register')}
                className="bg-primary-700 hover:bg-primary-800 text-white shadow-soft"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-700 rounded-xl flex items-center justify-center">
              <Book className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-heading font-bold text-xl text-primary-800">Scripture Threads</span>
              <div className="text-xs text-primary-600">Micaiah's Stand</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-primary-700 ${
                    isActive ? 'text-primary-700' : 'text-neutral-700'
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
            <NavLink 
              to="/myths" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-700 ${
                  isActive ? 'text-primary-700' : 'text-neutral-700'
                }`
              }
            >
              Myths
            </NavLink>
            <NavLink 
              to="/doctrines" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-700 ${
                  isActive ? 'text-primary-700' : 'text-neutral-700'
                }`
              }
            >
              Doctrines
            </NavLink>
            <NavLink 
              to="/query" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-700 ${
                  isActive ? 'text-primary-700' : 'text-neutral-700'
                }`
              }
            >
              AI Query
            </NavLink>
            <NavLink 
              to="/scripture-context" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-700 ${
                  isActive ? 'text-primary-700' : 'text-neutral-700'
                }`
              }
            >
              Scripture Context
            </NavLink>
            {isAuthenticated && (
              <NavLink 
                to="/bible-reading" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-primary-700 ${
                    isActive ? 'text-primary-700' : 'text-neutral-700'
                  }`
                }
              >
                Scripture Threads
              </NavLink>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <NavLink 
                  to="/profile"
                  className={({ isActive }) => 
                    `flex items-center space-x-1 text-sm font-medium ${
                      isActive ? 'text-primary-700' : 'text-neutral-700 hover:text-primary-700'
                    }`
                  }
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </NavLink>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Get Started</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-700 hover:text-primary-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-secondary-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {isAuthenticated && (
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      `px-2 py-2 text-base font-medium ${
                        isActive ? 'text-primary-700' : 'text-neutral-700'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink 
                  to="/myths" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium ${
                      isActive ? 'text-primary-700' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Myths
                </NavLink>
                <NavLink 
                  to="/doctrines" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium ${
                      isActive ? 'text-primary-700' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Doctrines
                </NavLink>
                <NavLink 
                  to="/query" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium ${
                      isActive ? 'text-primary-700' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  AI Query
                </NavLink>
                <NavLink 
                  to="/scripture-context" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium ${
                      isActive ? 'text-primary-700' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Scripture Context
                </NavLink>
                {isAuthenticated && (
                  <NavLink 
                    to="/bible-reading" 
                    className={({ isActive }) => 
                      `px-2 py-2 text-base font-medium ${
                        isActive ? 'text-primary-700' : 'text-neutral-700'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Scripture Threads
                  </NavLink>
                )}

                <div className="pt-2 border-t border-secondary-200">
                  {isAuthenticated ? (
                    <>
                      <NavLink 
                        to="/profile" 
                        className={({ isActive }) => 
                          `px-2 py-2 text-base font-medium flex items-center ${
                            isActive ? 'text-primary-700' : 'text-neutral-700'
                          }`
                        }
                        onClick={closeMenu}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Profile
                      </NavLink>
                      <button 
                        className="px-2 py-2 text-base font-medium text-neutral-700 w-full text-left flex items-center"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 pt-2">
                      <Button 
                        variant="outline" 
                        fullWidth 
                        onClick={() => {
                          navigate('/login');
                          closeMenu();
                        }}
                      >
                        Sign In
                      </Button>
                      <Button 
                        variant="primary" 
                        fullWidth 
                        onClick={() => {
                          navigate('/register');
                          closeMenu();
                        }}
                      >
                        Get Started
                      </Button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;