from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
import stripe
import os
import urllib.parse
from .. import models, schemas
from ..database import get_db

router = APIRouter()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL")

# Anne's WhatsApp number for notifications
ANNE_WHATSAPP = "40760089809"


class BookingCreateRequest(BaseModel):
    service_id: int
    client_name: str
    client_phone: str
    client_email: Optional[str] = None
    booking_date: str  # YYYY-MM-DD
    booking_time: str  # HH:MM
    notes: Optional[str] = None


def create_guest_account(db: Session, name: str, phone: str, email: Optional[str] = None):
    """Create a guest account for users who book without registering."""
    if email:
        # Check if user already exists by email
        existing = db.query(models.User).filter(models.User.email == email).first()
        if existing:
            return existing

    # Check if user exists by phone
    if phone:
        existing = db.query(models.User).filter(models.User.phone == phone).first()
        if existing:
            return existing

    # Create guest account
    guest_email = email or f"guest_{phone.replace(' ', '').replace('+', '')}@beautyspotanne.guest"

    # Check if guest email already exists
    existing = db.query(models.User).filter(models.User.email == guest_email).first()
    if existing:
        return existing

    name_parts = name.strip().split(" ", 1)
    first_name = name_parts[0] if len(name_parts) > 0 else name
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    db_user = models.User(
        email=guest_email,
        name=name,
        first_name=first_name,
        last_name=last_name,
        phone=phone,
        provider="guest",
        is_admin=False,
        created_at=datetime.utcnow(),
        last_login=datetime.utcnow(),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def build_whatsapp_confirmation_url(booking, service, client_phone: str):
    """Build WhatsApp confirmation message URL for the client."""
    # Clean phone number
    phone = client_phone.replace(" ", "").replace("-", "").replace("+", "")
    if phone.startswith("0"):
        phone = "40" + phone[1:]  # Convert to international format

    date_str = booking.booking_date.strftime("%d.%m.%Y") if hasattr(booking.booking_date, 'strftime') else str(booking.booking_date)
    time_str = booking.booking_time.strftime("%H:%M") if hasattr(booking.booking_time, 'strftime') else str(booking.booking_time)

    message = (
        f"✨ Confirmare Programare BeautySpot Anne ✨\n\n"
        f"Salut, {booking.client_name}! 💕\n\n"
        f"Programarea ta a fost confirmata:\n"
        f"📋 Serviciu: {service.name}\n"
        f"📅 Data: {date_str}\n"
        f"🕐 Ora: {time_str}\n"
        f"💰 Pret total: {int(service.price)} lei\n"
        f"✅ Avans platit: {int(service.deposit_amount)} lei\n"
        f"💳 Rest la salon: {int(service.price - service.deposit_amount)} lei\n\n"
        f"📍 Adresa: Bucuresti, Sector 2, Zona Teiul Doamnei\n"
        f"📞 Contact: 0760 089 809\n\n"
        f"Te asteptam cu drag! 🌸\n"
        f"BeautySpot Anne"
    )

    encoded_message = urllib.parse.quote(message)
    return f"https://wa.me/{phone}?text={encoded_message}"


@router.post("/", response_model=dict)
def create_booking(booking: BookingCreateRequest, db: Session = Depends(get_db)):
    # Get service
    service = db.query(models.Service).filter(models.Service.id == booking.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    # Parse time and date
    booking_time = datetime.strptime(booking.booking_time, "%H:%M").time()
    booking_date = datetime.strptime(booking.booking_date, "%Y-%m-%d").date()

    # Check if slot is available
    existing = db.query(models.Booking).filter(
        models.Booking.booking_date == booking_date,
        models.Booking.booking_time == booking_time,
        models.Booking.status.in_(["pending", "confirmed"])
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="This time slot is already booked")

    # Auto-create guest account
    guest_user = create_guest_account(
        db=db,
        name=booking.client_name,
        phone=booking.client_phone,
        email=booking.client_email if booking.client_email else None
    )

    # Create booking
    db_booking = models.Booking(
        service_id=booking.service_id,
        user_id=guest_user.id if guest_user else None,
        client_name=booking.client_name,
        client_phone=booking.client_phone,
        client_email=booking.client_email or "",
        booking_date=booking_date,
        booking_time=booking_time,
        notes=booking.notes,
        status="pending"
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)

    # Build WhatsApp confirmation URL
    whatsapp_url = build_whatsapp_confirmation_url(db_booking, service, booking.client_phone)

    # Create Stripe Checkout Session
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'ron',
                    'product_data': {
                        'name': f'Avans 50% - {service.name}',
                        'description': f'{booking.booking_date} la {booking.booking_time} | BeautySpot Anne',
                    },
                    'unit_amount': int(service.deposit_amount * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'{FRONTEND_URL}/success?session_id={{CHECKOUT_SESSION_ID}}&whatsapp={urllib.parse.quote(whatsapp_url)}',
            cancel_url=f'{FRONTEND_URL}/booking',
            client_reference_id=str(db_booking.id),
            customer_email=booking.client_email if booking.client_email else None,
        )

        db_booking.stripe_session_id = checkout_session.id
        db.commit()

        return {
            "checkout_url": checkout_session.url,
            "booking_id": db_booking.id,
            "whatsapp_url": whatsapp_url,
        }

    except Exception as e:
        # If Stripe fails, still return booking info with WhatsApp URL
        return {
            "checkout_url": None,
            "booking_id": db_booking.id,
            "whatsapp_url": whatsapp_url,
            "error": str(e),
        }


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
