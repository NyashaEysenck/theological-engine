import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { userProgressService } from '../services/userProgressService';
import { UserProgress, ChapterProgress, Badge } from '../types/progress';

interface UserProgressContextType {
  progress: UserProgress | null;
  favoriteMyths: string[];
  favoriteDoctrine: string[];
  badges: Badge[];
  experience: number;
  level: number;
  markChapterAsRead: (bookId: string, chapterId: string) => Promise<void>;
  toggleFavoriteMyth: (mythId: string) => Promise<void>;
  toggleFavoriteDoctrine: (doctrineId: string) => Promise<void>;
  isLoading: boolean;
  getReadingStreak: () => number;
  getUnlockedFeatures: () => string[];
}

const UserProgressContext = createContext<UserProgressContextType>({
  progress: null,
  favoriteMyths: [],
  favoriteDoctrine: [],
  badges: [],
  experience: 0,
  level: 0,
  markChapterAsRead: async () => {},
  toggleFavoriteMyth: async () => {},
  toggleFavoriteDoctrine: async () => {},
  isLoading: false,
  getReadingStreak: () => 0,
  getUnlockedFeatures: () => [],
});

export const useUserProgress = () => useContext(UserProgressContext);

interface UserProgressProviderProps {
  children: ReactNode;
}

export const UserProgressProvider = ({ children }: UserProgressProviderProps) => {
  const { user, isAuthenticated } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user progress when authenticated
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!isAuthenticated || !user) {
        setProgress(null);
        return;
      }

      setIsLoading(true);
      try {
        const userProgress = await userProgressService.getUserProgress(user.id);
        setProgress(userProgress);
      } catch (error) {
        console.error('Error loading user progress:', error);
        setProgress(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProgress();
  }, [isAuthenticated, user]);

  const markChapterAsRead = async (bookId: string, chapterId: string) => {
    if (!isAuthenticated || !user || !progress) return;

    try {
      const updatedProgress = await userProgressService.markChapterAsRead(
        user.id,
        bookId,
        chapterId
      );
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error marking chapter as read:', error);
    }
  };

  const toggleFavoriteMyth = async (mythId: string) => {
    if (!isAuthenticated || !user || !progress) return;

    try {
      const updatedProgress = await userProgressService.toggleFavoriteMyth(
        user.id,
        mythId
      );
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error toggling favorite myth:', error);
    }
  };

  const toggleFavoriteDoctrine = async (doctrineId: string) => {
    if (!isAuthenticated || !user || !progress) return;

    try {
      const updatedProgress = await userProgressService.toggleFavoriteDoctrine(
        user.id,
        doctrineId
      );
      setProgress(updatedProgress);
    } catch (error) {
      console.error('Error toggling favorite doctrine:', error);
    }
  };

  const getReadingStreak = () => {
    if (!progress) return 0;
    return progress.readingStreak;
  };

  const getUnlockedFeatures = () => {
    if (!progress) return [];
    return progress.unlockedFeatures;
  };

  // Calculate level based on XP (simple formula: level = XP / 100)
  const calculateLevel = (xp: number) => Math.floor(xp / 100) + 1;

  const value = {
    progress,
    favoriteMyths: progress?.favoriteMyths || [],
    favoriteDoctrine: progress?.favoriteDoctrine || [],
    badges: progress?.badges || [],
    experience: progress?.experience || 0,
    level: progress ? calculateLevel(progress.experience) : 0,
    markChapterAsRead,
    toggleFavoriteMyth,
    toggleFavoriteDoctrine,
    isLoading,
    getReadingStreak,
    getUnlockedFeatures,
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};