import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import { contentService } from '../services/contentService';
import { BibleConcept } from '../types/content';
import Button from '../components/common/Button';

const QueryEnginePage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BibleConcept[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const concepts = await contentService.searchBibleConcepts(query);
      setResults(concepts);
    } catch (error) {
      console.error('Error searching concepts:', error);
    } finally {
      setIsLoading(false);
    }
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
            What Does the Bible Really Say About...?
          </h1>
          <p className="text-lg text-neutral-700 mb-8">
            Search biblical concepts to discover balanced, scripture-based perspectives on various topics.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 h-6 w-6" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a topic (e.g., faith healing, tithing, spiritual warfare)..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Button
                type="submit"
                variant="primary"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Results */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="h-48 bg-neutral-100 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {results.map((concept) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
                >
                  <h2 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                    {concept.title}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">Biblical Nuance</h3>
                      <p className="text-neutral-700">{concept.biblicalNuance}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">Common Abuses</h3>
                      <ul className="list-disc list-inside space-y-2 text-neutral-700">
                        {concept.commonAbuses.map((abuse, index) => (
                          <li key={index}>{abuse}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">Balanced Perspective</h3>
                      <p className="text-neutral-700">{concept.balancedPerspective}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">Relevant Scriptures</h3>
                      <ul className="list-disc list-inside space-y-2 text-neutral-700">
                        {concept.relevantScriptures.map((scripture, index) => (
                          <li key={index}>{scripture}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}

              {hasSearched && results.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">
                    No results found for "{query}". Try another search term or browse our existing topics.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QueryEnginePage;