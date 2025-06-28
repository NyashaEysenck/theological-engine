from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class ChapterProgress(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    bookId: str
    chaptersRead: List[str]

class Badge(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    name: str
    description: str
    awardedAt: str

class UserProgress(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    userId: str
    bibleReadingProgress: List[ChapterProgress]
    favoriteMyths: List[str]
    favoriteDoctrine: List[str]
    experience: int
    readingStreak: int
    badges: List[Badge]
    lastReadDate: Optional[str] = None
    unlockedFeatures: List[str]