import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { bibleService } from '../services/bibleService';
import { verseService } from '../services/verseService';
import { BibleBook } from '../types/bible';
import BookSelector from '../components/bible/BookSelector';
import ChapterSelector from '../components/bible/ChapterSelector';
import VerseReader from '../components/bible/VerseReader';
import CommunityPanel from '../components/bible/CommunityPanel';
import { bibleBooks } from '../data/bibleData';
import Button from '../components/common/Button';

const BibleReadingPage = () => {
  const { user } = useAuth();
  const { 
    progress,
    markChapterAsRead
  } = useUserProgress();

  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [showVerseNumbers, setShowVerseNumbers] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadVerses = async () => {
      if (!selectedBook || !selectedChapter) return;
      
      setIsLoading(true);
      try {
        const chapterVerses = await verseService.getChapterVerses(selectedBook.id, selectedChapter);
        setVerses(chapterVerses);
      } catch (error) {
        console.error('Error loading verses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVerses();
  }, [selectedBook, selectedChapter]);

  const handleMarkAsRead = async () => {
    if (!selectedBook || !selectedChapter) return;
    await markChapterAsRead(selectedBook.id, selectedChapter.toString());
  };

  return (
    <div className="mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-neutral-900 mb-4">
              Bible Reading
            </h1>
            <p className="text-lg text-neutral-700">
              Read Scripture chapter by chapter with verse-by-verse explanations and community insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Book and Chapter Selection */}
            <div className="lg:col-span-1 space-y-6">
              <BookSelector
                books={bibleBooks}
                selectedBook={selectedBook}
                onBookSelect={setSelectedBook}
                readingProgress={progress?.bibleReadingProgress || []}
              />

              {selectedBook && (
                <ChapterSelector
                  book={selectedBook}
                  selectedChapter={selectedChapter}
                  onChapterSelect={setSelectedChapter}
                  readingProgress={progress?.bibleReadingProgress || []}
                />
              )}

              {/* Reading Controls */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-3">Reading Options</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showVerseNumbers}
                      onChange={(e) => setShowVerseNumbers(e.target.checked)}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-neutral-700">Show verse numbers</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Content - Verse Reader */}
            <div className="lg:col-span-2">
              {selectedBook && selectedChapter ? (
                isLoading ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
                    <div className="animate-pulse space-y-4">
                      <div className="h-8 bg-neutral-200 rounded w-3/4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-neutral-200 rounded"></div>
                        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
                        <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <VerseReader
                    book={selectedBook}
                    chapter={selectedChapter}
                    verses={verses}
                    onMarkAsRead={handleMarkAsRead}
                    showVerseNumbers={showVerseNumbers}
                  />
                )
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 text-center">
                  <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
                    Select a Book and Chapter
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    Choose a book from the sidebar to begin reading Scripture with detailed explanations.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      const firstBook = Object.values(bibleBooks)[0][0];
                      setSelectedBook(firstBook);
                      setSelectedChapter(1);
                    }}
                  >
                    Start with Genesis
                  </Button>
                </div>
              )}
            </div>

            {/* Right Sidebar - Community */}
            <div className="lg:col-span-1">
              <CommunityPanel
                currentBook={selectedBook?.name}
                currentChapter={selectedChapter || undefined}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BibleReadingPage;