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
        isScrolled ? 'bg-white shadow-card py-3' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-primary-900" />
            <span className="font-heading font-semibold text-xl text-primary-900">Micaiah's Stand</span>
          </Link>
          {location.pathname === '/' && (
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>Log In</Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Sign Up</Button>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-card py-3' : 'bg-primary-900 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Book className={`h-6 w-6 ${isScrolled ? 'text-primary-900' : 'text-white'}`} />
            <span className={`font-heading font-semibold text-xl ${isScrolled ? 'text-primary-900' : 'text-white'}`}>
              Micaiah's Stand
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-secondary-400 tracking-wide ${
                    isActive 
                      ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                      : (isScrolled ? 'text-neutral-700' : 'text-white')
                  }`
                }
              >
                DASHBOARD
              </NavLink>
            )}
            <NavLink 
              to="/myths" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-secondary-400 tracking-wide ${
                  isActive 
                    ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                    : (isScrolled ? 'text-neutral-700' : 'text-white')
                }`
              }
            >
              MYTHS
            </NavLink>
            <NavLink 
              to="/doctrines" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-secondary-400 tracking-wide ${
                  isActive 
                    ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                    : (isScrolled ? 'text-neutral-700' : 'text-white')
                }`
              }
            >
              DOCTRINES
            </NavLink>
            <NavLink 
              to="/query" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-secondary-400 tracking-wide ${
                  isActive 
                    ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                    : (isScrolled ? 'text-neutral-700' : 'text-white')
                }`
              }
            >
              BIBLE QUERY
            </NavLink>
            <NavLink 
              to="/scripture-context" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-secondary-400 tracking-wide ${
                  isActive 
                    ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                    : (isScrolled ? 'text-neutral-700' : 'text-white')
                }`
              }
            >
              SCRIPTURE CONTEXT
            </NavLink>
            {isAuthenticated && (
              <NavLink 
                to="/bible-reading" 
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-secondary-400 tracking-wide ${
                    isActive 
                      ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                      : (isScrolled ? 'text-neutral-700' : 'text-white')
                  }`
                }
              >
                BIBLE READING
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
                      isActive 
                        ? (isScrolled ? 'text-primary-900' : 'text-secondary-300') 
                        : (isScrolled ? 'text-neutral-700 hover:text-primary-900' : 'text-white hover:text-secondary-300')
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
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-neutral-700 hover:text-primary-900' : 'text-white hover:text-secondary-300'
            }`}
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
            className="md:hidden bg-white border-t border-neutral-200 shadow-card"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-6">
                {isAuthenticated && (
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => 
                      `px-2 py-2 text-base font-medium tracking-wide ${
                        isActive ? 'text-primary-900' : 'text-neutral-700'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    DASHBOARD
                  </NavLink>
                )}
                <NavLink 
                  to="/myths" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium tracking-wide ${
                      isActive ? 'text-primary-900' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  MYTHS
                </NavLink>
                <NavLink 
                  to="/doctrines" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium tracking-wide ${
                      isActive ? 'text-primary-900' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  DOCTRINES
                </NavLink>
                <NavLink 
                  to="/query" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium tracking-wide ${
                      isActive ? 'text-primary-900' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  BIBLE QUERY
                </NavLink>
                <NavLink 
                  to="/scripture-context" 
                  className={({ isActive }) => 
                    `px-2 py-2 text-base font-medium tracking-wide ${
                      isActive ? 'text-primary-900' : 'text-neutral-700'
                    }`
                  }
                  onClick={closeMenu}
                >
                  SCRIPTURE CONTEXT
                </NavLink>
                {isAuthenticated && (
                  <NavLink 
                    to="/bible-reading" 
                    className={({ isActive }) => 
                      `px-2 py-2 text-base font-medium tracking-wide ${
                        isActive ? 'text-primary-900' : 'text-neutral-700'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    BIBLE READING
                  </NavLink>
                )}

                <div className="pt-4 border-t border-neutral-200">
                  {isAuthenticated ? (
                    <>
                      <NavLink 
                        to="/profile" 
                        className={({ isActive }) => 
                          `px-2 py-2 text-base font-medium flex items-center ${
                            isActive ? 'text-primary-900' : 'text-neutral-700'
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
                    <div className="flex flex-col space-y-3 pt-2">
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