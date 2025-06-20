import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';
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

  return (
    <div className="bg-white p-8 rounded-2xl shadow-card border border-neutral-200">
      <h2 className="text-xl font-heading font-semibold text-primary-900 mb-6 flex items-center uppercase tracking-wider">
        <Book className="h-5 w-5 text-primary-900 mr-3" />
        Select a Book
      </h2>
      
      <div className="space-y-4">
        {Object.entries(books).map(([genre, genreBooks]) => (
          <div key={genre} className="border border-neutral-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleGenre(genre)}
              className="w-full px-6 py-4 bg-neutral-50 hover:bg-neutral-100 flex justify-between items-center transition-colors"
            >
              <span className="font-medium text-primary-900 capitalize tracking-wide">{genre}</span>
              {expandedGenre === genre ? (
                <ChevronUp className="h-4 w-4 text-neutral-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-neutral-600" />
              )}
            </button>
            
            {expandedGenre === genre && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-neutral-200"
              >
                <div className="p-3 space-y-2">
                  {genreBooks.map((book) => {
                    const progress = getBookProgress(book.id, book.chapters);
                    const isSelected = selectedBook?.id === book.id;
                    
                    return (
                      <button
                        key={book.id}
                        onClick={() => onBookSelect(book)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-primary-100 text-primary-900 border-2 border-primary-300'
                            : 'hover:bg-neutral-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{book.name}</span>
                          <span className="text-sm text-neutral-600">
                            {progress}/{book.chapters}
                          </span>
                        </div>
                        {progress > 0 && (
                          <div className="mt-2 h-1 bg-neutral-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-600 rounded-full transition-all"
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