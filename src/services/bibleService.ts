import { BibleBook, HistoricalContext, GeographicContext, ChapterIntroduction, ReadingProgress } from '../types/bible';
import { bibleBooks, getAllBooks, getBooksByGenre } from '../data/bibleData';
import { ChapterProgress } from '../types/progress';
import { simulateNetworkDelay } from '../utils/helpers';
import { apiClient, ApiError } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';

class BibleService {
  async getAllBooks(): Promise<BibleBook[]> {
    try {
      // Try backend first
      const response = await apiClient.get<BibleBook[]>(API_ENDPOINTS.BIBLE.BOOKS);
      return response;
    } catch (error) {
      console.warn('Backend books request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return getAllBooks();
    }
  }

  async getBooksByGenre(): Promise<Record<string, BibleBook[]>> {
    try {
      // Try backend first
      const response = await apiClient.get<Record<string, BibleBook[]>>(API_ENDPOINTS.BIBLE.BOOKS_BY_GENRE);
      return response;
    } catch (error) {
      console.warn('Backend books by genre request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return getBooksByGenre();
    }
  }

  async getHistoricalContext(bookId: string, chapter: number): Promise<HistoricalContext> {
    try {
      // Try backend first
      const response = await apiClient.get<HistoricalContext>(
        API_ENDPOINTS.BIBLE.HISTORICAL_CONTEXT(bookId, chapter)
      );
      return response;
    } catch (error) {
      console.warn('Backend historical context request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return this.getMockHistoricalContext(bookId, chapter);
    }
  }

  async getGeographicContext(bookId: string, chapter: number): Promise<GeographicContext> {
    try {
      // Try backend first
      const response = await apiClient.get<GeographicContext>(
        API_ENDPOINTS.BIBLE.GEOGRAPHIC_CONTEXT(bookId, chapter)
      );
      return response;
    } catch (error) {
      console.warn('Backend geographic context request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return this.getMockGeographicContext(bookId, chapter);
    }
  }

  async getChapterIntroduction(bookId: string, chapter: number): Promise<ChapterIntroduction> {
    try {
      // Try backend first
      const response = await apiClient.get<ChapterIntroduction>(
        API_ENDPOINTS.BIBLE.CHAPTER_INTRO(bookId, chapter)
      );
      return response;
    } catch (error) {
      console.warn('Backend chapter introduction request failed, falling back to mock data:', error);
      
      // Fallback to mock data
      await simulateNetworkDelay();
      return this.getMockChapterIntroduction(bookId, chapter);
    }
  }

  async getCurrentReadingPosition(readingProgress: ChapterProgress[]): Promise<ReadingProgress> {
    try {
      // For reading position, we'll use the local calculation since it depends on user progress
      const allBooks = await this.getAllBooks();
      let currentBook = allBooks[0];
      let currentChapter = 1;

      for (const book of allBooks) {
        const bookProgress = readingProgress.find(bp => bp.bookId === book.id);
        if (!bookProgress || bookProgress.chaptersRead.length < book.chapters) {
          currentBook = book;
          currentChapter = (bookProgress?.chaptersRead.length || 0) + 1;
          break;
        }
      }

      const overallProgress = await this.calculateProgress(readingProgress);

      return {
        currentBook,
        currentChapter,
        overallProgress
      };
    } catch (error) {
      console.warn('Error calculating reading position:', error);
      
      // Fallback
      const allBooks = getAllBooks();
      return {
        currentBook: allBooks[0],
        currentChapter: 1,
        overallProgress: 0
      };
    }
  }

  async calculateProgress(readingProgress: ChapterProgress[]): Promise<number> {
    const allBooks = await this.getAllBooks();
    const totalChapters = allBooks.reduce((sum, book) => sum + book.chapters, 0);
    const completedChapters = readingProgress.reduce(
      (sum, book) => sum + book.chaptersRead.length,
      0
    );
    return Math.round((completedChapters / totalChapters) * 100);
  }

  // Mock data methods (fallback implementations)
  private getMockHistoricalContext(bookId: string, chapter: number): HistoricalContext {
    if (bookId === 'genesis') {
      switch (chapter) {
        case 1:
          return {
            period: "Pre-history",
            date: "Creation",
            background: "The beginning of everything - God creates the universe, earth, and all life",
            concurrent: [
              "No concurrent events - this is the absolute beginning",
              "Establishment of natural order and cycles",
              "Institution of time, space, and matter"
            ]
          };
        case 2:
          return {
            period: "Creation Week",
            date: "Day 6-7 of Creation",
            background: "Detailed account of humanity's creation and the Garden of Eden",
            concurrent: [
              "First human civilization being established",
              "Naming of animals",
              "Institution of marriage"
            ]
          };
        case 3:
          return {
            period: "Early Earth",
            date: "Shortly after Creation",
            background: "The fall of humanity through disobedience and its consequences",
            concurrent: [
              "First sin enters the world",
              "Curse pronounced on creation",
              "Promise of redemption given"
            ]
          };
        default:
          return {
            period: "Early Earth",
            date: "Pre-Flood Era",
            background: "The early history of human civilization",
            concurrent: [
              "Development of early human society",
              "Growth of human population",
              "Increase of wickedness on earth"
            ]
          };
      }
    }

    return {
      period: "Unknown Period",
      date: "Unknown Date",
      background: "Historical context not available",
      concurrent: []
    };
  }

  private getMockGeographicContext(bookId: string, chapter: number): GeographicContext {
    if (bookId === 'genesis') {
      switch (chapter) {
        case 1:
          return {
            mainLocation: "The Universe/Earth",
            relatedSites: [
              "The heavens",
              "The earth",
              "The seas",
              "The dry land"
            ],
            routes: [
              "Movement of celestial bodies",
              "Water cycle patterns",
              "Atmospheric systems"
            ]
          };
        case 2:
          return {
            mainLocation: "Garden of Eden",
            relatedSites: [
              "Four rivers (Pishon, Gihon, Tigris, Euphrates)",
              "Land of Havilah",
              "Tree of Life",
              "Tree of Knowledge of Good and Evil"
            ],
            routes: [
              "River systems through Eden",
              "Adam's paths through the garden",
              "Animal migration patterns"
            ]
          };
        case 3:
          return {
            mainLocation: "Garden of Eden and its surroundings",
            relatedSites: [
              "East of Eden",
              "Garden entrance",
              "Location of Cherubim guards",
              "New dwelling place of Adam and Eve"
            ],
            routes: [
              "Path of expulsion from Eden",
              "New territories for human habitation",
              "Blocked route back to Tree of Life"
            ]
          };
        default:
          return {
            mainLocation: "Ancient Near East",
            relatedSites: [
              "Early human settlements",
              "Agricultural regions",
              "First cities"
            ],
            routes: [
              "Early trade routes",
              "Migration patterns",
              "River systems"
            ]
          };
      }
    }

    return {
      mainLocation: "Location unknown",
      relatedSites: [],
      routes: []
    };
  }

  private getMockChapterIntroduction(bookId: string, chapter: number): ChapterIntroduction {
    if (bookId === 'genesis') {
      switch (chapter) {
        case 1:
          return {
            summary: "God creates the universe, earth, and all life in six days",
            themes: [
              "God's creative power",
              "Order from chaos",
              "The goodness of creation",
              "Human dignity and purpose"
            ],
            characters: [
              { name: "God", role: "Creator of all things" },
              { name: "Spirit of God", role: "Hovering over the waters" },
              { name: "Humanity", role: "Created in God's image" }
            ],
            structure: [
              "Initial creation (1-2)",
              "First day: Light (3-5)",
              "Second day: Sky and waters (6-8)",
              "Third day: Land and vegetation (9-13)",
              "Fourth day: Sun, moon, and stars (14-19)",
              "Fifth day: Sea creatures and birds (20-23)",
              "Sixth day: Land animals and humans (24-31)"
            ]
          };
        case 2:
          return {
            summary: "Detailed account of humanity's creation and life in Eden",
            themes: [
              "Human purpose and work",
              "Marriage institution",
              "Relationship with God",
              "Stewardship of creation"
            ],
            characters: [
              { name: "God", role: "Creator and provider" },
              { name: "Adam", role: "First man, garden keeper" },
              { name: "Eve", role: "First woman, helper suitable for Adam" }
            ],
            structure: [
              "Seventh day rest (1-3)",
              "Creation of man (4-7)",
              "Planting of Eden (8-14)",
              "Man's role and the first command (15-17)",
              "Creation of woman (18-25)"
            ]
          };
        case 3:
          return {
            summary: "The fall of humanity through disobedience and its consequences",
            themes: [
              "Temptation and sin",
              "Consequences of disobedience",
              "God's judgment and mercy",
              "Promise of redemption"
            ],
            characters: [
              { name: "Serpent", role: "Tempter" },
              { name: "Eve", role: "First to be tempted and sin" },
              { name: "Adam", role: "Participates in sin" },
              { name: "God", role: "Judge and provider of hope" }
            ],
            structure: [
              "The temptation (1-5)",
              "The sin (6-7)",
              "The confrontation (8-13)",
              "The curses (14-19)",
              "The provision and expulsion (20-24)"
            ]
          };
        default:
          return {
            summary: "Early history continues",
            themes: [
              "Human development",
              "Sin's effects",
              "God's sovereignty"
            ],
            characters: [
              { name: "Various individuals", role: "Early human history participants" }
            ],
            structure: [
              "Chapter events and developments"
            ]
          };
      }
    }

    return {
      summary: "Chapter introduction not available",
      themes: [],
      characters: [],
      structure: []
    };
  }
}

export const bibleService = new BibleService();