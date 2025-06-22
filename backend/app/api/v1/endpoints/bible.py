from fastapi import APIRouter, HTTPException
from typing import List, Dict
from app.models.bible import BibleBook, HistoricalContext, GeographicContext, ChapterIntroduction, Verse, ReadingProgress
from app.services.bible_service import BibleService

router = APIRouter()
bible_service = BibleService()

@router.get("/books", response_model=List[BibleBook])
async def get_all_books():
    """Get all Bible books"""
    return await bible_service.get_all_books()

@router.get("/books/by-genre", response_model=Dict[str, List[BibleBook]])
async def get_books_by_genre():
    """Get Bible books organized by genre"""
    return await bible_service.get_books_by_genre()

@router.get("/books/{book_id}/chapters/{chapter}/historical-context", response_model=HistoricalContext)
async def get_historical_context(book_id: str, chapter: int):
    """Get historical context for a specific chapter"""
    return await bible_service.get_historical_context(book_id, chapter)

@router.get("/books/{book_id}/chapters/{chapter}/geographic-context", response_model=GeographicContext)
async def get_geographic_context(book_id: str, chapter: int):
    """Get geographic context for a specific chapter"""
    return await bible_service.get_geographic_context(book_id, chapter)

@router.get("/books/{book_id}/chapters/{chapter}/introduction", response_model=ChapterIntroduction)
async def get_chapter_introduction(book_id: str, chapter: int):
    """Get chapter introduction with themes and structure"""
    return await bible_service.get_chapter_introduction(book_id, chapter)

@router.get("/books/{book_id}/chapters/{chapter}/verses", response_model=List[Verse])
async def get_chapter_verses(book_id: str, chapter: int):
    """Get verses for a specific chapter"""
    return await bible_service.get_chapter_verses(book_id, chapter)

@router.get("/reading-progress/{user_id}", response_model=ReadingProgress)
async def get_current_reading_position(user_id: str):
    """Get current reading position for a user"""
    # This would typically get the user's progress from the progress service
    # For now, we'll return a default position
    return await bible_service.get_current_reading_position([])