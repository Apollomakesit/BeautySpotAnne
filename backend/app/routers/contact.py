from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from .. import models, schemas
from ..database import get_db

router = APIRouter()

def send_email_notification(contact: schemas.ContactMessageCreate):
    """Send email notification to Anne about new contact message."""
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    admin_email = os.getenv("ADMIN_EMAIL", "contact@beautyspotanne.ro")
    
    if not all([smtp_host, smtp_user, smtp_pass]):
        print("SMTP not configured, skipping email notification")
        return
    
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Mesaj nou de la {contact.name} — BeautySpot Anne"
        msg["From"] = smtp_user
        msg["To"] = admin_email
        
        html = f"""
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #D4A5A5;">Mesaj Nou — Contact Website</h2>
            <hr style="border: 1px solid #f0e6e6;">
            <p><strong>Nume:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Telefon:</strong> {contact.phone or 'Nespecificat'}</p>
            <hr style="border: 1px solid #f0e6e6;">
            <p><strong>Mesaj:</strong></p>
            <p style="background: #fdf8f8; padding: 15px; border-radius: 10px; border-left: 4px solid #D4A5A5;">
                {contact.message}
            </p>
            <hr style="border: 1px solid #f0e6e6;">
            <p style="color: #888; font-size: 12px;">
                Acest mesaj a fost trimis de pe website-ul BeautySpot Anne.
            </p>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(html, "html"))
        
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
            
        print(f"Email notification sent to {admin_email}")
    except Exception as e:
        print(f"Failed to send email notification: {e}")


@router.post("/", response_model=schemas.ContactMessageResponse)
def create_contact_message(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    db_message = models.ContactMessage(
        name=message.name,
        email=message.email,
        phone=message.phone,
        message=message.message,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # Send email notification in background (non-blocking)
    try:
        send_email_notification(message)
    except Exception:
        pass  # Don't fail the API call if email fails
    
    return db_message


@router.get("/", response_model=List[schemas.ContactMessageResponse])
def get_contact_messages(db: Session = Depends(get_db)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()


@router.patch("/{message_id}/read")
def mark_message_read(message_id: int, db: Session = Depends(get_db)):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.read = True
    db.commit()
    return {"message": "Marked as read"}
