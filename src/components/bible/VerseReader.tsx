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
    <div className="bg-white rounded-2xl shadow-card border border-neutral-200 overflow-hidden">
      <div className="p-8 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-primary-100">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-heading font-bold text-primary-900">
            {book.name} Chapter {chapter}
          </h1>
          <Button onClick={onMarkAsRead} variant="primary" size="md">
            Mark as Read
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="prose prose-lg max-w-none">
          {verses.map((verse) => (
            <motion.p
              key={verse.number}
              className="mb-6 leading-relaxed cursor-pointer hover:bg-neutral-50 p-3 rounded-lg transition-colors"
              onClick={() => handleVerseClick(verse.number)}
              whileHover={{ scale: 1.01 }}
            >
              {showVerseNumbers && (
                <span className="inline-block w-10 text-sm font-medium text-primary-900 mr-3">
                  {verse.number}
                </span>
              )}
              <span className="text-neutral-800 text-lg leading-relaxed">{verse.text}</span>
            </motion.p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-neutral-600 hover:text-primary-900 transition-colors">
                <Heart className="h-5 w-5" />
                <span>Save Chapter</span>
              </button>
              <button className="flex items-center space-x-2 text-neutral-600 hover:text-primary-900 transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-neutral-600 hover:text-primary-900 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>Discuss</span>
              </button>
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
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-card-hover"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-heading font-semibold text-primary-900">
                    {book.name} {chapter}:{selectedVerse}
                  </h3>
                  <button
                    onClick={closeExplanation}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mb-8 p-6 bg-primary-50 rounded-xl border border-primary-200">
                  <p className="text-neutral-800 italic text-lg leading-relaxed">"{selectedVerseData.text}"</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-3 uppercase tracking-wider text-sm">Explanation</h4>
                    <p className="text-neutral-700 leading-relaxed">
                      {selectedVerseData.explanation || 
                        "This verse speaks to the heart of God's relationship with His people. The original Hebrew/Greek context reveals deeper meanings about God's character and His covenant faithfulness. Understanding the historical and cultural background helps us apply this truth to our lives today."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-3 uppercase tracking-wider text-sm">Cross References</h4>
                    <div className="space-y-2">
                      <p className="text-sm text-neutral-600">• Romans 8:28 - God works all things for good</p>
                      <p className="text-sm text-neutral-600">• Jeremiah 29:11 - God's plans for His people</p>
                      <p className="text-sm text-neutral-600">• Psalm 23:1 - The Lord as shepherd</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-900 mb-3 uppercase tracking-wider text-sm">Application</h4>
                    <p className="text-neutral-700 leading-relaxed">
                      Consider how this verse applies to your current circumstances. What is God teaching you through this passage? How can you live out this truth in practical ways?
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Discuss
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Save Note
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
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