export interface ChapterProgress {
  bookId: string;
  chaptersRead: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  awardedAt: string;
}

export interface UserProgress {
  userId: string;
  bibleReadingProgress: ChapterProgress[];
  favoriteMyths: string[];
  favoriteDoctrine: string[];
  experience: number;
  readingStreak: number;
  badges: Badge[];
  lastReadDate: string | null;
  unlockedFeatures: string[];
}