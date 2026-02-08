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
