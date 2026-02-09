from pydantic import BaseModel, EmailStr
from datetime import date, time, datetime
from typing import Optional

class ServiceCreate(BaseModel):
    name: str
    description: str
    duration_minutes: int
    price: float
    deposit_amount: float
    image_url: Optional[str] = None

class ServiceResponse(ServiceCreate):
    id: int
    active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class AvailabilityCreate(BaseModel):
    day_of_week: int
    start_time: str  # "HH:MM"
    end_time: str

class AvailabilityResponse(BaseModel):
    id: int
    day_of_week: int
    start_time: time
    end_time: time
    is_active: bool
    
    class Config:
        from_attributes = True

class TimeOffCreate(BaseModel):
    date: date
    reason: Optional[str] = None

class BookingCreate(BaseModel):
    service_id: int
    client_name: str
    client_phone: str
    client_email: EmailStr
    booking_date: date
    booking_time: str
    notes: Optional[str] = None

class BookingResponse(BaseModel):
    id: int
    service_id: int
    client_name: str
    client_phone: str
    booking_date: date
    booking_time: time
    status: str
    payment_status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserUpsert(BaseModel):
    email: EmailStr
    name: str
    avatar_url: Optional[str] = None
    provider: str
    provider_id: str

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    phone: Optional[str] = None
    is_admin: bool = False

    class Config:
        from_attributes = True

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ReviewCreate(BaseModel):
    client_name: str
    rating: int  # 1-5
    text: Optional[str] = None

class ReviewResponse(BaseModel):
    id: int
    client_name: str
    rating: int
    text: Optional[str] = None
    approved: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    duration_minutes: Optional[int] = None
    price: Optional[float] = None
    deposit_amount: Optional[float] = None
    image_url: Optional[str] = None
