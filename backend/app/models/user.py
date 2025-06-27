from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
from ..utils.serializers import to_camel_case

class UserBase(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    email: EmailStr
    password: str

class User(UserBase):
    model_config = ConfigDict(
        from_attributes=True,
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    id: str
    created_at: datetime

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    access_token: str
    token_type: str

class TokenData(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel_case,
        populate_by_name=True
    )
    
    username: Optional[str] = None