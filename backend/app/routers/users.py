from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from datetime import datetime

router = APIRouter()

@router.post("/upsert")
def upsert_user(user: schemas.UserUpsert, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if db_user:
        db_user.last_login = datetime.utcnow()
        db_user.name = user.name
        db_user.avatar_url = user.avatar_url
    else:
        db_user = models.User(**user.dict(), created_at=datetime.utcnow(), last_login=datetime.utcnow())
        db.add(db_user)
    
    db.commit()
    db.refresh(db_user)
    return {"id": db_user.id, "email": db_user.email}
