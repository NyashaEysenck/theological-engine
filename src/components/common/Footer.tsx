import { Link } from 'react-router-dom';
import { Book, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 py-12 border-t border-primary-800 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Book className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">Scripture Threads</span>
                <div className="text-xs text-primary-200">Micaiah's Stand</div>
              </div>
            </div>
            <p className="text-sm text-primary-200 mb-4">
              An AI-powered biblical study platform for intelligent scriptural exploration.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-medium text-sm text-white mb-4 uppercase">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/myths" className="text-sm text-primary-200 hover:text-white transition-colors">
                  Myth Deconstruction
                </Link>
              </li>
              <li>
                <Link to="/doctrines" className="text-sm text-primary-200 hover:text-white transition-colors">
                  Core Doctrines
                </Link>
              </li>
              <li>
                <Link to="/query" className="text-sm text-primary-200 hover:text-white transition-colors">
                  AI Query Engine
                </Link>
              </li>
              <li>
                <Link to="/scripture-context" className="text-sm text-primary-200 hover:text-white transition-colors">
                  Scripture in Context
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-medium text-sm text-white mb-4 uppercase">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-primary-200 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-primary-200 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/bible-reading" className="text-sm text-primary-200 hover:text-white transition-colors">
                  Scripture Threads
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-primary-200 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-medium text-sm text-white mb-4 uppercase">About</h3>
            <p className="text-sm text-primary-200 mb-4">
              Scripture Threads combines ancient wisdom with intelligent discovery for deeper biblical understanding.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-primary-300 mb-4 md:mb-0">
            &copy; {currentYear} Scripture Threads. All rights reserved.
          </p>
          <div className="flex space-x-4 text-primary-300">
            <a href="#" className="text-xs hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;