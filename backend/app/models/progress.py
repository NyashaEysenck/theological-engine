from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ChapterProgress(BaseModel):
    book_id: str
    chapters_read: List[str]

class Badge(BaseModel):
    id: str
    name: str
    description: str
    awarded_at: str

class UserProgress(BaseModel):
    user_id: str
    bible_reading_progress: List[ChapterProgress]
    favorite_myths: List[str]
    favorite_doctrine: List[str]
    experience: int
    reading_streak: int
    badges: List[Badge]
    last_read_date: Optional[str] = None
    unlocked_features: List[str]