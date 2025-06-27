from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from ..utils.serializers import to_camel_case

class Coordinates(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    lat: float
    lng: float

class BiblicalLocation(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    name: str
    modern_name: Optional[str] = None
    coordinates: Coordinates
    description: str
    biblical_references: List[str]
    historical_period: str
    significance: str

class RelatedChapter(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    book_id: str
    chapters: List[int]

class JourneyRoute(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
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