import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, Filter, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { contentService } from '../services/contentService';
import { Doctrine } from '../types/content';
import DoctrineUnpacker from '../components/doctrines/DoctrineUnpacker';
import Button from '../components/common/Button';

const DoctrinesPage = () => {
  const [doctrines, setDoctrines] = useState<Doctrine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDoctrine, setExpandedDoctrine] = useState<string | null>(null);
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

  const handleDoctrineClick = (doctrineId: string) => {
    setExpandedDoctrine(expandedDoctrine === doctrineId ? null : doctrineId);
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
              Interactive Doctrine Explorer
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Unpack foundational Christian beliefs through interactive scripture exploration. Click on any doctrine to reveal key verses and correct common misunderstandings.
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

          {/* Doctrines List */}
          {isLoading ? (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[1, 2, 3].map((n) => (
                <motion.div key={n} variants={itemVariants} className="animate-pulse">
                  <div className="h-20 bg-neutral-200 rounded-xl"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {doctrines.map((doctrine) => (
                <motion.div
                  key={doctrine.id}
                  variants={itemVariants}
                >
                  {/* Doctrine List Item */}
                  <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
                    <button
                      onClick={() => handleDoctrineClick(doctrine.id)}
                      className="w-full p-6 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <span className="px-3 py-1 bg-secondary-50 text-secondary-700 text-sm rounded-full font-medium">
                              {doctrine.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                            {doctrine.title}
                          </h3>
                          <p className="text-neutral-600 line-clamp-2">
                            {doctrine.summary}
                          </p>
                        </div>
                        <div className="ml-6">
                          {expandedDoctrine === doctrine.id ? (
                            <ChevronDown className="h-6 w-6 text-neutral-400" />
                          ) : (
                            <ChevronRight className="h-6 w-6 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedDoctrine === doctrine.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-neutral-200"
                        >
                          <div className="p-6">
                            <DoctrineUnpacker doctrine={doctrine} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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