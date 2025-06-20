import { Link } from 'react-router-dom';
import { Book, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 py-12 border-t border-primary-800 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Book className="h-5 w-5 text-secondary-300" />
              <span className="font-heading font-semibold text-lg text-white">Micaiah's Stand</span>
            </Link>
            <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
              An interactive theological discernment engine designed to align with core biblical truths.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-medium text-sm text-white mb-6 uppercase tracking-wider">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/myths" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Myth Deconstruction
                </Link>
              </li>
              <li>
                <Link to="/doctrines" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Core Doctrines
                </Link>
              </li>
              <li>
                <Link to="/query" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Bible Query Engine
                </Link>
              </li>
              <li>
                <Link to="/scripture-context" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Scripture in Context
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-medium text-sm text-white mb-6 uppercase tracking-wider">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/bible-reading" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  Bible Reading Progress
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-neutral-300 hover:text-secondary-300 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-body font-medium text-sm text-white mb-6 uppercase tracking-wider">About</h3>
            <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
              Micaiah's Stand is committed to biblical truth and accurate scriptural interpretation, helping Christians identify and correct common myths and misunderstandings.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-neutral-400 mb-4 md:mb-0">
            &copy; {currentYear} Micaiah's Stand. All rights reserved.
          </p>
          <div className="flex space-x-6 text-neutral-400">
            <a href="#" className="text-xs hover:text-secondary-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-secondary-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;