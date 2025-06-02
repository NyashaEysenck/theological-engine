export interface BibleBook {
  id: string;
  name: string;
  chapters: number;
  genre: BibleGenre;
  period?: string;
  author?: string;
}

export type BibleGenre = 'Law' | 'History' | 'Wisdom' | 'Prophets' | 'Gospels' | 'Letters';

export interface HistoricalContext {
  period: string;
  date: string;
  background: string;
  concurrent: string[];
}

export interface GeographicContext {
  mainLocation: string;
  relatedSites: string[];
  routes: string[];
}

export interface ChapterIntroduction {
  summary: string;
  themes: string[];
  characters: {
    name: string;
    role: string;
  }[];
  structure: string[];
}

export interface BibleViewState {
  selectedView: 'traditional' | 'chronological';
  showVerseNumbers: boolean;
  expandedSection: string | null;
}

export interface ReadingProgress {
  currentBook: BibleBook;
  currentChapter: number;
  overallProgress: number;
}