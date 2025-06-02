import { simulateNetworkDelay } from '../utils/helpers';
import { UserProgress } from '../types/progress';

// Simulated user progress data storage
const userProgressMap: Record<string, UserProgress> = {};

class UserProgressService {
  async getUserProgress(userId: string): Promise<UserProgress> {
    await simulateNetworkDelay();
    
    // Check if we already have progress for this user
    if (userProgressMap[userId]) {
      return userProgressMap[userId];
    }
    
    // Create default progress for new user
    const newProgress: UserProgress = {
      userId,
      bibleReadingProgress: [],
      favoriteMyths: [],
      favoriteDoctrine: [],
      experience: 0,
      readingStreak: 0,
      badges: [],
      lastReadDate: null,
      unlockedFeatures: [],
    };
    
    userProgressMap[userId] = newProgress;
    return newProgress;
  }

  async markChapterAsRead(userId: string, bookId: string, chapterId: string): Promise<UserProgress> {
    await simulateNetworkDelay();
    
    // Get current progress
    const progress = await this.getUserProgress(userId);
    
    // Check if this book exists in progress
    const bookProgress = progress.bibleReadingProgress.find(bp => bp.bookId === bookId);
    
    if (bookProgress) {
      // Check if chapter is already marked as read
      if (!bookProgress.chaptersRead.includes(chapterId)) {
        bookProgress.chaptersRead.push(chapterId);
        
        // Award XP for reading
        progress.experience += 10;
        
        // Check for streaks
        const today = new Date().toISOString().split('T')[0];
        if (progress.lastReadDate !== today) {
          progress.lastReadDate = today;
          progress.readingStreak += 1;
          
          // Award streak bonus (every 7 days)
          if (progress.readingStreak % 7 === 0) {
            progress.experience += 50;
          }
        }
        
        // Check for unlockable features based on reading progress
        this.checkForUnlocks(progress, bookId, chapterId);
      }
    } else {
      // First chapter read in this book
      progress.bibleReadingProgress.push({
        bookId,
        chaptersRead: [chapterId],
      });
      
      // Award XP for reading
      progress.experience += 10;
      
      // Update streak
      const today = new Date().toISOString().split('T')[0];
      if (progress.lastReadDate !== today) {
        progress.lastReadDate = today;
        progress.readingStreak += 1;
      }
      
      // Check for unlockable features
      this.checkForUnlocks(progress, bookId, chapterId);
    }
    
    // Save updated progress
    userProgressMap[userId] = progress;
    
    return progress;
  }

  async toggleFavoriteMyth(userId: string, mythId: string): Promise<UserProgress> {
    await simulateNetworkDelay();
    
    // Get current progress
    const progress = await this.getUserProgress(userId);
    
    // Check if this myth is already a favorite
    const isFavorite = progress.favoriteMyths.includes(mythId);
    
    if (isFavorite) {
      // Remove from favorites
      progress.favoriteMyths = progress.favoriteMyths.filter(id => id !== mythId);
    } else {
      // Add to favorites
      progress.favoriteMyths.push(mythId);
    }
    
    // Save updated progress
    userProgressMap[userId] = progress;
    
    return progress;
  }

  async toggleFavoriteDoctrine(userId: string, doctrineId: string): Promise<UserProgress> {
    await simulateNetworkDelay();
    
    // Get current progress
    const progress = await this.getUserProgress(userId);
    
    // Check if this doctrine is already a favorite
    const isFavorite = progress.favoriteDoctrine.includes(doctrineId);
    
    if (isFavorite) {
      // Remove from favorites
      progress.favoriteDoctrine = progress.favoriteDoctrine.filter(id => id !== doctrineId);
    } else {
      // Add to favorites
      progress.favoriteDoctrine.push(doctrineId);
    }
    
    // Save updated progress
    userProgressMap[userId] = progress;
    
    return progress;
  }

  private checkForUnlocks(progress: UserProgress, bookId: string, chapterId: string): void {
    // Check if user has unlocked all chapters in a book to award badges
    if (bookId === 'genesis' && this.hasCompletedBook(progress, 'genesis')) {
      this.awardBadge(progress, 'genesis_scholar', 'Genesis Scholar', 'Completed reading the book of Genesis');
    }
    
    if (bookId === 'exodus' && this.hasCompletedBook(progress, 'exodus')) {
      this.awardBadge(progress, 'exodus_explorer', 'Exodus Explorer', 'Completed reading the book of Exodus');
    }
    
    // Check for unlockable features based on specific readings
    if (bookId === 'romans') {
      // Unlock "Predestination Toolkit" after reading Romans
      if (!progress.unlockedFeatures.includes('predestination_toolkit')) {
        progress.unlockedFeatures.push('predestination_toolkit');
      }
    }
    
    if (bookId === 'leviticus' && this.hasCompletedBook(progress, 'leviticus')) {
      // Unlock "Law vs. Grace" pathway after completing Leviticus
      if (!progress.unlockedFeatures.includes('law_vs_grace_pathway')) {
        progress.unlockedFeatures.push('law_vs_grace_pathway');
      }
    }
    
    // Check if all Torah books are complete
    const torahBooks = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy'];
    const hasCompletedTorah = torahBooks.every(book => this.hasCompletedBook(progress, book));
    
    if (hasCompletedTorah && !progress.badges.some(b => b.id === 'torah_scholar')) {
      this.awardBadge(
        progress, 
        'torah_scholar', 
        'Torah Scholar', 
        'Completed reading the Torah (Pentateuch)'
      );
      
      // Unlock advanced feature
      if (!progress.unlockedFeatures.includes('cultural_analysis')) {
        progress.unlockedFeatures.push('cultural_analysis');
      }
    }
    
    // Check if all Gospels are complete
    const gospelBooks = ['matthew', 'mark', 'luke', 'john'];
    const hasCompletedGospels = gospelBooks.every(book => this.hasCompletedBook(progress, book));
    
    if (hasCompletedGospels && !progress.badges.some(b => b.id === 'gospel_witness')) {
      this.awardBadge(
        progress,
        'gospel_witness',
        'Gospel Witness',
        'Completed reading all four Gospels'
      );
      
      // Unlock "Kingdom of God" feature
      if (!progress.unlockedFeatures.includes('kingdom_of_god')) {
        progress.unlockedFeatures.push('kingdom_of_god');
      }
    }
  }

  private hasCompletedBook(progress: UserProgress, bookId: string): boolean {
    // This is a simplified check - in a real app we would have a database of how many chapters each book has
    const bookProgress = progress.bibleReadingProgress.find(bp => bp.bookId === bookId);
    
    if (!bookProgress) {
      return false;
    }
    
    // Simplified chapter count for demo purposes
    const chapterCounts: Record<string, number> = {
      'genesis': 50,
      'exodus': 40,
      'leviticus': 27,
      'numbers': 36,
      'deuteronomy': 34,
      'matthew': 28,
      'mark': 16,
      'luke': 24,
      'john': 21,
      'romans': 16,
    };
    
    return bookProgress.chaptersRead.length >= (chapterCounts[bookId] || 0);
  }

  private awardBadge(progress: UserProgress, id: string, name: string, description: string): void {
    // Check if badge already exists
    if (!progress.badges.some(badge => badge.id === id)) {
      progress.badges.push({
        id,
        name,
        description,
        awardedAt: new Date().toISOString(),
      });
      
      // Award XP for badge
      progress.experience += 100;
    }
  }
}

export const userProgressService = new UserProgressService();