import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, BookOpen, ExternalLink } from 'lucide-react';
import { Myth } from '../../types/content';
import { verseService } from '../../services/verseService';
import Button from '../common/Button';

interface InteractiveMythCardProps {
  myth: Myth;
}

interface VerseDetails {
  reference: string;
  text: string;
  explanation?: string;
}

const InteractiveMythCard = ({ myth }: InteractiveMythCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
  const [verseDetails, setVerseDetails] = useState<VerseDetails | null>(null);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);

  const handleRevealTruth = () => {
    setIsRevealed(!isRevealed);
  };

  const handleVerseClick = async (scriptureRef: string) => {
    if (selectedVerse === scriptureRef) {
      setSelectedVerse(null);
      setVerseDetails(null);
      return;
    }

    setIsLoadingVerse(true);
    setSelectedVerse(scriptureRef);

    try {
      // Extract book and chapter from reference (simplified parsing)
      const match = scriptureRef.match(/(\w+)\s+(\d+):(\d+)/);
      if (match) {
        const [, book, chapter] = match;
        const bookId = book.toLowerCase();
        const chapterNum = parseInt(chapter);
        
        // Get verses for the chapter
        const verses = await verseService.getChapterVerses(bookId, chapterNum);
        
        // For demo, we'll show the first verse with the reference
        setVerseDetails({
          reference: scriptureRef,
          text: `"${verses[0]?.text || 'Verse text would be loaded here'}"`,
          explanation: verses[0]?.explanation || 'This verse supports the biblical truth by demonstrating God\'s character and will as revealed in Scripture.'
        });
      }
    } catch (error) {
      console.error('Error loading verse:', error);
      setVerseDetails({
        reference: scriptureRef,
        text: '"Verse text would be loaded here"',
        explanation: 'This verse supports the biblical truth by demonstrating God\'s character and will as revealed in Scripture.'
      });
    } finally {
      setIsLoadingVerse(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium">
            {myth.category}
          </span>
          <div className="flex flex-wrap gap-2">
            {myth.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
          {myth.title}
        </h3>
      </div>

      {/* Popular Perception */}
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-heading font-medium text-red-700 mb-3 flex items-center">
            <EyeOff className="h-4 w-4 mr-2" />
            Popular Perception
          </h4>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 italic">"{myth.popularPerception}"</p>
          </div>
        </div>

        {/* Reveal Truth Button */}
        <div className="text-center mb-6">
          <Button
            variant={isRevealed ? "outline" : "primary"}
            onClick={handleRevealTruth}
            className="group"
          >
            {isRevealed ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Biblical Truth
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Reveal Biblical Truth
              </>
            )}
          </Button>
        </div>

        {/* Biblical Truth - Animated Reveal */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="space-y-6"
            >
              {/* Scriptural Refutation */}
              <div>
                <h4 className="font-heading font-medium text-green-700 mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Scriptural Refutation
                </h4>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">{myth.biblicalCounterArgument.scripturalRefutation}</p>
                </div>
              </div>

              {/* Contextual Explanation */}
              <div>
                <h4 className="font-heading font-medium text-blue-700 mb-3">
                  Historical & Cultural Context
                </h4>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">{myth.biblicalCounterArgument.contextualExplanation}</p>
                </div>
              </div>

              {/* Sound Doctrine */}
              <div>
                <h4 className="font-heading font-medium text-primary-700 mb-3">
                  Sound Biblical Doctrine
                </h4>
                <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <p className="text-primary-800">{myth.biblicalCounterArgument.soundDoctrine}</p>
                </div>
              </div>

              {/* Supporting Scriptures - Interactive */}
              <div>
                <h4 className="font-heading font-medium text-neutral-800 mb-3">
                  Supporting Scriptures
                </h4>
                <div className="space-y-3">
                  {myth.biblicalCounterArgument.supportingScriptures.map((scripture, index) => {
                    const reference = scripture.split(' - ')[0];
                    const isSelected = selectedVerse === reference;
                    
                    return (
                      <div key={index}>
                        <button
                          onClick={() => handleVerseClick(reference)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-primary-300 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-primary-600 mb-1">{reference}</p>
                              <p className="text-sm text-neutral-700">
                                {scripture.split(' - ')[1]?.substring(0, 100)}...
                              </p>
                            </div>
                            <ExternalLink className={`h-4 w-4 transition-colors ${
                              isSelected ? 'text-primary-600' : 'text-neutral-400'
                            }`} />
                          </div>
                        </button>

                        {/* Verse Details Panel */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 ml-4 p-4 bg-parchment-50 border border-parchment-200 rounded-lg"
                            >
                              {isLoadingVerse ? (
                                <div className="animate-pulse">
                                  <div className="h-4 bg-parchment-200 rounded w-3/4 mb-2"></div>
                                  <div className="h-3 bg-parchment-200 rounded w-full"></div>
                                </div>
                              ) : verseDetails ? (
                                <div>
                                  <p className="text-parchment-800 italic mb-3 text-lg">
                                    {verseDetails.text}
                                  </p>
                                  <div className="border-t border-parchment-300 pt-3">
                                    <h5 className="font-medium text-parchment-700 mb-2">
                                      How this supports biblical truth:
                                    </h5>
                                    <p className="text-sm text-parchment-700">
                                      {verseDetails.explanation}
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveMythCard;