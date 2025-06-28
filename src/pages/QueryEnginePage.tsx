import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { contentService } from '../services/contentService';
import { BibleConcept } from '../types/content';
import ConceptNavigator from '../components/query/ConceptNavigator';
import Button from '../components/common/Button';

const QueryEnginePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BibleConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setExpandedConcept(null);

    try {
      const concepts = await contentService.searchBibleConcepts(query);
      setResults(concepts);
    } catch (error) {
      console.error('Error searching concepts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConceptClick = (conceptId: string) => {
    setExpandedConcept(expandedConcept === conceptId ? null : conceptId);
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
              <div className="p-4 bg-sage-100 rounded-2xl">
                <Search className="h-10 w-10 text-sage-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              What Does the Bible Really Say About...?
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Navigate theological concepts through interactive biblical exploration. Search topics to discover related books, explore key passages, and understand balanced perspectives.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200 mb-12">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-6 w-6" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a topic (e.g., faith healing, tithing, spiritual warfare)..."
                  className="w-full pl-12 pr-32 py-4 text-lg border border-neutral-300 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </form>
          </div>

          {/* Results */}
          {isLoading ? (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[1, 2].map((n) => (
                <motion.div key={n} variants={itemVariants} className="animate-pulse">
                  <div className="h-20 bg-neutral-200 rounded-xl"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : hasSearched && results.length > 0 ? (
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {results.map((concept) => (
                <motion.div
                  key={concept.id}
                  variants={itemVariants}
                >
                  {/* Concept List Item */}
                  <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
                    <button
                      onClick={() => handleConceptClick(concept.id)}
                      className="w-full p-6 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                            {concept.title}
                          </h3>
                          <p className="text-neutral-600 line-clamp-2">
                            {concept.description}
                          </p>
                        </div>
                        <div className="ml-6">
                          {expandedConcept === concept.id ? (
                            <ChevronDown className="h-6 w-6 text-neutral-400" />
                          ) : (
                            <ChevronRight className="h-6 w-6 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedConcept === concept.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-neutral-200"
                        >
                          <div className="p-6">
                            <ConceptNavigator concept={concept} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}

          {hasSearched && !isLoading && results.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-4 bg-neutral-100 rounded-2xl w-fit mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                No results found
              </h3>
              <p className="text-neutral-600 mb-8">
                No results found for "{query}". Try another search term or browse our existing topics.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['faith healing', 'tithing', 'spiritual warfare', 'predestination', 'prosperity gospel'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-4 py-2 bg-sage-50 text-sage-700 rounded-full border border-sage-200 hover:bg-sage-100 transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QueryEnginePage;