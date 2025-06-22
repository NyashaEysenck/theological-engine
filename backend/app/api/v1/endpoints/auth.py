from datetime import timedelta
from fastapi import APIRouter, HTTPException, status
from app.models.user import UserCreate, UserLogin, User, Token
from app.services.auth_service import AuthService
from app.core.config import settings

router = APIRouter()
auth_service = AuthService()

@router.post("/register", response_model=User)
async def register(user_data: UserCreate):
    """Register a new user"""
    try:
        user = await auth_service.create_user(user_data)
        return user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """Authenticate user and return access token"""
    user = await auth_service.authenticate_user(
        user_credentials.email, 
        user_credentials.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth_service.create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = None):
    """Get current user information"""
    # In a real implementation, this would use dependency injection
    # to get the current user from the JWT token
    return current_user