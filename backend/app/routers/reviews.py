from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()


@router.get("/", response_model=List[schemas.ReviewResponse])
def get_reviews(approved_only: bool = True, db: Session = Depends(get_db)):
    """Get reviews. By default only returns approved reviews for public display."""
    query = db.query(models.Review)
    if approved_only:
        query = query.filter(models.Review.approved == True)
    return query.order_by(models.Review.created_at.desc()).all()


@router.post("/", response_model=schemas.ReviewResponse)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    db_review = models.Review(
        client_name=review.client_name,
        rating=review.rating,
        text=review.text,
        approved=False,  # Requires admin approval
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


@router.patch("/{review_id}/approve")
def approve_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.approved = True
    db.commit()
    return {"message": "Review approved"}


@router.patch("/{review_id}/reject")
def reject_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.approved = False
    db.commit()
    return {"message": "Review rejected"}


@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return {"message": "Review deleted"}
