import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Book, Menu, X, LogOut, User } from 'lucide-react';
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

  // If it's a login/register page, use simplified header
  if (isAuthPage) {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary-600" />
            <span className="font-heading font-semibold text-xl text-primary-900">Micaiah's Stand</span>
          </Link>
        </div>
      </header>
    );
  }

  // Landing page header
  if (location.pathname === '/') {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary-600" />
            <span className={`font-heading font-semibold text-xl ${
              isScrolled ? 'text-primary-900' : 'text-white'
            }`}>
              Micaiah's Stand
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button 
              variant={isScrolled ? "outline" : "ghost"} 
              size="sm" 
              onClick={() => navigate('/login')}
              className={!isScrolled ? 'text-white hover:bg-white/10' : ''}
            >
              Log In
            </Button>
            <Button 
              variant={isScrolled ? "primary" : "secondary"} 
              size="sm" 
              onClick={() => navigate('/register')}
              className={!isScrolled ? 'bg-white text-primary-900 hover:bg-white/90' : ''}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Main app header
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary-600" />
            <span className="font-heading font-semibold text-xl text-primary-900">Micaiah's Stand</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-primary-600 ${
                    isActive ? 'text-primary-600' : 'text-neutral-700'
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
            <NavLink 
              to="/myths" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-neutral-700'
                }`
              }
            >
              Myths
            </NavLink>
            <NavLink 
              to="/doctrines" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-neutral-700'
                }`
              }
            >
              Doctrines
            </NavLink>
            <NavLink 
              to="/query" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-neutral-700'
                }`
              }
            >
              Bible Query
            </NavLink>
            <NavLink 
              to="/scripture-context" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-neutral-700'
                }`
              }
            >
              Scripture Context
            </NavLink>
            {isAuthenticated && (
              <NavLink 
                to="/bible-reading" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-primary-600 ${
                    isActive ? 'text-primary-600' : 'text-neutral-700'
                  }`
                }
              >
                Bible Reading
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
                      isActive ? 'text-primary-600' : 'text-neutral-700 hover:text-primary-600'
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
                <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Log In</Button>
                <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Sign Up</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600"
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
            className="md:hidden bg-white border-t border-neutral-200"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {isAuthenticated && (
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      `px-2 py-2 text-base font-medium ${
                        isActive ? 'text-primary-600' : 'text-neutral-700'
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
                      isActive ? 'text-primary-600' : 'text-neutral-700'
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
                      isActive ? 'text-primary-600' : 'text-neutral-700'
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
                      isActive ? 'text-primary-600' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  Bible Query
                </NavLink>
                <NavLink 
                  to="/scripture-context" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium ${
                      isActive ? 'text-primary-600' : 'text-neutral-700'
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
                        isActive ? 'text-primary-600' : 'text-neutral-700'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Bible Reading
                  </NavLink>
                )}

                <div className="pt-2 border-t border-neutral-200">
                  {isAuthenticated ? (
                    <>
                      <NavLink 
                        to="/profile" 
                        className={({ isActive }) => 
                          `px-2 py-2 text-base font-medium flex items-center ${
                            isActive ? 'text-primary-600' : 'text-neutral-700'
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
                        Log In
                      </Button>
                      <Button 
                        variant="primary" 
                        fullWidth 
                        onClick={() => {
                          navigate('/register');
                          closeMenu();
                        }}
                      >
                        Sign Up
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