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
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-heading font-bold text-primary-900 mb-6">
              Core Christian Doctrines
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
              Explore foundational biblical teachings and understand their significance for faith and practice.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search doctrines..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-6 py-4 border-2 border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-lg"
            />
          </div>

          {/* Doctrines List */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="h-48 bg-neutral-100 rounded-2xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {doctrines.map((doctrine) => (
                <motion.div
                  key={doctrine.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-200"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-heading font-semibold text-primary-900 leading-tight">
                      {doctrine.title}
                    </h2>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleFavorite(doctrine.id)}
                        className="text-primary-900 hover:text-primary-700 transition-colors"
                      >
                        <Heart 
                          className={`h-6 w-6 ${
                            favoriteDoctrine.includes(doctrine.id) ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  <p className="text-neutral-700 mb-6 leading-relaxed text-lg">
                    {doctrine.summary}
                  </p>
                  
                  <div className="mb-6">
                    <span className="px-4 py-2 bg-primary-50 text-primary-900 text-sm rounded-full border border-primary-200">
                      {doctrine.category}
                    </span>
                  </div>
                  
                  <Link to={`/doctrines/${doctrine.id}`}>
                    <Button variant="outline" size="md">
                      Explore Doctrine
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && doctrines.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">No doctrines found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DoctrinesPage;