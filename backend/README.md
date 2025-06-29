# Micaiah's Stand API Backend

A comprehensive FastAPI backend for the Micaiah's Stand biblical education platform.

## Features

- **RESTful API** with comprehensive endpoints for all frontend services
- **JSON Data Storage** with structured data files for easy management
- **Authentication & Authorization** with JWT tokens
- **User Progress Tracking** with reading streaks, badges, and achievements
- **Content Management** for myths, doctrines, bible concepts, and scripture context
- **Journey Visualization** data for biblical routes and locations
- **Bible Reading Services** with chapters, verses, and contextual information
- **Google Maps Integration** for journey visualization

## Project Structure

```
backend/
├── app/
│   ├── api/v1/endpoints/     # API route handlers
│   ├── core/                 # Core configuration and security
│   ├── models/              # Pydantic models for request/response
│   └── services/            # Business logic services
├── data/                    # JSON data files
│   ├── myths.json
│   ├── doctrines.json
│   ├── bible_concepts.json
│   ├── scripture_context.json
│   ├── bible_books.json
│   ├── biblical_locations.json
│   ├── journey_routes.json
│   ├── users.json
│   ├── user_progress.json
│   └── verses/              # Chapter verses by book
└── requirements.txt
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user

### Content
- `GET /api/v1/content/myths` - Get all myths (with search)
- `GET /api/v1/content/myths/{id}` - Get specific myth
- `GET /api/v1/content/doctrines` - Get all doctrines (with search)
- `GET /api/v1/content/doctrines/{id}` - Get specific doctrine
- `GET /api/v1/content/bible-concepts` - Search bible concepts
- `GET /api/v1/content/scripture-context` - Get misused verses

### Bible
- `GET /api/v1/bible/books` - Get all Bible books
- `GET /api/v1/bible/books/by-genre` - Get books by genre
- `GET /api/v1/bible/books/{book_id}/chapters/{chapter}/verses` - Get chapter verses
- `GET /api/v1/bible/books/{book_id}/chapters/{chapter}/historical-context` - Get historical context
- `GET /api/v1/bible/books/{book_id}/chapters/{chapter}/geographic-context` - Get geographic context

### Journey
- `GET /api/v1/journey/routes` - Get all journey routes
- `GET /api/v1/journey/routes/{id}` - Get specific route
- `GET /api/v1/journey/routes/by-chapter` - Get routes by Bible chapter
- `GET /api/v1/journey/locations` - Get all biblical locations

### Progress
- `GET /api/v1/progress/users/{user_id}` - Get user progress
- `POST /api/v1/progress/users/{user_id}/chapters/{book_id}/{chapter_id}` - Mark chapter as read
- `POST /api/v1/progress/users/{user_id}/favorite-myths/{myth_id}` - Toggle favorite myth
- `POST /api/v1/progress/users/{user_id}/favorite-doctrines/{doctrine_id}` - Toggle favorite doctrine

### Maps
- `GET /api/v1/maps/config` - Get Google Maps configuration
- `GET /api/v1/maps/health` - Check maps availability

## Setup Instructions

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Google Maps Setup**
   - Get a Google Maps API key from [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)
   - Add it to your `.env` file:
     ```
     GOOGLE_MAPS_API_KEY=your-api-key-here
     ```
   - Enable the following APIs in Google Cloud Console:
     - Maps JavaScript API
     - Geocoding API (optional, for future features)

5. **Run Development Server**
   ```bash
   python run.py
   ```

   Or using uvicorn directly:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

6. **Access API Documentation**
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Environment Variables

### Required
- `SECRET_KEY` - Secret key for JWT token signing
- `GOOGLE_MAPS_API_KEY` - Google Maps API key for journey visualization

### Optional
- `ALGORITHM` - JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time (default: 30)
- `BACKEND_CORS_ORIGINS` - Allowed CORS origins (default: localhost:3000,localhost:5173)

## Data Management

### JSON Data Files
All data is stored in JSON files in the `data/` directory:

- **Content Data**: myths.json, doctrines.json, bible_concepts.json, scripture_context.json
- **Bible Data**: bible_books.json, biblical_locations.json, journey_routes.json
- **User Data**: users.json, user_progress.json
- **Verse Data**: verses/ directory with files like genesis_1.json

### Adding New Data
1. Edit the appropriate JSON file in the `data/` directory
2. Follow the existing data structure
3. Restart the server to load new data

## Google Maps Integration

The backend manages Google Maps configuration and API keys:

- Maps configuration is served through `/api/v1/maps/config`
- API key is securely stored in backend environment variables
- Frontend requests maps config from backend instead of using hardcoded keys
- Health check endpoint at `/api/v1/maps/health` verifies configuration

## Security Features

- **JWT Authentication** with configurable expiration
- **Password Hashing** using bcrypt
- **CORS Configuration** for frontend integration
- **Input Validation** using Pydantic models
- **Secure API Key Management** for external services

## Development Features

- **Auto-reload** during development
- **Comprehensive Logging** with configurable levels
- **API Documentation** auto-generated from code
- **Type Safety** with Python type hints and Pydantic
- **Modular Architecture** with clear separation of concerns

## Production Deployment

1. **Environment Variables**
   ```bash
   export SECRET_KEY="your-production-secret-key"
   export GOOGLE_MAPS_API_KEY="your-production-maps-key"
   export ALGORITHM="HS256"
   export ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

2. **Run with Gunicorn**
   ```bash
   pip install gunicorn
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

3. **Database Migration**
   - For production, consider migrating from JSON files to a proper database
   - PostgreSQL or MongoDB recommended for scalability

## API Testing

Use the interactive documentation at `/docs` or test with curl:

```bash
# Register user
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'

# Get myths
curl "http://localhost:8000/api/v1/content/myths"

# Get maps configuration
curl "http://localhost:8000/api/v1/maps/config"

# Check maps health
curl "http://localhost:8000/api/v1/maps/health"
```

## Contributing

1. Follow the existing code structure and patterns
2. Add appropriate type hints and documentation
3. Update this README when adding new features
4. Test all endpoints before submitting changes