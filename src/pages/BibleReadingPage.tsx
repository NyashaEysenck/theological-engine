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
import JourneyVisualization from '../components/bible/JourneyVisualization';
import { bibleBooks } from '../data/bibleData';
import Button from '../components/common/Button';
import { Map, BookOpen, Users } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'reading' | 'journey' | 'community'>('reading');

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

  const tabs = [
    { id: 'reading', label: 'Scripture Reading', icon: BookOpen },
    { id: 'journey', label: 'Journey Maps', icon: Map },
    { id: 'community', label: 'Community', icon: Users }
  ];

  return (
    <div className="mt-24 min-h-screen bg-parchment-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-primary-100 rounded-2xl">
                <BookOpen className="h-10 w-10 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              Bible Reading Experience
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
              Read Scripture chapter by chapter with verse-by-verse explanations, interactive journey maps, and community insights.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-soft border border-neutral-200">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'reading' && (
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
                  <div className="bg-white p-6 rounded-xl shadow-soft border border-neutral-200">
                    <h3 className="font-heading font-semibold text-neutral-900 mb-4">Reading Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={showVerseNumbers}
                          onChange={(e) => setShowVerseNumbers(e.target.checked)}
                          className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-3 text-sm text-neutral-700">Show verse numbers</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Main Content - Verse Reader */}
                <div className="lg:col-span-3">
                  {selectedBook && selectedChapter ? (
                    isLoading ? (
                      <div className="bg-white p-8 rounded-xl shadow-soft border border-neutral-200">
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
                    <div className="bg-white p-12 rounded-xl shadow-soft border border-neutral-200 text-center">
                      <div className="p-4 bg-primary-100 rounded-2xl w-fit mx-auto mb-6">
                        <BookOpen className="h-12 w-12 text-primary-600" />
                      </div>
                      <h2 className="text-2xl font-heading font-semibold text-neutral-900 mb-4">
                        Select a Book and Chapter
                      </h2>
                      <p className="text-neutral-600 mb-8 leading-relaxed">
                        Choose a book from the sidebar to begin reading Scripture with detailed explanations and journey visualizations.
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
              </div>
            )}

            {activeTab === 'journey' && (
              <div>
                <JourneyVisualization
                  currentBook={selectedBook?.id}
                  currentChapter={selectedChapter || undefined}
                  onLocationSelect={(location) => {
                    console.log('Selected location:', location);
                  }}
                />
              </div>
            )}

            {activeTab === 'community' && (
              <div className="max-w-4xl mx-auto">
                <CommunityPanel
                  currentBook={selectedBook?.name}
                  currentChapter={selectedChapter || undefined}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BibleReadingPage;