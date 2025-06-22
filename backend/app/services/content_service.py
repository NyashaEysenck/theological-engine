import json
import os
from typing import List, Optional
from app.models.content import Myth, Doctrine, BibleConcept, ScriptureVerse

class ContentService:
    def __init__(self):
        self.data_dir = "backend/data"
        self.myths_file = os.path.join(self.data_dir, "myths.json")
        self.doctrines_file = os.path.join(self.data_dir, "doctrines.json")
        self.bible_concepts_file = os.path.join(self.data_dir, "bible_concepts.json")
        self.scripture_context_file = os.path.join(self.data_dir, "scripture_context.json")
    
    async def _load_json_file(self, file_path: str) -> list:
        """Load data from JSON file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []
    
    async def get_myths(self, search_term: Optional[str] = None) -> List[Myth]:
        """Get all myths or search myths by term"""
        data = await self._load_json_file(self.myths_file)
        myths = [Myth(**item) for item in data]
        
        if search_term:
            search_lower = search_term.lower()
            myths = [
                myth for myth in myths
                if search_lower in myth.title.lower() or 
                   search_lower in myth.popular_perception.lower()
            ]
        
        return myths
    
    async def get_myth_by_id(self, myth_id: str) -> Optional[Myth]:
        """Get a specific myth by ID"""
        data = await self._load_json_file(self.myths_file)
        for item in data:
            if item['id'] == myth_id:
                return Myth(**item)
        return None
    
    async def get_doctrines(self, search_term: Optional[str] = None) -> List[Doctrine]:
        """Get all doctrines or search doctrines by term"""
        data = await self._load_json_file(self.doctrines_file)
        doctrines = [Doctrine(**item) for item in data]
        
        if search_term:
            search_lower = search_term.lower()
            doctrines = [
                doctrine for doctrine in doctrines
                if search_lower in doctrine.title.lower() or 
                   search_lower in doctrine.summary.lower()
            ]
        
        return doctrines
    
    async def get_doctrine_by_id(self, doctrine_id: str) -> Optional[Doctrine]:
        """Get a specific doctrine by ID"""
        data = await self._load_json_file(self.doctrines_file)
        for item in data:
            if item['id'] == doctrine_id:
                return Doctrine(**item)
        return None
    
    async def search_bible_concepts(self, query: str) -> List[BibleConcept]:
        """Search bible concepts by query"""
        data = await self._load_json_file(self.bible_concepts_file)
        concepts = [BibleConcept(**item) for item in data]
        
        if query:
            query_lower = query.lower()
            concepts = [
                concept for concept in concepts
                if query_lower in concept.title.lower() or 
                   query_lower in concept.description.lower()
            ]
        
        return concepts
    
    async def get_bible_concept_by_id(self, concept_id: str) -> Optional[BibleConcept]:
        """Get a specific bible concept by ID"""
        data = await self._load_json_file(self.bible_concepts_file)
        for item in data:
            if item['id'] == concept_id:
                return BibleConcept(**item)
        return None
    
    async def get_commonly_misused_verses(self) -> List[ScriptureVerse]:
        """Get commonly misused scripture verses"""
        data = await self._load_json_file(self.scripture_context_file)
        return [ScriptureVerse(**item) for item in data]
    
    async def get_verse_by_id(self, verse_id: str) -> Optional[ScriptureVerse]:
        """Get a specific scripture verse by ID"""
        data = await self._load_json_file(self.scripture_context_file)
        for item in data:
            if item['id'] == verse_id:
                return ScriptureVerse(**item)
        return None