from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import schemas
from ..database import get_db
from ..service_catalog import sync_service_catalog

router = APIRouter()
CATALOG_LOCKED_MESSAGE = "Service catalog is fixed and managed automatically."

@router.get("/", response_model=List[schemas.ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return sync_service_catalog(db)

@router.post("/", response_model=schemas.ServiceResponse)
def create_service(service: schemas.ServiceCreate, db: Session = Depends(get_db)):
    raise HTTPException(status_code=403, detail=CATALOG_LOCKED_MESSAGE)

@router.patch("/{service_id}", response_model=schemas.ServiceResponse)
def update_service(service_id: int, service: schemas.ServiceUpdate, db: Session = Depends(get_db)):
    raise HTTPException(status_code=403, detail=CATALOG_LOCKED_MESSAGE)

@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    raise HTTPException(status_code=403, detail=CATALOG_LOCKED_MESSAGE)
