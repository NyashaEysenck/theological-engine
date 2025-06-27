from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from ..utils.serializers import to_camel_case

class BibleBook(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    name: str
    chapters: int
    genre: str
    period: Optional[str] = None
    author: Optional[str] = None

class HistoricalContext(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    period: str
    date: str
    background: str
    concurrent: List[str]

class GeographicContext(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    main_location: str
    related_sites: List[str]
    routes: List[str]

class Character(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    name: str
    role: str

class ChapterIntroduction(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    summary: str
    themes: List[str]
    characters: List[Character]
    structure: List[str]

class Verse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    number: int
    text: str
    explanation: Optional[str] = None

class ReadingProgress(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    current_book: BibleBook
    current_chapter: int
    overall_progress: int