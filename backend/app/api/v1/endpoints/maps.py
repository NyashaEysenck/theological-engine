from fastapi import APIRouter, HTTPException
from app.core.config import settings

router = APIRouter()

@router.get("/config")
async def get_maps_config():
    """Get Google Maps configuration for frontend"""
    if not settings.GOOGLE_MAPS_API_KEY:
        raise HTTPException(
            status_code=503, 
            detail="Google Maps API key not configured"
        )
    
    return {
        "apiKey": settings.GOOGLE_MAPS_API_KEY,
        "libraries": ["geometry"],
        "version": "weekly"
    }

@router.get("/health")
async def check_maps_availability():
    """Check if Google Maps API is properly configured"""
    return {
        "configured": bool(settings.GOOGLE_MAPS_API_KEY),
        "status": "ready" if settings.GOOGLE_MAPS_API_KEY else "missing_api_key"
    }