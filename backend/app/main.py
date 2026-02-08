from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import services, bookings, availability, users, admin

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="BeautySpot Anne API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(services.router, prefix="/api/services", tags=["services"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["bookings"])
app.include_router(availability.router, prefix="/api/availability", tags=["availability"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

@app.get("/")
def read_root():
    return {"message": "BeautySpot Anne API"}
