import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress } from '../contexts/UserProgressContext';
import { bibleService } from '../services/bibleService';
import { BibleViewState, ReadingProgress } from '../types/bible';
import BibleHeader from '../components/bible/BibleHeader';
import ContextPanel from '../components/bible/ContextPanel';
import NavigationPanel from '../components/bible/NavigationPanel';
import { bibleBooks, getAllBooks } from '../data/bibleData';

const BibleReadingPage = () => {
  const { user } = useAuth();
  const { 
    progress,
    experience,
    level,
    badges,
    getReadingStreak,
    getUnlockedFeatures,
    markChapterAsRead
  } = useUserProgress();

  const [viewState, setViewState] = useState<BibleViewState>({
    selectedView: 'traditional',
    showVerseNumbers: true,
    expandedSection: null
  });

  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null);
  const [contextData, setContextData] = useState({
    historical: null,
    geographic: null,
    introduction: null
  });

  useEffect(() => {
    const loadData = async () => {
      if (!progress?.bibleReadingProgress) return;

      const currentPosition = await bibleService.getCurrentReadingPosition(
        progress.bibleReadingProgress
      );
      setReadingProgress(currentPosition);

      const [historical, geographic, introduction] = await Promise.all([
        bibleService.getHistoricalContext(currentPosition.currentBook.id, currentPosition.currentChapter),
        bibleService.getGeographicContext(currentPosition.currentBook.id, currentPosition.currentChapter),
        bibleService.getChapterIntroduction(currentPosition.currentBook.id, currentPosition.currentChapter)
      ]);

      setContextData({ historical, geographic, introduction });
    };

    loadData();
  }, [progress?.bibleReadingProgress]);

  const handleMarkAsRead = async () => {
    if (!readingProgress) return;
    await markChapterAsRead(
      readingProgress.currentBook.id,
      readingProgress.currentChapter.toString()
    );
  };

  if (!readingProgress || !contextData.historical || !contextData.geographic || !contextData.introduction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BibleHeader
            readingProgress={readingProgress}
            showVerseNumbers={viewState.showVerseNumbers}
            onToggleVerseNumbers={() => setViewState(prev => ({ ...prev, showVerseNumbers: !prev.showVerseNumbers }))}
            onMarkAsRead={handleMarkAsRead}
            selectedView={viewState.selectedView}
            onViewChange={(view) => setViewState(prev => ({ ...prev, selectedView: view }))}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ContextPanel
              expandedSection={viewState.expandedSection}
              onToggleSection={(section) => setViewState(prev => ({
                ...prev,
                expandedSection: prev.expandedSection === section ? null : section
              }))}
              historicalContext={contextData.historical}
              geographicContext={contextData.geographic}
              chapterIntro={contextData.introduction}
            />

            <NavigationPanel
              experience={experience}
              readingStreak={getReadingStreak()}
              selectedView={viewState.selectedView}
              bibleBooks={bibleBooks}
              allBooks={getAllBooks()}
              readingProgress={progress?.bibleReadingProgress || []}
              currentBookId={readingProgress.currentBook.id}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BibleReadingPage;