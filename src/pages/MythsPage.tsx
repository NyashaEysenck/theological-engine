import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, StarOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { contentService } from '../services/contentService';
import { Myth } from '../types/content';
import Button from '../components/common/Button';

const MythsPage = () => {
  const [myths, setMyths] = useState<Myth[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { favoriteMyths, toggleFavoriteMyth } = useUserProgress();

  useEffect(() => {
    const loadMyths = async () => {
      try {
        const data = await contentService.getMyths(searchTerm);
        setMyths(data);
      } catch (error) {
        console.error('Error loading myths:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMyths();
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleFavorite = async (mythId: string) => {
    if (!isAuthenticated) return;
    await toggleFavoriteMyth(mythId);
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
              Common Christian Myths
            </h1>
            <p className="text-xl text-neutral-700 leading-relaxed max-w-3xl mx-auto">
              Explore and understand common misconceptions about Christianity and their biblical corrections.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search myths..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 pr-6 py-4 border-2 border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-lg"
            />
          </div>

          {/* Myths List */}
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
              {myths.map((myth) => (
                <motion.div
                  key={myth.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-neutral-200"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-heading font-semibold text-primary-900 leading-tight">
                      {myth.title}
                    </h2>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleFavorite(myth.id)}
                        className="text-primary-900 hover:text-primary-700 transition-colors"
                      >
                        {favoriteMyths.includes(myth.id) ? (
                          <Star className="h-6 w-6 fill-current" />
                        ) : (
                          <StarOff className="h-6 w-6" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <p className="text-neutral-700 mb-6 leading-relaxed text-lg">
                    {myth.popularPerception}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {myth.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-primary-50 text-primary-900 text-sm rounded-full border border-primary-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/myths/${myth.id}`}>
                    <Button variant="outline" size="md">
                      View Biblical Truth
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && myths.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg">No myths found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MythsPage;