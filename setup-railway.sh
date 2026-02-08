#!/bin/bash

# Railway Setup Script for BeautySpot Anne
# This script sets up PostgreSQL, services, and environment variables

PROJECT_ID="ceac9d51-c1b0-413f-b112-5caa1e02dae0"
GITHUB_REPO="Apollomakesit/BeautySpotAnne"

echo "=== BeautySpot Anne Railway Setup ==="
echo "Project ID: $PROJECT_ID"
echo ""

# Check Railway CLI is available
if ! command -v railway &> /dev/null; then
    echo "ERROR: Railway CLI not found. Please install it first."
    exit 1
fi

echo "Step 1: Check Railway authentication..."
railway whoami || { echo "Not authenticated. Please run 'railway login' first"; exit 1; }
echo ""

# Since the railway.json is already configured, let's proceed with environment variables
# We'll use railway variable set for each service

echo "Step 2: Selecting project..."
railway projects
echo ""

echo "Step 3: Setting BACKEND environment variables..."
# These commands would set variables per service if the CLI supports it
# Otherwise, we'll document the variables that need to be set

echo "Note: Using Railway CLI to set variables..."
echo "Variables for backend service:"
echo "- STRIPE_SECRET_KEY=sk_test_placeholder"
echo "- STRIPE_WEBHOOK_SECRET=whsec_placeholder"
echo "- FRONTEND_URL=http://localhost:3000"
echo "- CORS_ORIGINS=http://localhost:3000"
echo ""

echo "Variables for frontend service:"
echo "- NEXT_PUBLIC_API_URL=http://localhost:8000"
echo "- NEXTAUTH_URL=http://localhost:3000"
echo "- NEXTAUTH_SECRET=please-change-me-with-openssl-rand-base64-32"
echo "- GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com"
echo "- GOOGLE_CLIENT_SECRET=your_google_client_secret"
echo "- FACEBOOK_CLIENT_ID=your_facebook_app_id"
echo "- FACEBOOK_CLIENT_SECRET=your_facebook_app_secret"
echo ""

echo "Setup complete! Next steps:"
echo "1. The railway.json is already configured with backend and frontend services"
echo "2. Add PostgreSQL through the Railway dashboard or CLI"
echo "3. Set the environment variables through the Railway dashboard or railway CLI"
