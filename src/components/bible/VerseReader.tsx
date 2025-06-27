import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Share2, BookOpen, X } from 'lucide-react';
import { BibleBook } from '../../types/bible';
import Button from '../common/Button';

interface Verse {
  number: number;
  text: string;
  explanation?: string;
}

interface VerseReaderProps {
  book: BibleBook;
  chapter: number;
  verses: Verse[];
  onMarkAsRead: () => void;
  showVerseNumbers: boolean;
}

const VerseReader = ({ book, chapter, verses, onMarkAsRead, showVerseNumbers }: VerseReaderProps) => {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
    setShowExplanation(true);
  };

  const closeExplanation = () => {
    setShowExplanation(false);
    setSelectedVerse(null);
  };

  const selectedVerseData = verses.find(v => v.number === selectedVerse);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold text-primary-900">
            {book.name} Chapter {chapter}
          </h1>
          <Button onClick={onMarkAsRead} variant="primary" size="sm">
            Mark as Read
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="prose prose-lg max-w-none">
          {verses.map((verse) => (
            <motion.p
              key={verse.number}
              className="mb-4 leading-relaxed cursor-pointer hover:bg-neutral-50 p-2 rounded transition-colors"
              onClick={() => handleVerseClick(verse.number)}
              whileHover={{ scale: 1.01 }}
            >
              {showVerseNumbers && (
                <span className="inline-block w-8 text-sm font-medium text-primary-600 mr-2">
                  {verse.number}
                </span>
              )}
              <span className="text-neutral-800">{verse.text}</span>
            </motion.p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Save Chapter - Coming Soon */}
              <div className="relative group">
                <button 
                  disabled
                  className="flex items-center space-x-2 text-neutral-400 cursor-not-allowed transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Save Chapter</span>
                </button>
                <div className="absolute inset-0 bg-neutral-800/70 text-white text-xs font-bold flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  Coming Soon
                </div>
              </div>

              {/* Share - Coming Soon */}
              <div className="relative group">
                <button 
                  disabled
                  className="flex items-center space-x-2 text-neutral-400 cursor-not-allowed transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
                <div className="absolute inset-0 bg-neutral-800/70 text-white text-xs font-bold flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  Coming Soon
                </div>
              </div>

              {/* Discuss - Coming Soon */}
              <div className="relative group">
                <button 
                  disabled
                  className="flex items-center space-x-2 text-neutral-400 cursor-not-allowed transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Discuss</span>
                </button>
                <div className="absolute inset-0 bg-neutral-800/70 text-white text-xs font-bold flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  Coming Soon
                </div>
              </div>
            </div>
            <div className="text-sm text-neutral-500">
              {verses.length} verses
            </div>
          </div>
        </div>
      </div>

      {/* Verse Explanation Modal */}
      <AnimatePresence>
        {showExplanation && selectedVerseData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeExplanation}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-heading font-semibold text-neutral-900">
                    {book.name} {chapter}:{selectedVerse}
                  </h3>
                  <button
                    onClick={closeExplanation}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-neutral-800 italic">"{selectedVerseData.text}"</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Explanation</h4>
                    <p className="text-neutral-700">
                      {selectedVerseData.explanation || 
                        "This verse speaks to the heart of God's relationship with His people. The original Hebrew/Greek context reveals deeper meanings about God's character and His covenant faithfulness. Understanding the historical and cultural background helps us apply this truth to our lives today."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Cross References</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-neutral-600">• Romans 8:28 - God works all things for good</p>
                      <p className="text-sm text-neutral-600">• Jeremiah 29:11 - God's plans for His people</p>
                      <p className="text-sm text-neutral-600">• Psalm 23:1 - The Lord as shepherd</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Application</h4>
                    <p className="text-neutral-700">
                      Consider how this verse applies to your current circumstances. What is God teaching you through this passage? How can you live out this truth in practical ways?
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <div className="flex space-x-3">
                    {/* Discuss - Coming Soon */}
                    <div className="relative group">
                      <Button variant="outline" size="sm" disabled>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Discuss
                      </Button>
                      <div className="absolute inset-0 bg-neutral-800/70 text-white text-xs font-bold flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Coming Soon
                      </div>
                    </div>

                    {/* Save Note - Coming Soon */}
                    <div className="relative group">
                      <Button variant="outline" size="sm" disabled>
                        <Heart className="h-4 w-4 mr-2" />
                        Save Note
                      </Button>
                      <div className="absolute inset-0 bg-neutral-800/70 text-white text-xs font-bold flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Coming Soon
                      </div>
                    </div>

                    {/* Share - Coming Soon */}
                    <div className="relative group">
                      <Button variant="outline" size="sm" disabled>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <div className="absolute inset-0 bg-neutral-800/70 text-white text-xs font-bold flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        Coming Soon
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerseReader;