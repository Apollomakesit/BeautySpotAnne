import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import services, bookings, availability, users, contact, reviews

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BeautySpot Anne API")

# CORS
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:3000")
cors_origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(services.router, prefix="/api/services", tags=["services"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
app.include_router(availability.router, prefix="/api/availability", tags=["availability"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["reviews"])

@app.get("/")
def read_root():
    return {"message": "BeautySpot Anne API"}
