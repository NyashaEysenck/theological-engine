import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { contentService } from '../services/contentService';
import { Doctrine } from '../types/content';
import Button from '../components/common/Button';

const DoctrinesPage = () => {
  const [doctrines, setDoctrines] = useState<Doctrine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { favoriteDoctrine, toggleFavoriteDoctrine } = useUserProgress();

  useEffect(() => {
    const loadDoctrines = async () => {
      try {
        const data = await contentService.getDoctrines(searchTerm);
        setDoctrines(data);
      } catch (error) {
        console.error('Error loading doctrines:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctrines();
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleFavorite = async (doctrineId: string) => {
    if (!isAuthenticated) return;
    await toggleFavoriteDoctrine(doctrineId);
  };

  return (
    <div className="mt-24">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
            Core Christian Doctrines
          </h1>
          <p className="text-lg text-neutral-700 mb-8">
            Explore foundational biblical teachings and understand their significance for faith and practice.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search doctrines..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Doctrines List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="h-40 bg-neutral-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {doctrines.map((doctrine) => (
                <motion.div
                  key={doctrine.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-heading font-semibold text-neutral-900">
                      {doctrine.title}
                    </h2>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleFavorite(doctrine.id)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <Heart 
                          className={`h-6 w-6 ${
                            favoriteDoctrine.includes(doctrine.id) ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  <p className="text-neutral-700 mb-4">
                    {doctrine.summary}
                  </p>
                  
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full">
                      {doctrine.category}
                    </span>
                  </div>
                  
                  <Link to={`/doctrines/${doctrine.id}`}>
                    <Button variant="outline" size="sm">
                      Explore Doctrine
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && doctrines.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No doctrines found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctrinesPage;