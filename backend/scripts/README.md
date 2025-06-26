# MongoDB Setup Script

This script creates a MongoDB database for Micaiah's Stand and populates it with all the data from the JSON files.

## Prerequisites

1. **MongoDB Server**: Make sure you have MongoDB running locally or have access to a remote MongoDB instance
2. **Python 3.7+**: The script requires Python 3.7 or higher
3. **Required Python packages**: Install the required packages

## Installation

1. Navigate to the scripts directory:
```bash
cd backend/scripts
```

2. Install required Python packages:
```bash
pip install -r requirements.txt
```

## Usage

### Basic Usage (Local MongoDB)
```bash
python setup_mongodb.py
```

### Custom Connection String
```bash
python setup_mongodb.py --connection-string "mongodb://username:password@localhost:27017/"
```

### Custom Database Name
```bash
python setup_mongodb.py --database-name "my_custom_db"
```

### MongoDB Atlas (Cloud)
```bash
python setup_mongodb.py --connection-string "mongodb+srv://username:password@cluster.mongodb.net/"
```

## What the Script Does

1. **Connects to MongoDB** using the provided connection string
2. **Creates database** named `micaiahs_stand` (or custom name)
3. **Creates collections** for each data type:
   - `bible_books` - Bible books organized by genre
   - `myths` - Christian myths and their biblical counters
   - `doctrines` - Core Christian doctrines
   - `bible_concepts` - Biblical concepts with balanced perspectives
   - `scripture_context` - Commonly misused verses with proper context
   - `biblical_locations` - Geographic locations from biblical journeys
   - `journey_routes` - Biblical journey routes and missionary trips
   - `users` - User accounts
   - `user_progress` - User reading progress and achievements
   - `verses` - Individual Bible verses with explanations

4. **Creates indexes** for optimal query performance:
   - Unique indexes on ID fields
   - Text indexes for search functionality
   - Geospatial indexes for location data
   - Compound indexes for complex queries

5. **Populates collections** with data from JSON files
6. **Verifies setup** by counting documents and listing indexes

## Output

The script provides detailed output showing:
- Connection status
- Collection creation progress
- Index creation
- Document counts
- Verification results

Example output:
```
🚀 Starting MongoDB setup for Micaiah's Stand
==================================================
Connecting to MongoDB at mongodb://localhost:27017/
✅ Successfully connected to MongoDB
📁 Using database: micaiahs_stand

📚 Setting up collections...
📄 Loaded data/bible_books.json
✅ Created collection 'bible_books' with 25 documents
📇 Created index on bible_books: [('id', 1)]
...

🔍 Verifying database setup...
📊 Database: micaiahs_stand
📁 Collections found: 10
  ✅ bible_books: 25 documents
  ✅ myths: 5 documents
  ✅ doctrines: 5 documents
  ...

📈 Total documents: 150
🎉 MongoDB setup completed successfully!
```

## Troubleshooting

### Connection Issues
- Make sure MongoDB is running
- Check your connection string format
- Verify network connectivity for remote databases
- Check authentication credentials

### Permission Issues
- Ensure your MongoDB user has read/write permissions
- For MongoDB Atlas, check IP whitelist settings

### File Not Found Errors
- Make sure you're running the script from the correct directory
- Verify all JSON files exist in the `data/` folder

### Index Creation Errors
- Some indexes might already exist (this is normal)
- Text indexes require specific MongoDB versions

## Next Steps

After running this script successfully:

1. **Update Backend Configuration**: Modify your FastAPI backend to use MongoDB instead of JSON files
2. **Install MongoDB Driver**: Add `pymongo` to your backend requirements
3. **Update Services**: Modify your service classes to use MongoDB queries
4. **Environment Variables**: Set up MongoDB connection string in your environment

## Security Notes

- Never commit connection strings with credentials to version control
- Use environment variables for sensitive configuration
- Enable authentication on your MongoDB instance
- Use SSL/TLS for production deployments
- Regularly backup your database

## Database Schema

The script creates the following collections with their respective schemas:

### bible_books
```json
{
  "_id": ObjectId,
  "id": "string",
  "name": "string", 
  "chapters": "number",
  "genre": "string",
  "period": "string",
  "author": "string"
}
```

### myths
```json
{
  "_id": ObjectId,
  "id": "string",
  "title": "string",
  "popularPerception": "string",
  "biblicalCounterArgument": {
    "scripturalRefutation": "string",
    "contextualExplanation": "string", 
    "soundDoctrine": "string",
    "supportingScriptures": ["string"]
  },
  "category": "string",
  "tags": ["string"]
}
```

And similar schemas for all other collections based on the JSON data structure.