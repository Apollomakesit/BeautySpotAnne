#!/bin/bash

# Deploy database migrations and backend changes to Railway
echo "🚀 Deploying BeautySpotAnne backend with database migrations..."

# Git operations
echo "📝 Committing changes..."
git add -A
git commit -m "Add database migration for user table columns (first_name, last_name, password_hash)" || echo "No changes to commit"

# Push to Railway
echo "🔼 Pushing to Railway..."
git push

echo "✅ Deployment initiated!"
echo "Railway will automatically redeploy the backend with the new migration."
echo "The database columns will be added on startup."
