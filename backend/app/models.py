from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Date, Time, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(100))
    avatar_url = Column(Text)
    provider = Column(String(20))  # google, facebook, email
    provider_id = Column(String(255))
    phone = Column(String(20))
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)
    
    bookings = relationship("Booking", back_populates="user")

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    duration_minutes = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    deposit_amount = Column(Float)
    image_url = Column(Text)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    bookings = relationship("Booking", back_populates="service")

class Availability(Base):
    __tablename__ = "availability"
    
    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(Integer, nullable=False)  # 0=Monday, 6=Sunday
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class TimeOff(Base):
    __tablename__ = "time_off"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False, unique=True)
    reason = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    client_name = Column(String(100), nullable=False)
    client_phone = Column(String(20), nullable=False)
    client_email = Column(String(100))
    booking_date = Column(Date, nullable=False)
    booking_time = Column(Time, nullable=False)
    status = Column(String(20), default="pending")  # pending, confirmed, cancelled, completed
    payment_status = Column(String(20), default="unpaid")  # unpaid, deposit_paid, paid
    stripe_session_id = Column(String(200))
    stripe_payment_intent_id = Column(String(200))
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    service = relationship("Service", back_populates="bookings")
    user = relationship("User", back_populates="bookings")
