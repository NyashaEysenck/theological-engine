import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { contentService } from '../services/contentService';
import { ScriptureVerse } from '../types/content';

const ScriptureContextPage = () => {
  const [verses, setVerses] = useState<ScriptureVerse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedVerse, setExpandedVerse] = useState<string | null>(null);

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

  const toggleVerse = (verseId: string) => {
    setExpandedVerse(expandedVerse === verseId ? null : verseId);
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
            Scripture in Context
          </h1>
          <p className="text-lg text-neutral-700 mb-8">
            Explore commonly misused Bible verses in their proper context to understand their true meaning.
          </p>

          {/* Verses List */}
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
              {verses.map((verse) => (
                <motion.div
                  key={verse.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleVerse(verse.id)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                          {verse.reference}
                        </h2>
                        <p className="text-neutral-700 italic mb-4">{verse.verse}</p>
                        <p className="text-neutral-600">
                          Common misuse: {verse.commonMisuse}
                        </p>
                      </div>
                      {expandedVerse === verse.id ? (
                        <ChevronUp className="h-6 w-6 text-neutral-400" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-neutral-400" />
                      )}
                    </div>
                  </button>

                  {expandedVerse === verse.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-neutral-200"
                    >
                      <div className="p-6 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                            Paragraph Context
                          </h3>
                          <p className="text-neutral-700">{verse.paragraph}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                            Chapter Context
                          </h3>
                          <p className="text-neutral-700">{verse.chapterContext}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                            Book Theme
                          </h3>
                          <p className="text-neutral-700">{verse.bookTheme}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                            Proper Interpretation
                          </h3>
                          <p className="text-neutral-700">{verse.properInterpretation}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScriptureContextPage;