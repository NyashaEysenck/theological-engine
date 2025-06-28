import json
import os
from typing import List, Optional
from app.models.journey import JourneyRoute, BiblicalLocation

class JourneyService:
    def __init__(self):
        # Get the absolute path to the data directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.dirname(os.path.dirname(current_dir))
        self.data_dir = os.path.join(backend_dir, "data")
        self.journey_routes_file = os.path.join(self.data_dir, "journey_routes.json")
        self.biblical_locations_file = os.path.join(self.data_dir, "biblical_locations.json")
    
    async def _load_json_file(self, file_path: str) -> list:
        """Load data from JSON file"""
        try:
            print(f"[DEBUG] Attempting to load file: {file_path}")
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            print(f"[DEBUG] Successfully loaded {file_path}")
            return data
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"[DEBUG] Error loading {file_path}: {str(e)}")
            return []
    
    async def get_all_routes(self) -> List[JourneyRoute]:
        """Get all biblical journey routes"""
        data = await self._load_json_file(self.journey_routes_file)
        return [JourneyRoute(**route) for route in data]
    
    async def get_route_by_id(self, route_id: str) -> Optional[JourneyRoute]:
        """Get a specific journey route by ID"""
        data = await self._load_json_file(self.journey_routes_file)
        for route_data in data:
            if route_data['id'] == route_id:
                return JourneyRoute(**route_data)
        return None
    
    async def get_journeys_by_book_chapter(self, book_id: str, chapter: int) -> List[JourneyRoute]:
        """Get journey routes related to a specific Bible chapter"""
        routes = await self.get_all_routes()
        relevant_routes = []
        
        for route in routes:
            for related_chapter in route.relatedChapters:
                if related_chapter.bookId == book_id and chapter in related_chapter.chapters:
                    relevant_routes.append(route)
                    break
        
        return relevant_routes
    
    async def get_all_locations(self) -> List[BiblicalLocation]:
        """Get all biblical locations"""
        data = await self._load_json_file(self.biblical_locations_file)
        return [BiblicalLocation(**location) for location in data]
    
    async def get_location_by_id(self, location_id: str) -> Optional[BiblicalLocation]:
        """Get a specific biblical location by ID"""
        data = await self._load_json_file(self.biblical_locations_file)
        for location_data in data:
            if location_data['id'] == location_id:
                return BiblicalLocation(**location_data)
        return None
    
    async def get_locations_by_journey(self, journey_id: str) -> List[BiblicalLocation]:
        """Get all locations for a specific journey"""
        route = await self.get_route_by_id(journey_id)
        if route:
            return route.waypoints
        return []