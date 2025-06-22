from fastapi import APIRouter, HTTPException
from app.models.progress import UserProgress, ChapterProgress
from app.services.progress_service import ProgressService

router = APIRouter()
progress_service = ProgressService()

@router.get("/users/{user_id}", response_model=UserProgress)
async def get_user_progress(user_id: str):
    """Get user's reading progress and achievements"""
    return await progress_service.get_user_progress(user_id)

@router.post("/users/{user_id}/chapters/{book_id}/{chapter_id}", response_model=UserProgress)
async def mark_chapter_as_read(user_id: str, book_id: str, chapter_id: str):
    """Mark a chapter as read for a user"""
    return await progress_service.mark_chapter_as_read(user_id, book_id, chapter_id)

@router.post("/users/{user_id}/favorite-myths/{myth_id}", response_model=UserProgress)
async def toggle_favorite_myth(user_id: str, myth_id: str):
    """Toggle a myth as favorite for a user"""
    return await progress_service.toggle_favorite_myth(user_id, myth_id)

@router.post("/users/{user_id}/favorite-doctrines/{doctrine_id}", response_model=UserProgress)
async def toggle_favorite_doctrine(user_id: str, doctrine_id: str):
    """Toggle a doctrine as favorite for a user"""
    return await progress_service.toggle_favorite_doctrine(user_id, doctrine_id)

@router.get("/users/{user_id}/reading-streak", response_model=dict)
async def get_reading_streak(user_id: str):
    """Get user's current reading streak"""
    progress = await progress_service.get_user_progress(user_id)
    return {"reading_streak": progress.reading_streak}

@router.get("/users/{user_id}/unlocked-features", response_model=dict)
async def get_unlocked_features(user_id: str):
    """Get user's unlocked features"""
    progress = await progress_service.get_user_progress(user_id)
    return {"unlocked_features": progress.unlocked_features}