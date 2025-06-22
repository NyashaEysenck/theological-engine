from fastapi import APIRouter
from app.api.v1.endpoints import auth, content, bible, journey, progress

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(content.router, prefix="/content", tags=["content"])
api_router.include_router(bible.router, prefix="/bible", tags=["bible"])
api_router.include_router(journey.router, prefix="/journey", tags=["journey"])
api_router.include_router(progress.router, prefix="/progress", tags=["progress"])