from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, date, timedelta
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.get("/", response_model=List[schemas.AvailabilityResponse])
def get_availability(db: Session = Depends(get_db)):
    return db.query(models.Availability).filter(models.Availability.is_active == True).all()

@router.post("/", response_model=schemas.AvailabilityResponse)
def create_availability(avail: schemas.AvailabilityCreate, db: Session = Depends(get_db)):
    # Convert string time to time object
    start_time = datetime.strptime(avail.start_time, "%H:%M").time()
    end_time = datetime.strptime(avail.end_time, "%H:%M").time()
    
    db_avail = models.Availability(
        day_of_week=avail.day_of_week,
        start_time=start_time,
        end_time=end_time
    )
    db.add(db_avail)
    db.commit()
    db.refresh(db_avail)
    return db_avail

@router.delete("/{avail_id}")
def delete_availability(avail_id: int, db: Session = Depends(get_db)):
    db_avail = db.query(models.Availability).filter(models.Availability.id == avail_id).first()
    if not db_avail:
        raise HTTPException(status_code=404, detail="Availability not found")
    
    db.delete(db_avail)
    db.commit()
    return {"message": "Availability deleted"}

@router.get("/slots/{service_id}/{date}")
def get_available_slots(service_id: int, date: str, db: Session = Depends(get_db)):
    # Parse date
    booking_date = datetime.strptime(date, "%Y-%m-%d").date()
    day_of_week = booking_date.weekday()
    
    # Check if date is in time_off
    time_off = db.query(models.TimeOff).filter(models.TimeOff.date == booking_date).first()
    if time_off:
        return {"slots": []}
    
    # Get availability for this day
    availability = db.query(models.Availability).filter(
        models.Availability.day_of_week == day_of_week,
        models.Availability.is_active == True
    ).first()
    
    if not availability:
        return {"slots": []}
    
    # Get service duration
    service = db.query(models.Service).filter(
        models.Service.id == service_id,
        models.Service.active == True
    ).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Generate time slots
    slots = []
    current_time = datetime.combine(booking_date, availability.start_time)
    end_time = datetime.combine(booking_date, availability.end_time)
    
    while current_time + timedelta(minutes=service.duration_minutes) <= end_time:
        slot_time = current_time.strftime("%H:%M")
        
        # Check if slot is already booked
        existing_booking = db.query(models.Booking).filter(
            models.Booking.booking_date == booking_date,
            models.Booking.booking_time == current_time.time(),
            models.Booking.status.in_(["pending", "confirmed"])
        ).first()
        
        if not existing_booking:
            slots.append(slot_time)
        
        current_time += timedelta(minutes=30)  # 30 min intervals
    
    return {"slots": slots}
