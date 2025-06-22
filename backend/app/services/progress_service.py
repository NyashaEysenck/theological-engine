import json
import os
from typing import Optional
from datetime import datetime
from app.models.progress import UserProgress, ChapterProgress, Badge

class ProgressService:
    def __init__(self):
        self.data_dir = "backend/data"
        self.progress_file = os.path.join(self.data_dir, "user_progress.json")
        self._ensure_data_file()
    
    def _ensure_data_file(self):
        """Ensure the progress data file exists"""
        os.makedirs(self.data_dir, exist_ok=True)
        if not os.path.exists(self.progress_file):
            with open(self.progress_file, 'w') as f:
                json.dump({}, f)
    
    async def _load_progress_data(self) -> dict:
        """Load progress data from JSON file"""
        try:
            with open(self.progress_file, 'r') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {}
    
    async def _save_progress_data(self, data: dict):
        """Save progress data to JSON file"""
        with open(self.progress_file, 'w') as f:
            json.dump(data, f, indent=2, default=str)
    
    async def get_user_progress(self, user_id: str) -> UserProgress:
        """Get user's reading progress and achievements"""
        data = await self._load_progress_data()
        
        if user_id in data:
            return UserProgress(**data[user_id])
        
        # Create default progress for new user
        new_progress = UserProgress(
            user_id=user_id,
            bible_reading_progress=[],
            favorite_myths=[],
            favorite_doctrine=[],
            experience=0,
            reading_streak=0,
            badges=[],
            last_read_date=None,
            unlocked_features=[]
        )
        
        data[user_id] = new_progress.dict()
        await self._save_progress_data(data)
        
        return new_progress
    
    async def mark_chapter_as_read(self, user_id: str, book_id: str, chapter_id: str) -> UserProgress:
        """Mark a chapter as read for a user"""
        progress = await self.get_user_progress(user_id)
        
        # Find or create book progress
        book_progress = None
        for bp in progress.bible_reading_progress:
            if bp.book_id == book_id:
                book_progress = bp
                break
        
        if not book_progress:
            book_progress = ChapterProgress(book_id=book_id, chapters_read=[])
            progress.bible_reading_progress.append(book_progress)
        
        # Add chapter if not already read
        if chapter_id not in book_progress.chapters_read:
            book_progress.chapters_read.append(chapter_id)
            progress.experience += 10
            
            # Update reading streak
            today = datetime.utcnow().date().isoformat()
            if progress.last_read_date != today:
                progress.last_read_date = today
                progress.reading_streak += 1
                
                # Award streak bonus
                if progress.reading_streak % 7 == 0:
                    progress.experience += 50
        
        # Save updated progress
        data = await self._load_progress_data()
        data[user_id] = progress.dict()
        await self._save_progress_data(data)
        
        return progress
    
    async def toggle_favorite_myth(self, user_id: str, myth_id: str) -> UserProgress:
        """Toggle a myth as favorite for a user"""
        progress = await self.get_user_progress(user_id)
        
        if myth_id in progress.favorite_myths:
            progress.favorite_myths.remove(myth_id)
        else:
            progress.favorite_myths.append(myth_id)
        
        # Save updated progress
        data = await self._load_progress_data()
        data[user_id] = progress.dict()
        await self._save_progress_data(data)
        
        return progress
    
    async def toggle_favorite_doctrine(self, user_id: str, doctrine_id: str) -> UserProgress:
        """Toggle a doctrine as favorite for a user"""
        progress = await self.get_user_progress(user_id)
        
        if doctrine_id in progress.favorite_doctrine:
            progress.favorite_doctrine.remove(doctrine_id)
        else:
            progress.favorite_doctrine.append(doctrine_id)
        
        # Save updated progress
        data = await self._load_progress_data()
        data[user_id] = progress.dict()
        await self._save_progress_data(data)
        
        return progress