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
            userId=user_id,
            bibleReadingProgress=[],
            favoriteMyths=[],
            favoriteDoctrine=[],
            experience=0,
            readingStreak=0,
            badges=[],
            lastReadDate=None,
            unlockedFeatures=[]
        )
        
        data[user_id] = new_progress.model_dump()
        await self._save_progress_data(data)
        
        return new_progress
    
    async def mark_chapter_as_read(self, user_id: str, book_id: str, chapter_id: str) -> UserProgress:
        """Mark a chapter as read for a user"""
        progress = await self.get_user_progress(user_id)
        
        # Find or create book progress
        book_progress = None
        for bp in progress.bibleReadingProgress:
            if bp.bookId == book_id:
                book_progress = bp
                break
        
        if not book_progress:
            book_progress = ChapterProgress(bookId=book_id, chaptersRead=[])
            progress.bibleReadingProgress.append(book_progress)
        
        # Add chapter if not already read
        if chapter_id not in book_progress.chaptersRead:
            book_progress.chaptersRead.append(chapter_id)
            progress.experience += 10
            
            # Update reading streak
            today = datetime.utcnow().date().isoformat()
            if progress.lastReadDate != today:
                progress.lastReadDate = today
                progress.readingStreak += 1
                
                # Award streak bonus
                if progress.readingStreak % 7 == 0:
                    progress.experience += 50
            
            # Check for unlocks
            self._check_for_unlocks(progress, book_id, chapter_id)
        
        # Save updated progress
        data = await self._load_progress_data()
        data[user_id] = progress.model_dump()
        await self._save_progress_data(data)
        
        return progress
    
    async def toggle_favorite_myth(self, user_id: str, myth_id: str) -> UserProgress:
        """Toggle a myth as favorite for a user"""
        progress = await self.get_user_progress(user_id)
        
        if myth_id in progress.favoriteMyths:
            progress.favoriteMyths.remove(myth_id)
        else:
            progress.favoriteMyths.append(myth_id)
        
        # Save updated progress
        data = await self._load_progress_data()
        data[user_id] = progress.model_dump()
        await self._save_progress_data(data)
        
        return progress
    
    async def toggle_favorite_doctrine(self, user_id: str, doctrine_id: str) -> UserProgress:
        """Toggle a doctrine as favorite for a user"""
        progress = await self.get_user_progress(user_id)
        
        if doctrine_id in progress.favoriteDoctrine:
            progress.favoriteDoctrine.remove(doctrine_id)
        else:
            progress.favoriteDoctrine.append(doctrine_id)
        
        # Save updated progress
        data = await self._load_progress_data()
        data[user_id] = progress.model_dump()
        await self._save_progress_data(data)
        
        return progress
    
    def _check_for_unlocks(self, progress: UserProgress, book_id: str, chapter_id: str):
        """Check for unlockable features and badges"""
        # Check if user has completed specific books to award badges
        if book_id == 'genesis' and self._has_completed_book(progress, 'genesis'):
            self._award_badge(progress, 'genesisScholar', 'Genesis Scholar', 'Completed reading the book of Genesis')
        
        if book_id == 'exodus' and self._has_completed_book(progress, 'exodus'):
            self._award_badge(progress, 'exodusExplorer', 'Exodus Explorer', 'Completed reading the book of Exodus')
        
        # Check for unlockable features based on specific readings
        if book_id == 'romans':
            # Unlock "Predestination Toolkit" after reading Romans
            if 'predestinationToolkit' not in progress.unlockedFeatures:
                progress.unlockedFeatures.append('predestinationToolkit')
        
        if book_id == 'leviticus' and self._has_completed_book(progress, 'leviticus'):
            # Unlock "Law vs. Grace" pathway after completing Leviticus
            if 'lawVsGracePathway' not in progress.unlockedFeatures:
                progress.unlockedFeatures.append('lawVsGracePathway')
        
        # Check if all Torah books are complete
        torah_books = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy']
        has_completed_torah = all(self._has_completed_book(progress, book) for book in torah_books)
        
        if has_completed_torah and not any(b.id == 'torahScholar' for b in progress.badges):
            self._award_badge(
                progress, 
                'torahScholar', 
                'Torah Scholar', 
                'Completed reading the Torah (Pentateuch)'
            )
            
            # Unlock advanced feature
            if 'culturalAnalysis' not in progress.unlockedFeatures:
                progress.unlockedFeatures.append('culturalAnalysis')
        
        # Check if all Gospels are complete
        gospel_books = ['matthew', 'mark', 'luke', 'john']
        has_completed_gospels = all(self._has_completed_book(progress, book) for book in gospel_books)
        
        if has_completed_gospels and not any(b.id == 'gospelWitness' for b in progress.badges):
            self._award_badge(
                progress,
                'gospelWitness',
                'Gospel Witness',
                'Completed reading all four Gospels'
            )
            
            # Unlock "Kingdom of God" feature
            if 'kingdomOfGod' not in progress.unlockedFeatures:
                progress.unlockedFeatures.append('kingdomOfGod')
    
    def _has_completed_book(self, progress: UserProgress, book_id: str) -> bool:
        """Check if a book has been completed"""
        book_progress = next((bp for bp in progress.bibleReadingProgress if bp.bookId == book_id), None)
        
        if not book_progress:
            return False
        
        # Chapter counts for each book
        chapter_counts = {
            'genesis': 50,
            'exodus': 40,
            'leviticus': 27,
            'numbers': 36,
            'deuteronomy': 34,
            'joshua': 24,
            'judges': 21,
            'ruth': 4,
            '1samuel': 31,
            '2samuel': 24,
            'job': 42,
            'psalms': 150,
            'proverbs': 31,
            'ecclesiastes': 12,
            'songofsolomon': 8,
            'isaiah': 66,
            'jeremiah': 52,
            'ezekiel': 48,
            'daniel': 12,
            'matthew': 28,
            'mark': 16,
            'luke': 24,
            'john': 21,
            'romans': 16,
            '1corinthians': 16,
            '2corinthians': 13,
            'galatians': 6
        }
        
        return len(book_progress.chaptersRead) >= chapter_counts.get(book_id, 0)
    
    def _award_badge(self, progress: UserProgress, badge_id: str, name: str, description: str):
        """Award a badge to the user"""
        # Check if badge already exists
        if not any(badge.id == badge_id for badge in progress.badges):
            new_badge = Badge(
                id=badge_id,
                name=name,
                description=description,
                awardedAt=datetime.utcnow().isoformat()
            )
            progress.badges.append(new_badge)
            
            # Award XP for badge
            progress.experience += 100