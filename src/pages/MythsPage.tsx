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
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
            Common Christian Myths
          </h1>
          <p className="text-lg text-neutral-700 mb-8">
            Explore and understand common misconceptions about Christianity and their biblical corrections.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search myths..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Myths List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="h-32 bg-neutral-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {myths.map((myth) => (
                <motion.div
                  key={myth.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-heading font-semibold text-neutral-900">
                      {myth.title}
                    </h2>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleFavorite(myth.id)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {favoriteMyths.includes(myth.id) ? (
                          <Star className="h-6 w-6 fill-current" />
                        ) : (
                          <StarOff className="h-6 w-6" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <p className="text-neutral-700 mb-4">
                    {myth.popularPerception}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {myth.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/myths/${myth.id}`}>
                    <Button variant="outline" size="sm">
                      View Biblical Truth
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && myths.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No myths found matching your search.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MythsPage;