import { motion } from 'framer-motion';
import { ScrollText, CheckCircle, Circle } from 'lucide-react';
import { BibleBook } from '../../types/bible';

interface ChapterSelectorProps {
  book: BibleBook;
  selectedChapter: number | null;
  onChapterSelect: (chapter: number) => void;
  readingProgress: any[];
}

const ChapterSelector = ({ book, selectedChapter, onChapterSelect, readingProgress }: ChapterSelectorProps) => {
  const getChapterStatus = (chapterNumber: number) => {
    const bookProgress = readingProgress.find(bp => bp.bookId === book.id);
    return bookProgress?.chaptersRead.includes(chapterNumber.toString()) || false;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-card border border-neutral-200">
      <h2 className="text-xl font-heading font-semibold text-primary-900 mb-6 flex items-center uppercase tracking-wider">
        <ScrollText className="h-5 w-5 text-primary-900 mr-3" />
        {book.name} - Select Chapter
      </h2>
      
      <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
        {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => {
          const isRead = getChapterStatus(chapter);
          const isSelected = selectedChapter === chapter;
          
          return (
            <motion.button
              key={chapter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChapterSelect(chapter)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-primary-600 bg-primary-50 text-primary-900 shadow-card'
                  : isRead
                  ? 'border-green-300 bg-green-50 text-green-900'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="font-medium text-sm">{chapter}</span>
                <div className="mt-2">
                  {isRead ? (
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  ) : (
                    <Circle className="h-3 w-3 text-neutral-400" />
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ChapterSelector;