import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { ReadingProgress } from '../../types/bible';

interface BibleHeaderProps {
  readingProgress: ReadingProgress;
  showVerseNumbers: boolean;
  onToggleVerseNumbers: () => void;
  onMarkAsRead: () => void;
  selectedView: 'traditional' | 'chronological';
  onViewChange: (view: 'traditional' | 'chronological') => void;
}

const BibleHeader = ({
  readingProgress,
  showVerseNumbers,
  onToggleVerseNumbers,
  onMarkAsRead,
  selectedView,
  onViewChange
}: BibleHeaderProps) => {
  const { currentBook, currentChapter, overallProgress } = readingProgress;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-900 mb-2">
            Currently Reading: {currentBook.name} {currentChapter}/{currentBook.chapters}
          </h1>
          <p className="text-lg text-neutral-600">
            Overall Progress: {overallProgress}% Complete
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleVerseNumbers}
          >
            {showVerseNumbers ? 'Hide' : 'Show'} Verse Numbers
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onMarkAsRead}
            className="flex items-center"
          >
            Complete Chapter
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          variant={selectedView === 'traditional' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onViewChange('traditional')}
        >
          Traditional Order
        </Button>
        <Button
          variant={selectedView === 'chronological' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onViewChange('chronological')}
        >
          Chronological Order
        </Button>
      </div>

      <div className="mt-6">
        <div className="h-4 bg-neutral-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BibleHeader;