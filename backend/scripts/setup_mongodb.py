#!/usr/bin/env python3
"""
MongoDB Database Setup Script for Micaiah's Stand

This script creates a MongoDB database with all necessary collections
and populates them with data from the JSON files in the data folder.

Requirements:
- pymongo: pip install pymongo
- MongoDB server running locally or connection string to remote MongoDB

Usage:
python setup_mongodb.py [--connection-string <mongodb_connection_string>]
"""

import json
import os
import sys
import argparse
from datetime import datetime
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, DuplicateKeyError

class MongoDBSetup:
    def __init__(self, connection_string="mongodb://localhost:27017/"):
        """Initialize MongoDB connection"""
        self.connection_string = connection_string
        self.client = None
        self.db = None
        self.db_name = "micaiahs_stand"
        
    def connect(self):
        """Connect to MongoDB"""
        try:
            print(f"Connecting to MongoDB at {self.connection_string}")
            self.client = MongoClient(self.connection_string)
            # Test the connection
            self.client.admin.command('ping')
            self.db = self.client[self.db_name]
            print(f"✅ Successfully connected to MongoDB")
            print(f"📁 Using database: {self.db_name}")
            return True
        except ConnectionFailure as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            return False
    
    def load_json_file(self, file_path):
        """Load and parse JSON file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"📄 Loaded {file_path}")
            return data
        except FileNotFoundError:
            print(f"⚠️  File not found: {file_path}")
            return None
        except json.JSONDecodeError as e:
            print(f"❌ Error parsing JSON in {file_path}: {e}")
            return None
    
    def create_collection_with_data(self, collection_name, data, indexes=None):
        """Create collection and insert data"""
        try:
            collection = self.db[collection_name]
            
            # Drop existing collection if it exists
            if collection_name in self.db.list_collection_names():
                collection.drop()
                print(f"🗑️  Dropped existing collection: {collection_name}")
            
            # Insert data
            if isinstance(data, list) and data:
                result = collection.insert_many(data)
                print(f"✅ Created collection '{collection_name}' with {len(result.inserted_ids)} documents")
            elif isinstance(data, dict):
                # Handle nested data structures (like bible_books.json)
                if collection_name == 'bible_books':
                    # Flatten the genre-based structure
                    all_books = []
                    for genre, books in data.items():
                        for book in books:
                            book['genre'] = genre
                            all_books.append(book)
                    result = collection.insert_many(all_books)
                    print(f"✅ Created collection '{collection_name}' with {len(result.inserted_ids)} documents")
                else:
                    # For other dict structures, insert as single document
                    result = collection.insert_one(data)
                    print(f"✅ Created collection '{collection_name}' with 1 document")
            else:
                print(f"⚠️  No data to insert for collection: {collection_name}")
                return
            
            # Create indexes if specified
            if indexes:
                for index in indexes:
                    collection.create_index(index)
                    print(f"📇 Created index on {collection_name}: {index}")
                    
        except Exception as e:
            print(f"❌ Error creating collection {collection_name}: {e}")
    
    def setup_bible_books(self):
        """Setup bible_books collection"""
        data = self.load_json_file('data/bible_books.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("genre", 1)],  # Index on genre
                [("name", 1)]   # Index on name
            ]
            self.create_collection_with_data('bible_books', data, indexes)
    
    def setup_myths(self):
        """Setup myths collection"""
        data = self.load_json_file('data/myths.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("category", 1)],  # Index on category
                [("tags", 1)],  # Index on tags array
                [("title", "text")]  # Text index for search
            ]
            self.create_collection_with_data('myths', data, indexes)
    
    def setup_doctrines(self):
        """Setup doctrines collection"""
        data = self.load_json_file('data/doctrines.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("category", 1)],  # Index on category
                [("title", "text")]  # Text index for search
            ]
            self.create_collection_with_data('doctrines', data, indexes)
    
    def setup_bible_concepts(self):
        """Setup bible_concepts collection"""
        data = self.load_json_file('data/bible_concepts.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("title", "text")],  # Text index for search
                [("description", "text")]  # Text index for search
            ]
            self.create_collection_with_data('bible_concepts', data, indexes)
    
    def setup_scripture_context(self):
        """Setup scripture_context collection"""
        data = self.load_json_file('data/scripture_context.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("reference", 1)],  # Index on scripture reference
                [("verse", "text")]  # Text index for search
            ]
            self.create_collection_with_data('scripture_context', data, indexes)
    
    def setup_biblical_locations(self):
        """Setup biblical_locations collection"""
        data = self.load_json_file('data/biblical_locations.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("coordinates", "2dsphere")],  # Geospatial index
                [("historicalPeriod", 1)],  # Index on historical period
                [("name", "text")]  # Text index for search
            ]
            self.create_collection_with_data('biblical_locations', data, indexes)
    
    def setup_journey_routes(self):
        """Setup journey_routes collection"""
        data = self.load_json_file('data/journey_routes.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("type", 1)],  # Index on journey type
                [("character", 1)],  # Index on character
                [("relatedBooks", 1)],  # Index on related books array
                [("name", "text")]  # Text index for search
            ]
            self.create_collection_with_data('journey_routes', data, indexes)
    
    def setup_users(self):
        """Setup users collection"""
        data = self.load_json_file('data/users.json')
        if data:
            indexes = [
                [("id", 1)],  # Unique index on id
                [("email", 1)],  # Unique index on email
                [("username", 1)]  # Index on username
            ]
            self.create_collection_with_data('users', data, indexes)
    
    def setup_user_progress(self):
        """Setup user_progress collection"""
        data = self.load_json_file('data/user_progress.json')
        if data:
            # Convert the object structure to array of documents
            progress_docs = []
            for user_id, progress in data.items():
                progress['_id'] = user_id  # Use user_id as document _id
                progress_docs.append(progress)
            
            indexes = [
                [("userId", 1)],  # Unique index on userId
                [("experience", -1)],  # Index on experience (descending)
                [("readingStreak", -1)]  # Index on reading streak (descending)
            ]
            self.create_collection_with_data('user_progress', progress_docs, indexes)
    
    def setup_verses(self):
        """Setup verses collection from verses folder"""
        verses_dir = 'data/verses'
        if not os.path.exists(verses_dir):
            print(f"⚠️  Verses directory not found: {verses_dir}")
            return
        
        all_verses = []
        
        # Process all verse files
        for filename in os.listdir(verses_dir):
            if filename.endswith('.json'):
                file_path = os.path.join(verses_dir, filename)
                verses_data = self.load_json_file(file_path)
                
                if verses_data:
                    # Extract book and chapter from filename (e.g., genesis_1.json)
                    book_chapter = filename.replace('.json', '')
                    parts = book_chapter.split('_')
                    if len(parts) >= 2:
                        book_id = parts[0]
                        chapter = int(parts[1])
                        
                        # Add metadata to each verse
                        for verse in verses_data:
                            verse['bookId'] = book_id
                            verse['chapter'] = chapter
                            verse['_id'] = f"{book_id}_{chapter}_{verse['number']}"
                            all_verses.append(verse)
        
        if all_verses:
            indexes = [
                [("bookId", 1)],  # Index on book ID
                [("chapter", 1)],  # Index on chapter
                [("bookId", 1), ("chapter", 1)],  # Compound index
                [("text", "text")]  # Text index for search
            ]
            self.create_collection_with_data('verses', all_verses, indexes)
    
    def create_additional_indexes(self):
        """Create additional useful indexes"""
        try:
            # Create compound text index for global search
            print("📇 Creating additional indexes...")
            
            # Global text search across multiple collections
            collections_for_text_search = ['myths', 'doctrines', 'bible_concepts', 'scripture_context']
            for collection_name in collections_for_text_search:
                if collection_name in self.db.list_collection_names():
                    collection = self.db[collection_name]
                    # Create compound text index for better search
                    try:
                        collection.create_index([
                            ("title", "text"),
                            ("description", "text") if collection_name == 'bible_concepts' else ("summary", "text")
                        ])
                        print(f"📇 Created compound text index for {collection_name}")
                    except Exception as e:
                        print(f"⚠️  Could not create text index for {collection_name}: {e}")
            
            print("✅ Additional indexes created")
            
        except Exception as e:
            print(f"❌ Error creating additional indexes: {e}")
    
    def verify_setup(self):
        """Verify the database setup"""
        print("\n🔍 Verifying database setup...")
        
        collections = self.db.list_collection_names()
        expected_collections = [
            'bible_books', 'myths', 'doctrines', 'bible_concepts', 
            'scripture_context', 'biblical_locations', 'journey_routes',
            'users', 'user_progress', 'verses'
        ]
        
        print(f"📊 Database: {self.db_name}")
        print(f"📁 Collections found: {len(collections)}")
        
        for collection_name in expected_collections:
            if collection_name in collections:
                count = self.db[collection_name].count_documents({})
                print(f"  ✅ {collection_name}: {count} documents")
            else:
                print(f"  ❌ {collection_name}: Missing")
        
        # Show total documents
        total_docs = sum(self.db[col].count_documents({}) for col in collections)
        print(f"\n📈 Total documents: {total_docs}")
        
        # Show indexes
        print(f"\n📇 Indexes created:")
        for collection_name in collections:
            indexes = list(self.db[collection_name].list_indexes())
            print(f"  {collection_name}: {len(indexes)} indexes")
    
    def run_setup(self):
        """Run the complete database setup"""
        print("🚀 Starting MongoDB setup for Micaiah's Stand")
        print("=" * 50)
        
        if not self.connect():
            return False
        
        # Change to the backend directory to access data files
        script_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.dirname(script_dir)
        os.chdir(backend_dir)
        
        print(f"📂 Working directory: {os.getcwd()}")
        
        # Setup all collections
        print("\n📚 Setting up collections...")
        self.setup_bible_books()
        self.setup_myths()
        self.setup_doctrines()
        self.setup_bible_concepts()
        self.setup_scripture_context()
        self.setup_biblical_locations()
        self.setup_journey_routes()
        self.setup_users()
        self.setup_user_progress()
        self.setup_verses()
        
        # Create additional indexes
        self.create_additional_indexes()
        
        # Verify setup
        self.verify_setup()
        
        print("\n🎉 MongoDB setup completed successfully!")
        print(f"🔗 Connection string: {self.connection_string}")
        print(f"🗄️  Database name: {self.db_name}")
        
        return True
    
    def close(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            print("🔌 MongoDB connection closed")

def main():
    parser = argparse.ArgumentParser(description='Setup MongoDB database for Micaiah\'s Stand')
    parser.add_argument(
        '--connection-string', 
        default='mongodb://localhost:27017/',
        help='MongoDB connection string (default: mongodb://localhost:27017/)'
    )
    parser.add_argument(
        '--database-name',
        default='micaiahs_stand',
        help='Database name (default: micaiahs_stand)'
    )
    
    args = parser.parse_args()
    
    # Create setup instance
    setup = MongoDBSetup(args.connection_string)
    setup.db_name = args.database_name
    
    try:
        success = setup.run_setup()
        if success:
            print("\n✨ Setup completed successfully!")
            print("\nNext steps:")
            print("1. Update your backend configuration to use MongoDB")
            print("2. Install pymongo in your backend: pip install pymongo")
            print("3. Update your services to use MongoDB instead of JSON files")
        else:
            print("\n❌ Setup failed!")
            sys.exit(1)
    except KeyboardInterrupt:
        print("\n⏹️  Setup interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        sys.exit(1)
    finally:
        setup.close()

if __name__ == "__main__":
    main()