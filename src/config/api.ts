// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  VERSION: import.meta.env.VITE_API_VERSION || 'v1',
  TIMEOUT: 10000, // 10 seconds
};

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
  },
  // Content endpoints
  CONTENT: {
    MYTHS: '/content/myths',
    MYTH_BY_ID: (id: string) => `/content/myths/${id}`,
    DOCTRINES: '/content/doctrines',
    DOCTRINE_BY_ID: (id: string) => `/content/doctrines/${id}`,
    BIBLE_CONCEPTS: '/content/bible-concepts',
    BIBLE_CONCEPT_BY_ID: (id: string) => `/content/bible-concepts/${id}`,
    SCRIPTURE_CONTEXT: '/content/scripture-context',
    SCRIPTURE_BY_ID: (id: string) => `/content/scripture-context/${id}`,
  },
  // Bible endpoints
  BIBLE: {
    BOOKS: '/bible/books',
    BOOKS_BY_GENRE: '/bible/books/by-genre',
    HISTORICAL_CONTEXT: (bookId: string, chapter: number) => 
      `/bible/books/${bookId}/chapters/${chapter}/historical-context`,
    GEOGRAPHIC_CONTEXT: (bookId: string, chapter: number) => 
      `/bible/books/${bookId}/chapters/${chapter}/geographic-context`,
    CHAPTER_INTRO: (bookId: string, chapter: number) => 
      `/bible/books/${bookId}/chapters/${chapter}/introduction`,
    CHAPTER_VERSES: (bookId: string, chapter: number) => 
      `/bible/books/${bookId}/chapters/${chapter}/verses`,
    READING_PROGRESS: (userId: string) => `/bible/reading-progress/${userId}`,
  },
  // Journey endpoints
  JOURNEY: {
    ROUTES: '/journey/routes',
    ROUTE_BY_ID: (id: string) => `/journey/routes/${id}`,
    ROUTES_BY_CHAPTER: '/journey/routes/by-chapter',
    LOCATIONS: '/journey/locations',
    LOCATION_BY_ID: (id: string) => `/journey/locations/${id}`,
    LOCATIONS_BY_JOURNEY: (journeyId: string) => `/journey/locations/by-journey/${journeyId}`,
  },
  // Progress endpoints
  PROGRESS: {
    USER_PROGRESS: (userId: string) => `/progress/users/${userId}`,
    MARK_CHAPTER_READ: (userId: string, bookId: string, chapterId: string) => 
      `/progress/users/${userId}/chapters/${bookId}/${chapterId}`,
    TOGGLE_FAVORITE_MYTH: (userId: string, mythId: string) => 
      `/progress/users/${userId}/favorite-myths/${mythId}`,
    TOGGLE_FAVORITE_DOCTRINE: (userId: string, doctrineId: string) => 
      `/progress/users/${userId}/favorite-doctrines/${doctrineId}`,
    READING_STREAK: (userId: string) => `/progress/users/${userId}/reading-streak`,
    UNLOCKED_FEATURES: (userId: string) => `/progress/users/${userId}/unlocked-features`,
  },
};

// Build full API URL
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, '');
  const version = API_CONFIG.VERSION;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}/api/${version}${cleanEndpoint}`;
};