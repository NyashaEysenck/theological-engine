from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class Coordinates(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    lat: float
    lng: float

class BiblicalLocation(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    name: str
    modernName: Optional[str] = None
    coordinates: Coordinates
    description: str
    biblicalReferences: List[str]
    historicalPeriod: str
    significance: str

class RelatedChapter(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    bookId: str
    chapters: List[int]

class JourneyRoute(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    name: str
    description: str
    type: str
    character: str
    biblicalPeriod: str
    relatedBooks: List[str]
    relatedChapters: List[RelatedChapter]
    waypoints: List[BiblicalLocation]
    routeColor: str
    estimatedDuration: Optional[str] = None
    historicalContext: str