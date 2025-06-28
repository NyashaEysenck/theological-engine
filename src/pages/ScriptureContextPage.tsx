import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronRight, ChevronDown } from 'lucide-react';
import { contentService } from '../services/contentService';
import { ScriptureVerse } from '../types/content';
import ContextualLayers from '../components/scripture/ContextualLayers';

const ScriptureContextPage = () => {
  const [verses, setVerses] = useState<ScriptureVerse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedVerse, setExpandedVerse] = useState<string | null>(null);

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
    const loadVerses = async () => {
      try {
        const data = await contentService.getCommonlyMisusedVerses();
        setVerses(data);
      } catch (error) {
        console.error('Error loading verses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVerses();
  }, []);

  const handleVerseClick = (verseId: string) => {
    setExpandedVerse(expandedVerse === verseId ? null : verseId);
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
              <div className="p-4 bg-accent-100 rounded-2xl">
                <Layers className="h-10 w-10 text-accent-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Scripture in Context
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Build proper understanding through contextual layers. Click on any verse to explore commonly misused passages by progressively revealing their context.
            </p>
          </div>

          {/* Verses List */}
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
              {verses.map((verse) => (
                <motion.div
                  key={verse.id}
                  variants={itemVariants}
                >
                  {/* Verse List Item */}
                  <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
                    <button
                      onClick={() => handleVerseClick(verse.id)}
                      className="w-full p-6 text-left hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                            {verse.reference}
                          </h3>
                          <blockquote className="text-lg text-neutral-700 italic mb-3">
                            {verse.verse}
                          </blockquote>
                          <p className="text-sm text-red-600 font-medium">
                            Common Misuse: {verse.commonMisuse.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="ml-6">
                          {expandedVerse === verse.id ? (
                            <ChevronDown className="h-6 w-6 text-neutral-400" />
                          ) : (
                            <ChevronRight className="h-6 w-6 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedVerse === verse.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-neutral-200"
                        >
                          <div className="p-6">
                            <ContextualLayers verse={verse} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && verses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="p-4 bg-neutral-100 rounded-2xl w-fit mx-auto mb-6">
                <Layers className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                No verses available
              </h3>
              <p className="text-neutral-600">
                Scripture context data is being loaded. Please check back soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScriptureContextPage;