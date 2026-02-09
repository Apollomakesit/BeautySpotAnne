-- Migration: Add first_name, last_name, password_hash columns to users table

ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(50);
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Make password_hash nullable so existing users don't break
-- But it should be required for new email/password registrations
