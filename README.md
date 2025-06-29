# It Is Written - Biblical Truth Explorer

A modern web application built with React and TypeScript for exploring biblical truth, understanding common Christian myths, and tracking Bible reading progress.

## Features

- 📖 **Bible Reading Progress Tracker**
  - Sequential and chronological reading plans
  - Chapter-by-chapter progress tracking
  - Historical and geographical context for each chapter
  - Detailed chapter introductions and themes

- 🔍 **Myth Deconstruction**
  - Common Christian myths explored
  - Biblical counter-arguments
  - Scriptural references and context
  - Categorized by topics

- 🛡️ **Core Doctrines**
  - Foundational Christian beliefs
  - Biblical support and definitions
  - Common misunderstandings addressed
  - Clear, balanced explanations

- 📚 **Scripture Context**
  - Commonly misused verses explained
  - Historical and literary context
  - Proper interpretation guidelines
  - Book themes and backgrounds

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Build Tool**: Vite
- **State Management**: React Context API

### Backend
- **Framework**: FastAPI (Python)
- **Data Storage**: JSON files (development)
- **Authentication**: JWT tokens
- **API Documentation**: Auto-generated OpenAPI/Swagger

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── contexts/          # React Context providers
│   │   ├── data/             # Static data and mock databases
│   │   ├── pages/            # Route components
│   │   ├── services/         # API and business logic
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Helper functions
│   │   └── config/           # Configuration files
│   └── ...
├── backend/
│   ├── app/
│   │   ├── api/              # API route handlers
│   │   ├── core/             # Core configuration
│   │   ├── models/           # Pydantic models
│   │   ├── services/         # Business logic
│   │   └── ...
│   ├── data/                 # JSON data files
│   └── ...
└── ...
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ and pip

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:8000
   VITE_API_VERSION=v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python run.py
   ```

5. Access API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)

## API Integration

The frontend automatically connects to the backend API when available and falls back to mock data when the backend is unavailable. This ensures the application works in all scenarios:

- **Backend Available**: Full API integration with real-time data
- **Backend Unavailable**: Graceful fallback to local mock data
- **Offline Mode**: Cached data and offline functionality

### Connection Status

The application displays a connection status indicator that shows:
- ✅ Connected to backend
- ⚠️ Backend unavailable (using local data)
- ❌ Offline (using cached data)

## Development Features

- **Authentication System**
  - User registration and login
  - JWT token management
  - Protected routes
  - Session persistence

- **Progress Tracking**
  - Reading progress persistence
  - Achievement system
  - Experience points and levels
  - Reading streaks

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interactions

- **Performance Optimizations**
  - Code splitting
  - Lazy loading
  - Optimized animations
  - Error boundaries

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Content
- `GET /api/v1/content/myths` - Get all myths
- `GET /api/v1/content/doctrines` - Get all doctrines
- `GET /api/v1/content/bible-concepts` - Search bible concepts
- `GET /api/v1/content/scripture-context` - Get misused verses

### Bible
- `GET /api/v1/bible/books` - Get all Bible books
- `GET /api/v1/bible/books/by-genre` - Get books by genre
- `GET /api/v1/bible/books/{book_id}/chapters/{chapter}/verses` - Get chapter verses

### Progress
- `GET /api/v1/progress/users/{user_id}` - Get user progress
- `POST /api/v1/progress/users/{user_id}/chapters/{book_id}/{chapter_id}` - Mark chapter as read

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_API_VERSION=v1
```

### Backend
```
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Deployment

### Frontend (Netlify)
The frontend is configured for easy deployment to Netlify:

```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Backend (Production)
For production deployment:

1. Set environment variables
2. Use a production WSGI server like Gunicorn
3. Configure a proper database (PostgreSQL recommended)
4. Set up proper logging and monitoring

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)