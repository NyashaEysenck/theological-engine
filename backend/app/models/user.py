from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    model_config = ConfigDict()
    
    email: EmailStr
    password: str

class User(UserBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: str
    createdAt: datetime

class UserInDB(User):
    hashedPassword: str

class Token(BaseModel):
    model_config = ConfigDict()
    
    accessToken: str
    tokenType: str

class TokenData(BaseModel):
    model_config = ConfigDict()
    
    username: Optional[str] = None