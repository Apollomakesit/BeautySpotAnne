from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import stripe
import os
from .. import models, schemas
from ..database import get_db

router = APIRouter()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

@router.post("/", response_model=dict)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    # Get service
    service = db.query(models.Service).filter(models.Service.id == booking.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Parse time
    booking_time = datetime.strptime(booking.booking_time, "%H:%M").time()
    
    # Check if slot is available
    existing = db.query(models.Booking).filter(
        models.Booking.booking_date == booking.booking_date,
        models.Booking.booking_time == booking_time,
        models.Booking.status.in_(["pending", "confirmed"])
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="This time slot is already booked")
    
    # Create booking
    db_booking = models.Booking(
        service_id=booking.service_id,
        client_name=booking.client_name,
        client_phone=booking.client_phone,
        client_email=booking.client_email,
        booking_date=booking.booking_date,
        booking_time=booking_time,
        notes=booking.notes,
        status="pending"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    # Create Stripe Checkout Session
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'ron',
                    'product_data': {
                        'name': f'Avans - {service.name}',
                        'description': f'{booking.booking_date} la {booking.booking_time}',
                    },
                    'unit_amount': int(service.deposit_amount * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'{FRONTEND_URL}/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{FRONTEND_URL}/booking',
            client_reference_id=str(db_booking.id),
            customer_email=booking.client_email,
        )
        
        db_booking.stripe_session_id = checkout_session.id
        db.commit()
        
        return {"checkout_url": checkout_session.url, "booking_id": db_booking.id}
    
    except Exception as e:
        db.delete(db_booking)
        db.commit()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        booking_id = session.get('client_reference_id')
        
        if booking_id:
            booking = db.query(models.Booking).filter(models.Booking.id == int(booking_id)).first()
            if booking:
                booking.payment_status = "deposit_paid"
                booking.status = "confirmed"
                booking.stripe_payment_intent_id = session.get('payment_intent')
                db.commit()
    
    return {"status": "success"}

@router.get("/", response_model=List[schemas.BookingResponse])
def get_bookings(db: Session = Depends(get_db)):
    return db.query(models.Booking).all()
