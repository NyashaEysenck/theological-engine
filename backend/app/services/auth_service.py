import json
import os
from typing import Optional
from datetime import datetime
from app.models.user import User, UserCreate, UserInDB
from app.core.security import get_password_hash, verify_password, create_access_token

class AuthService:
    def __init__(self):
        # Get the absolute path to the data directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        backend_dir = os.path.dirname(os.path.dirname(current_dir))
        self.users_file = os.path.join(backend_dir, "data", "users.json")
        self._ensure_data_file()
    
    def _ensure_data_file(self):
        """Ensure the users data file exists"""
        os.makedirs(os.path.dirname(self.users_file), exist_ok=True)
        if not os.path.exists(self.users_file):
            with open(self.users_file, 'w') as f:
                json.dump([], f)
    
    async def _load_users(self) -> list:
        """Load users from JSON file"""
        try:
            with open(self.users_file, 'r') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []
    
    async def _save_users(self, users: list):
        """Save users to JSON file"""
        with open(self.users_file, 'w') as f:
            json.dump(users, f, indent=2, default=str)
    
    async def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get user by email"""
        users = await self._load_users()
        for user_data in users:
            if user_data['email'] == email:
                return UserInDB(**user_data)
        return None
    
    async def create_user(self, user_data: UserCreate) -> User:
        """Create a new user"""
        # Check if user already exists
        existing_user = await self.get_user_by_email(user_data.email)
        if existing_user:
            raise ValueError("User with this email already exists")
        
        # Create new user
        users = await self._load_users()
        user_id = f"user_{len(users) + 1}"
        
        new_user = {
            "id": user_id,
            "username": user_data.username,
            "email": user_data.email,
            "hashedPassword": get_password_hash(user_data.password),
            "createdAt": datetime.utcnow().isoformat()
        }
        
        users.append(new_user)
        await self._save_users(users)
        
        return User(**{k: v for k, v in new_user.items() if k != 'hashedPassword'})
    
    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """Authenticate user with email and password"""
        user = await self.get_user_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.hashedPassword):
            return None
        return User(**{k: v for k, v in user.dict().items() if k != 'hashedPassword'})
    
    def create_access_token(self, subject: str, expires_delta=None):
        """Create access token for user"""
        return create_access_token(subject, expires_delta)