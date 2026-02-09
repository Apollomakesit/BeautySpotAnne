from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from datetime import datetime
import bcrypt
import os

router = APIRouter()

# Parse multiple admin emails from comma-separated env variable
ADMIN_EMAILS_STR = os.getenv("ADMIN_EMAIL", "")
ADMIN_EMAILS = [email.strip().lower() for email in ADMIN_EMAILS_STR.split(",") if email.strip()]


def is_admin_email(email: str) -> bool:
    """Check if the given email is an admin email."""
    return email.lower() in ADMIN_EMAILS


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


@router.post("/upsert")
def upsert_user(user: schemas.UserUpsert, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if db_user:
        db_user.last_login = datetime.utcnow()
        db_user.name = user.name
        db_user.avatar_url = user.avatar_url
    else:
        is_admin = is_admin_email(user.email)
        db_user = models.User(
            **user.dict(),
            is_admin=is_admin,
            created_at=datetime.utcnow(),
            last_login=datetime.utcnow(),
        )
        db.add(db_user)
    
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "email": db_user.email, "is_admin": db_user.is_admin}


@router.post("/register")
def register_user(user: schemas.UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Un cont cu acest email există deja")
    
    is_admin = is_admin_email(user.email)
    
    db_user = models.User(
        email=user.email,
        name=f"{user.first_name} {user.last_name}",
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        password_hash=hash_password(user.password),
        provider="email",
        is_admin=is_admin,
        created_at=datetime.utcnow(),
        last_login=datetime.utcnow(),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {
        "id": db_user.id,
        "email": db_user.email,
        "name": db_user.name,
        "is_admin": db_user.is_admin,
    }


@router.post("/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if not db_user or not db_user.password_hash:
        raise HTTPException(status_code=401, detail="Email sau parolă incorectă")
    
    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Email sau parolă incorectă")
    
    db_user.last_login = datetime.utcnow()
    db.commit()
    
    return {
        "id": db_user.id,
        "email": db_user.email,
        "name": db_user.name,
        "phone": db_user.phone,
        "is_admin": db_user.is_admin,
    }


@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": db_user.id,
        "email": db_user.email,
        "name": db_user.name,
        "phone": db_user.phone,
        "is_admin": db_user.is_admin,
    }


@router.get("/by-email/{email}")
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": db_user.id,
        "email": db_user.email,
        "name": db_user.name,
        "phone": db_user.phone,
        "is_admin": db_user.is_admin,
    }
