import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Shield, BookOpen, Filter } from 'lucide-react';
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

  const getCategoryColor = (category: string) => {
    const colors = {
      'Theology Proper': 'bg-primary-50 text-primary-700 border-primary-200',
      'Soteriology': 'bg-secondary-50 text-secondary-700 border-secondary-200',
      'Bibliology': 'bg-accent-50 text-accent-700 border-accent-200',
      'Christology': 'bg-sage-50 text-sage-700 border-sage-200',
      'Pneumatology': 'bg-parchment-50 text-parchment-700 border-parchment-200'
    };
    return colors[category as keyof typeof colors] || 'bg-neutral-50 text-neutral-700 border-neutral-200';
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
              <div className="p-4 bg-secondary-100 rounded-2xl">
                <Shield className="h-10 w-10 text-secondary-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Core Christian Doctrines
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Explore foundational biblical teachings and understand their significance for faith and practice through careful scriptural examination.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200 mb-12">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search doctrines by title or topic..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 text-lg"
                />
              </div>
              <Button variant="outline" className="lg:w-auto">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Doctrines Grid */}
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
              {doctrines.map((doctrine, index) => (
                <motion.div
                  key={doctrine.id}
                  variants={itemVariants}
                  className="group bg-white p-8 rounded-xl shadow-soft border border-neutral-200 hover:shadow-medium transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-secondary-100 rounded-lg mr-3">
                          <Shield className="h-5 w-5 text-secondary-600" />
                        </div>
                        <span className={`px-3 py-1 text-sm rounded-full font-medium border ${getCategoryColor(doctrine.category)}`}>
                          {doctrine.category}
                        </span>
                      </div>
                      <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900 mb-4 leading-tight">
                        {doctrine.title}
                      </h2>
                    </div>
                    {isAuthenticated && (
                      <button
                        onClick={() => handleToggleFavorite(doctrine.id)}
                        className="p-2 text-neutral-400 hover:text-secondary-600 transition-colors"
                      >
                        <Heart 
                          className={`h-6 w-6 ${
                            favoriteDoctrine.includes(doctrine.id) ? 'fill-current text-secondary-600' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-heading font-medium text-neutral-800 mb-3">Summary:</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      {doctrine.summary}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-heading font-medium text-neutral-800 mb-3 text-sm">Key Scriptures:</h4>
                    <div className="space-y-2">
                      {doctrine.keyScriptures.slice(0, 2).map((scripture, idx) => (
                        <div key={idx} className="text-sm text-neutral-600 bg-parchment-50 p-3 rounded-lg border border-parchment-200">
                          {scripture.split(' - ')[0]} - {scripture.split(' - ')[1]?.substring(0, 80)}...
                        </div>
                      ))}
                      {doctrine.keyScriptures.length > 2 && (
                        <p className="text-sm text-neutral-500 italic">
                          +{doctrine.keyScriptures.length - 2} more scriptures
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Link to={`/doctrines/${doctrine.id}`}>
                    <Button variant="secondary" size="sm" className="group/btn w-full">
                      Explore Doctrine
                      <BookOpen className="ml-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && doctrines.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-4 bg-neutral-100 rounded-2xl w-fit mx-auto mb-6">
                <Shield className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                No doctrines found
              </h3>
              <p className="text-neutral-600 mb-8">
                No doctrines found matching your search. Try different keywords or browse all available content.
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

export default DoctrinesPage;