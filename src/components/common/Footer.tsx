import { Link } from 'react-router-dom';
import { Book, Github, Heart, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Book className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading font-semibold text-xl">It Is Written</span>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-md leading-relaxed">
              An interactive theological discernment engine designed to help Christians identify and correct common myths and misinterpretations through careful study of Scripture.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-neutral-400">
                <Heart className="h-4 w-4 mr-2 text-primary-400" />
                <span className="text-sm">Built with care for the body of Christ</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6 text-neutral-300">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/myths" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Myth Deconstruction
                </Link>
              </li>
              <li>
                <Link to="/doctrines" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  Core Doctrines
                </Link>
              </li>
              <li>
                <Link to="/query" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-3"></span>
                  Bible Query Engine
                </Link>
              </li>
              <li>
                <Link to="/scripture-context" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                  <span className="w-2 h-2 bg-sage-500 rounded-full mr-3"></span>
                  Scripture in Context
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6 text-neutral-300">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-neutral-400 hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-neutral-400 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/bible-reading" className="text-neutral-400 hover:text-white transition-colors">
                  Bible Reading Progress
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-neutral-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <p className="text-sm text-neutral-500">
                &copy; {currentYear} It Is Written. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-neutral-500">
                <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
                <span>•</span>
                <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:text-neutral-300 transition-colors">Contact</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-xs text-neutral-500 italic">
                "As the LORD lives, what the LORD says to me, that I will speak." - 1 Kings 22:14
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;