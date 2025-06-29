import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

const LandingFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6 text-neutral-300">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/myths" className="text-neutral-400 hover:text-white transition-colors">
                  Myth Deconstruction
                </Link>
              </li>
              <li>
                <Link to="/doctrines" className="text-neutral-400 hover:text-white transition-colors">
                  Core Doctrines
                </Link>
              </li>
              <li>
                <Link to="/query" className="text-neutral-400 hover:text-white transition-colors">
                  Bible Query Engine
                </Link>
              </li>
              <li>
                <Link to="/bible-reading" className="text-neutral-400 hover:text-white transition-colors">
                  Bible Reading
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-6 text-neutral-300">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/register" className="text-neutral-400 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-500 mb-4 md:mb-0">
            © {currentYear} It Is Written. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;