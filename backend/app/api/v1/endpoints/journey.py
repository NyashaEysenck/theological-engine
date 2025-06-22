from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.journey import JourneyRoute, BiblicalLocation
from app.services.journey_service import JourneyService

router = APIRouter()
journey_service = JourneyService()

@router.get("/routes", response_model=List[JourneyRoute])
async def get_all_journey_routes():
    """Get all biblical journey routes"""
    return await journey_service.get_all_routes()

@router.get("/routes/{route_id}", response_model=JourneyRoute)
async def get_journey_route_by_id(route_id: str):
    """Get a specific journey route by ID"""
    route = await journey_service.get_route_by_id(route_id)
    if not route:
        raise HTTPException(status_code=404, detail="Journey route not found")
    return route

@router.get("/routes/by-chapter", response_model=List[JourneyRoute])
async def get_journeys_by_chapter(
    book_id: str = Query(..., description="Bible book ID"),
    chapter: int = Query(..., description="Chapter number")
):
    """Get journey routes related to a specific Bible chapter"""
    return await journey_service.get_journeys_by_book_chapter(book_id, chapter)

@router.get("/locations", response_model=List[BiblicalLocation])
async def get_all_biblical_locations():
    """Get all biblical locations"""
    return await journey_service.get_all_locations()

@router.get("/locations/{location_id}", response_model=BiblicalLocation)
async def get_biblical_location_by_id(location_id: str):
    """Get a specific biblical location by ID"""
    location = await journey_service.get_location_by_id(location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Biblical location not found")
    return location

@router.get("/locations/by-journey/{journey_id}", response_model=List[BiblicalLocation])
async def get_locations_by_journey(journey_id: str):
    """Get all locations for a specific journey"""
    return await journey_service.get_locations_by_journey(journey_id)