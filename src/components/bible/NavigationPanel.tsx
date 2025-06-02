import { Star, BookMarked, CheckCircle, BookOpen, Lock } from 'lucide-react';
import { BibleBook } from '../../types/bible';
import { ChapterProgress } from '../../types/progress';

interface NavigationPanelProps {
  experience: number;
  readingStreak: number;
  selectedView: 'traditional' | 'chronological';
  bibleBooks: Record<string, BibleBook[]>;
  allBooks: BibleBook[];
  readingProgress: ChapterProgress[];
  currentBookId: string;
}

const NavigationPanel = ({
  experience,
  readingStreak,
  selectedView,
  bibleBooks,
  allBooks,
  readingProgress,
  currentBookId
}: NavigationPanelProps) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Reading Progress */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
          Your Progress
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-primary-600 mr-2" />
              <span>XP Points</span>
            </div>
            <span className="font-medium">{experience}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookMarked className="h-5 w-5 text-primary-600 mr-2" />
              <span>Reading Streak</span>
            </div>
            <span className="font-medium">{readingStreak} days</span>
          </div>
        </div>
      </div>

      {/* Book Navigation */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
        <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-4">
          Bible Books
        </h2>
        <div className="space-y-4">
          {selectedView === 'traditional' ? (
            // Traditional View - Grouped by Genre
            Object.entries(bibleBooks).map(([genre, genreBooks]) => (
              <div key={genre}>
                <h3 className="text-lg font-medium text-neutral-800 mb-2 capitalize">
                  {genre}
                </h3>
                <div className="space-y-2">
                  {genreBooks.map((book) => {
                    const bookProgress = readingProgress.find(
                      bp => bp.bookId === book.id
                    );
                    const isComplete = bookProgress?.chaptersRead.length === book.chapters;
                    const isCurrent = book.id === currentBookId;

                    return (
                      <div 
                        key={book.id}
                        className={`p-3 rounded-lg border ${
                          isCurrent 
                            ? 'bg-primary-50 border-primary-200'
                            : isComplete
                            ? 'bg-green-50 border-green-200'
                            : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {isComplete ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : isCurrent ? (
                              <BookOpen className="h-4 w-4 text-primary-500 mr-2" />
                            ) : (
                              <Lock className="h-4 w-4 text-neutral-400 mr-2" />
                            )}
                            <div>
                              <p className="font-medium text-neutral-900">{book.name}</p>
                              <p className="text-sm text-neutral-600">
                                {bookProgress?.chaptersRead.length || 0}/{book.chapters} chapters
                              </p>
                            </div>
                          </div>
                          {isCurrent && (
                            <span className="text-sm font-medium text-primary-600">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            // Chronological View - Flat List
            <div className="space-y-2">
              {allBooks.map((book) => {
                const bookProgress = readingProgress.find(
                  bp => bp.bookId === book.id
                );
                const isComplete = bookProgress?.chaptersRead.length === book.chapters;
                const isCurrent = book.id === currentBookId;

                return (
                  <div 
                    key={book.id}
                    className={`p-3 rounded-lg border ${
                      isCurrent 
                        ? 'bg-primary-50 border-primary-200'
                        : isComplete
                        ? 'bg-green-50 border-green-200'
                        : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {isComplete ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : isCurrent ? (
                          <BookOpen className="h-4 w-4 text-primary-500 mr-2" />
                        ) : (
                          <Lock className="h-4 w-4 text-neutral-400 mr-2" />
                        )}
                        <div>
                          <p className="font-medium text-neutral-900">{book.name}</p>
                          <p className="text-sm text-neutral-600">
                            {bookProgress?.chaptersRead.length || 0}/{book.chapters} chapters
                          </p>
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="text-sm font-medium text-primary-600">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;