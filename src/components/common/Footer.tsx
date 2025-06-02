import { Link } from 'react-router-dom';
import { Book, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 py-8 border-t border-neutral-200 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Book className="h-5 w-5 text-primary-600" />
              <span className="font-heading font-semibold text-lg text-primary-900">Micaiah's Stand</span>
            </Link>
            <p className="text-sm text-neutral-600 mb-4">
              An interactive theological discernment engine designed to align with core biblical truths.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-medium text-sm text-neutral-800 mb-4 uppercase">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/myths" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Myth Deconstruction
                </Link>
              </li>
              <li>
                <Link to="/doctrines" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Core Doctrines
                </Link>
              </li>
              <li>
                <Link to="/query" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Bible Query Engine
                </Link>
              </li>
              <li>
                <Link to="/scripture-context" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Scripture in Context
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-medium text-sm text-neutral-800 mb-4 uppercase">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/bible-reading" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  Bible Reading Progress
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-heading font-medium text-sm text-neutral-800 mb-4 uppercase">About</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Micaiah's Stand is committed to biblical truth and accurate scriptural interpretation, helping Christians identify and correct common myths and misunderstandings.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-neutral-500 mb-4 md:mb-0">
            &copy; {currentYear} Micaiah's Stand. All rights reserved.
          </p>
          <div className="flex space-x-4 text-neutral-500">
            <a href="#" className="text-xs hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;