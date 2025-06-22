from pydantic import BaseModel
from typing import List, Optional

class Coordinates(BaseModel):
    lat: float
    lng: float

class BiblicalLocation(BaseModel):
    id: str
    name: str
    modern_name: Optional[str] = None
    coordinates: Coordinates
    description: str
    biblical_references: List[str]
    historical_period: str
    significance: str

class RelatedChapter(BaseModel):
    book_id: str
    chapters: List[int]

class JourneyRoute(BaseModel):
    id: str
    name: str
    description: str
    type: str
    character: str
    biblical_period: str
    related_books: List[str]
    related_chapters: List[RelatedChapter]
    waypoints: List[BiblicalLocation]
    route_color: str
    estimated_duration: Optional[str] = None
    historical_context: str