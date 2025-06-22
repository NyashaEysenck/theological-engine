from pydantic import BaseModel
from typing import List, Optional

class BibleBook(BaseModel):
    id: str
    name: str
    chapters: int
    genre: str
    period: Optional[str] = None
    author: Optional[str] = None

class HistoricalContext(BaseModel):
    period: str
    date: str
    background: str
    concurrent: List[str]

class GeographicContext(BaseModel):
    main_location: str
    related_sites: List[str]
    routes: List[str]

class Character(BaseModel):
    name: str
    role: str

class ChapterIntroduction(BaseModel):
    summary: str
    themes: List[str]
    characters: List[Character]
    structure: List[str]

class Verse(BaseModel):
    number: int
    text: str
    explanation: Optional[str] = None

class ReadingProgress(BaseModel):
    current_book: BibleBook
    current_chapter: int
    overall_progress: int