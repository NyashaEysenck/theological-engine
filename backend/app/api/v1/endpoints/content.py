from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.content import Myth, Doctrine, BibleConcept, ScriptureVerse
from app.services.content_service import ContentService

router = APIRouter()
content_service = ContentService()

@router.get("/myths", response_model=List[Myth])
async def get_myths(search: Optional[str] = Query(None, description="Search term for myths")):
    """Get all myths or search myths by term"""
    return await content_service.get_myths(search)

@router.get("/myths/{myth_id}", response_model=Myth)
async def get_myth_by_id(myth_id: str):
    """Get a specific myth by ID"""
    myth = await content_service.get_myth_by_id(myth_id)
    if not myth:
        raise HTTPException(status_code=404, detail="Myth not found")
    return myth

@router.get("/doctrines", response_model=List[Doctrine])
async def get_doctrines(search: Optional[str] = Query(None, description="Search term for doctrines")):
    """Get all doctrines or search doctrines by term"""
    return await content_service.get_doctrines(search)

@router.get("/doctrines/{doctrine_id}", response_model=Doctrine)
async def get_doctrine_by_id(doctrine_id: str):
    """Get a specific doctrine by ID"""
    doctrine = await content_service.get_doctrine_by_id(doctrine_id)
    if not doctrine:
        raise HTTPException(status_code=404, detail="Doctrine not found")
    return doctrine

@router.get("/bible-concepts", response_model=List[BibleConcept])
async def search_bible_concepts(query: str = Query(..., description="Search query for bible concepts")):
    """Search bible concepts by query"""
    return await content_service.search_bible_concepts(query)

@router.get("/bible-concepts/{concept_id}", response_model=BibleConcept)
async def get_bible_concept_by_id(concept_id: str):
    """Get a specific bible concept by ID"""
    concept = await content_service.get_bible_concept_by_id(concept_id)
    if not concept:
        raise HTTPException(status_code=404, detail="Bible concept not found")
    return concept

@router.get("/scripture-context", response_model=List[ScriptureVerse])
async def get_commonly_misused_verses():
    """Get commonly misused scripture verses with proper context"""
    return await content_service.get_commonly_misused_verses()

@router.get("/scripture-context/{verse_id}", response_model=ScriptureVerse)
async def get_verse_by_id(verse_id: str):
    """Get a specific scripture verse by ID"""
    verse = await content_service.get_verse_by_id(verse_id)
    if not verse:
        raise HTTPException(status_code=404, detail="Scripture verse not found")
    return verse