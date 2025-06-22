import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Filter, BookOpen } from 'lucide-react';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

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
    <div className="mt-24 min-h-screen bg-parchment-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary-100 rounded-2xl">
                <Search className="h-10 w-10 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Common Christian Myths
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore and understand common misconceptions about Christianity and discover their biblical corrections through careful scriptural analysis.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search myths by title or topic..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                />
              </div>
              <Button variant="outline" className="lg:w-auto">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Myths Grid */}
          {isLoading ? (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[1, 2, 3, 4].map((n) => (
                <motion.div key={n} variants={itemVariants} className="animate-pulse">
                  <div className="h-64 bg-neutral-200 rounded-xl"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {myths.map((myth, index) => (
                <motion.div
                  key={myth.id}
                  variants={itemVariants}
                  className="group bg-white p-8 rounded-xl shadow-soft border border-neutral-200 hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-primary-100 rounded-lg mr-3">
                          <BookOpen className="h-5 w-5 text-primary-600" />
                        </div>
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium">
                          {myth.category}
                        </span>
                      </div>
                      <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4 leading-tight">
                        {myth.title}
                      </h2>
                    </div>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleFavorite(myth.id)}
                        className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
                      >
                        <Heart 
                          className={`h-6 w-6 ${
                            favoriteMyths.includes(myth.id) ? 'fill-current text-primary-600' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-heading font-medium text-neutral-800 mb-3">Popular Perception:</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {myth.popularPerception}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {myth.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-sage-50 text-sage-700 text-sm rounded-full border border-sage-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {myth.tags.length > 3 && (
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-full">
                        +{myth.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Link to={`/myths/${myth.id}`}>
                    <Button variant="primary" size="sm" className="group/btn w-full">
                      Discover Biblical Truth
                      <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && myths.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-4 bg-neutral-100 rounded-2xl w-fit mx-auto mb-6">
                <Search className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                No myths found
              </h3>
              <p className="text-neutral-600 mb-8">
                No myths found matching your search. Try different keywords or browse all available content.
              </p>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MythsPage;