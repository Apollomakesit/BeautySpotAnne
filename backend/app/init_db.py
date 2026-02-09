"""
Database initialization script
Runs migrations automatically on application startup
"""
from sqlalchemy import text
from .database import engine, Base

def init_db():
    """Initialize database and run migrations"""
    # Create all tables from models
    Base.metadata.create_all(bind=engine)
    
    # Run custom migrations
    try:
        with engine.connect() as connection:
            # Add missing columns if they don't exist
            connection.execute(text("""
                ALTER TABLE users 
                ADD COLUMN IF NOT EXISTS first_name VARCHAR(50),
                ADD COLUMN IF NOT EXISTS last_name VARCHAR(50),
                ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
                ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE
            """))
            connection.commit()
            print("✅ Database migration successful")
    except Exception as e:
        print(f"⚠️  Migration error (may already exist): {e}")

if __name__ == "__main__":
    init_db()
