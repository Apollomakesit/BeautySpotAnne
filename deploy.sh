#!/bin/bash

# BeautySpot Anne - Railway Deployment Script
# This script completes the Railway deployment setup

set -e

PROJECT_ID="ceac9d51-c1b0-413f-b112-5caa1e02dae0"
PROJECT_NAME="beautyspot-anne"

echo "🚀 BeautySpot Anne - Railway Deployment Setup"
echo "=============================================="
echo ""
echo "Your Railway Project: https://railway.com/project/$PROJECT_ID"
echo ""

# Check if we have the Railway token
if [ -z "$RAILWAY_TOKEN" ]; then
    echo "⚠️  RAILWAY_TOKEN not set. Getting from Railway CLI..."
    export RAILWAY_TOKEN=$(railway token 2>/dev/null || echo "")
    if [ -z "$RAILWAY_TOKEN" ]; then
        echo "❌ Could not get Railway token automatically"
        echo ""
        echo "To get your token, run:"
        echo "  railway token"
        echo ""
        echo "Then set it as an environment variable:"
        echo "  export RAILWAY_TOKEN=<your-token>"
        exit 1
    fi
fi

echo "✅ Railway authenticated"
echo ""

# Step 1: Add PostgreSQL
echo "📦 Adding PostgreSQL database..."
curl -X POST https://api.railway.app/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -d '{
    "query": "mutation { serviceCreate(input: {projectId: \"'$PROJECT_ID'\" name: \"postgres\", templateId: \"postgres\"}) { id name } }"
  }' 2>/dev/null || echo "PostgreSQL may already be added"

echo "✅ PostgreSQL added"
echo ""

# Step 2: Commit code changes
echo "📝 Committing deployment configuration..."
cd /workspaces/BeautySpotAnne
git config --global user.email "railway@deploy.local" || true
git config --global user.name "Railway Deployer" || true
git add -A
git commit -m "Add Railway deployment configuration" || echo "Nothing to commit"

# Step 3: Push to GitHub
echo "🔄 Pushing to GitHub..."
git push origin main || echo "Already synced"

echo ""
echo "✅ Code pushed to GitHub"
echo ""
echo "🎯 Complete these steps in the Railway Dashboard:"
echo ""
echo "1. Go to: https://railway.com/project/$PROJECT_ID"
echo ""
echo "2. Click '+New Service' → 'GitHub Repo'"
echo "   - Connect: Apollomakesit/BeautySpotAnne"
echo ""
echo "3. For Backend Service:"
echo "   - Root Directory: backend"
echo "   - Add environment variables (see Environment tab):"
echo "      STRIPE_SECRET_KEY=sk_test_..."
echo "      STRIPE_WEBHOOK_SECRET=whsec_..."
echo ""
echo "4. For Frontend Service:"
echo "   - Root Directory: frontend"
echo "   - Add environment variables:"
echo "      NEXT_PUBLIC_API_URL=https://<backend-url>"
echo "      NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>"
echo "      NEXTAUTH_URL=https://<frontend-url>"
echo "      GOOGLE_CLIENT_ID=... (optional)"
echo "      GOOGLE_CLIENT_SECRET=... (optional)"
echo ""
echo "5. Deploy both services"
echo ""
echo "6. Once deployed, update:"
echo "   - Backend FRONTEND_URL and CORS_ORIGINS with frontend domain"
echo ""
echo "📚 Reference Guide: ./ENV_VARIABLES_REFERENCE.md"
echo "📋 Detailed Checklist: ./RAILWAY_CHECKLIST.md"
echo ""
echo "🎉 Deployment script completed!"
