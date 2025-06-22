import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';
import { BibleBook } from '../../types/bible';
import Button from '../common/Button';

interface BookSelectorProps {
  books: Record<string, BibleBook[]>;
  selectedBook: BibleBook | null;
  onBookSelect: (book: BibleBook) => void;
  readingProgress: any[];
}

const BookSelector = ({ books, selectedBook, onBookSelect, readingProgress }: BookSelectorProps) => {
  const [expandedGenre, setExpandedGenre] = useState<string | null>('law');

  const toggleGenre = (genre: string) => {
    setExpandedGenre(expandedGenre === genre ? null : genre);
  };

  const getBookProgress = (bookId: string, totalChapters: number) => {
    const bookProgress = readingProgress.find(bp => bp.bookId === bookId);
    return bookProgress ? bookProgress.chaptersRead.length : 0;
  };

  const getGenreColor = (genre: string) => {
    const colors = {
      'law': 'bg-primary-50 border-primary-200',
      'history': 'bg-secondary-50 border-secondary-200',
      'wisdom': 'bg-accent-50 border-accent-200',
      'prophets': 'bg-sage-50 border-sage-200',
      'gospels': 'bg-parchment-50 border-parchment-200',
      'letters': 'bg-primary-50 border-primary-200'
    };
    return colors[genre as keyof typeof colors] || 'bg-neutral-50 border-neutral-200';
  };

  return (
    <div className="bg-white p-6 lg:p-8 rounded-xl shadow-soft border border-neutral-200">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-primary-100 rounded-lg mr-3">
          <Book className="h-6 w-6 text-primary-600" />
        </div>
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-neutral-900">
          Select a Book
        </h2>
      </div>
      
      <div className="space-y-4">
        {Object.entries(books).map(([genre, genreBooks]) => (
          <div key={genre} className={`border rounded-xl overflow-hidden ${getGenreColor(genre)}`}>
            <button
              onClick={() => toggleGenre(genre)}
              className="w-full px-6 py-4 bg-white/50 hover:bg-white/70 flex justify-between items-center transition-colors"
            >
              <span className="font-heading font-semibold text-neutral-900 capitalize text-lg">
                {genre}
              </span>
              {expandedGenre === genre ? (
                <ChevronUp className="h-5 w-5 text-neutral-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-neutral-600" />
              )}
            </button>
            
            {expandedGenre === genre && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/30"
              >
                <div className="p-4 space-y-2">
                  {genreBooks.map((book) => {
                    const progress = getBookProgress(book.id, book.chapters);
                    const isSelected = selectedBook?.id === book.id;
                    const isComplete = progress === book.chapters;
                    
                    return (
                      <button
                        key={book.id}
                        onClick={() => onBookSelect(book)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          isSelected
                            ? 'bg-white shadow-soft border-2 border-primary-300'
                            : 'bg-white/70 hover:bg-white hover:shadow-soft border border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="mr-3">
                              {isComplete ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-neutral-400" />
                              )}
                            </div>
                            <div>
                              <span className="font-heading font-medium text-neutral-900">
                                {book.name}
                              </span>
                              <div className="text-sm text-neutral-600">
                                {progress}/{book.chapters} chapters
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium">
                              Selected
                            </div>
                          )}
                        </div>
                        {progress > 0 && (
                          <div className="mt-3 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isComplete ? 'bg-green-500' : 'bg-primary-500'
                              }`}
                              style={{ width: `${(progress / book.chapters) * 100}%` }}
                            />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSelector;