from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class BibleBook(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    id: str
    name: str
    chapters: int
    genre: str
    period: Optional[str] = None
    author: Optional[str] = None

class HistoricalContext(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    period: str
    date: str
    background: str
    concurrent: List[str]

class GeographicContext(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    main_location: str
    related_sites: List[str]
    routes: List[str]

class Character(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    name: str
    role: str

class ChapterIntroduction(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    summary: str
    themes: List[str]
    characters: List[Character]
    structure: List[str]

class Verse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    number: int
    text: str
    explanation: Optional[str] = None

class ReadingProgress(BaseModel):
    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
    
    current_book: BibleBook
    current_chapter: int
    overall_progress: int