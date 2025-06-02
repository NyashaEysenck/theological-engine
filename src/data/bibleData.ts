import { BibleBook, BibleGenre } from '../types/bible';

export const bibleBooks: Record<string, BibleBook[]> = {
  law: [
    { id: 'genesis', name: 'Genesis', chapters: 50, genre: 'Law' },
    { id: 'exodus', name: 'Exodus', chapters: 40, genre: 'Law' },
    { id: 'leviticus', name: 'Leviticus', chapters: 27, genre: 'Law' },
    { id: 'numbers', name: 'Numbers', chapters: 36, genre: 'Law' },
    { id: 'deuteronomy', name: 'Deuteronomy', chapters: 34, genre: 'Law' }
  ],
  history: [
    { id: 'joshua', name: 'Joshua', chapters: 24, genre: 'History' },
    { id: 'judges', name: 'Judges', chapters: 21, genre: 'History' }
  ],
  wisdom: [
    { id: 'job', name: 'Job', chapters: 42, genre: 'Wisdom' },
    { id: 'psalms', name: 'Psalms', chapters: 150, genre: 'Wisdom' }
  ],
  prophets: [
    { id: 'isaiah', name: 'Isaiah', chapters: 66, genre: 'Prophets' },
    { id: 'jeremiah', name: 'Jeremiah', chapters: 52, genre: 'Prophets' }
  ],
  gospels: [
    { id: 'matthew', name: 'Matthew', chapters: 28, genre: 'Gospels' },
    { id: 'mark', name: 'Mark', chapters: 16, genre: 'Gospels' },
    { id: 'luke', name: 'Luke', chapters: 24, genre: 'Gospels' },
    { id: 'john', name: 'John', chapters: 21, genre: 'Gospels' }
  ],
  letters: [
    { id: 'romans', name: 'Romans', chapters: 16, genre: 'Letters' },
    { id: 'corinthians1', name: '1 Corinthians', chapters: 16, genre: 'Letters' }
  ]
};

export const getAllBooks = (): BibleBook[] => Object.values(bibleBooks).flat();

export const getBooksByGenre = (): Record<string, BibleBook[]> => bibleBooks;