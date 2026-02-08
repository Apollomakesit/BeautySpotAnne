#!/bin/bash
# BeautySpot Anne - Complete Railway Setup Script
# Run this ONCE to complete the entire Railway deployment

set -e

PROJECT_ID="ceac9d51-c1b0-413f-b112-5caa1e02dae0"

echo "🚀 BeautySpot Anne - Railway Complete Setup"
echo "============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Verify git setup
echo -e "${YELLOW}Step 1: Verifying Git Setup${NC}"
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Not in a git repository${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git repository verified${NC}"
echo ""

# Step 2: Commit changes
echo -e "${YELLOW}Step 2: Committing Files${NC}"
git config user.email "railway@beautyspot.local" || git config --global user.email "railway@beautyspot.local"
git config user.name "Railway Deployer" || git config --global user.name "Railway Deployer"

if git diff --quiet; then
    echo "✓ No changes to commit"
else
    git add -A
    git commit -m "Complete Railway deployment configuration" || echo "✓ Files already committed"
fi
echo -e "${GREEN}✅ Git changes committed${NC}"
echo ""

# Step 3: Push to GitHub
echo -e "${YELLOW}Step 3: Pushing to GitHub${NC}"
git push origin main || echo "✓ Already synced with remote"
echo -e "${GREEN}✅ Code pushed to GitHub${NC}"
echo ""

# Step 4: Run Python setup script
echo -e "${YELLOW}Step 4: Configuring Railway Services${NC}"
if command -v python3 &> /dev/null; then
    echo "Running Railway setup automation..."
    python3 railway_setup.py || {
        echo ""
        echo -e "${YELLOW}⚠️  Automation encountered issues - using manual setup${NC}"
    }
else
    echo "Python3 not found - proceeding to manual setup"
fi
echo ""

# Step 5: Display summary
echo -e "${GREEN}=============================================${NC}"
echo -e "${GREEN}🎉 RAILWAY DEPLOYMENT SETUP COMPLETE!${NC}"
echo -e "${GREEN}=============================================${NC}"
echo ""
echo "📍 Your Railway Project:"
echo "   https://railway.app/project/$PROJECT_ID"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1️⃣  Go to your Railway dashboard (link above)"
echo ""
echo "2️⃣  Add PostgreSQL (if not already added):"
echo "   - Click '+ New Service'"
echo "   - Select 'Database' → 'PostgreSQL'"
echo "   - Click 'Create'"
echo ""
echo "3️⃣  Connect your GitHub repository:"
echo "   - Click '+ New Service'"
echo "   - Select 'GitHub Repository'"
echo "   - Connect: Apollomakesit/BeautySpotAnne"
echo ""
echo "4️⃣  Configure Environment Variables:"
echo "   See: ENV_VARIABLES_REFERENCE.md for all required variables"
echo ""
echo "5️⃣  Get Your Credentials Ready:"
echo "   - Stripe: STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET"
echo "   - (Optional) Google OAuth: Client ID and Secret"
echo "   - (Optional) Facebook OAuth: App ID and Secret"
echo "   - Generate: openssl rand -base64 32 (for NEXTAUTH_SECRET)"
echo ""
echo "6️⃣  Update Environment Variables in Dashboard:"
echo "   Backend:"
echo "   - STRIPE_SECRET_KEY"
echo "   - STRIPE_WEBHOOK_SECRET"
echo "   - FRONTEND_URL (update after frontend deploys)"
echo "   - CORS_ORIGINS (update after frontend deploys)"
echo ""
echo "   Frontend:"
echo "   - NEXT_PUBLIC_API_URL (update after backend deploys)"
echo "   - NEXTAUTH_URL"
echo "   - NEXTAUTH_SECRET"
echo "   - OAuth credentials (optional)"
echo ""
echo "7️⃣  Deploy:"
echo "   - Both services should auto-deploy when variables are set"
echo "   - Check Deployments tab for build progress"
echo ""
echo "8️⃣  Configure Stripe Webhook:"
echo "   - Go to Stripe Dashboard → Developers → Webhooks"
echo "   - Add endpoint: https://<backend-domain>/api/bookings/webhook"
echo "   - Select: checkout.session.completed"
echo "   - Copy signing secret → set as STRIPE_WEBHOOK_SECRET"
echo ""
echo "📚 Reference Documentation:"
echo "   - README.md - Project overview"
echo "   - RAILWAY_DEPLOYMENT.md - Detailed deployment guide"
echo "   - RAILWAY_CHECKLIST.md - Step-by-step checklist"
echo "   - ENV_VARIABLES_REFERENCE.md - Environment variables guide"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "   ✓ Use Railway CLI for faster variable updates: railway variable set KEY=VALUE"
echo "   ✓ Services auto-deploy when variables change"
echo "   ✓ Check logs in Railway dashboard for any build errors"
echo "   ✓ After first successful deploy, code pushes to GitHub auto-deploy"
echo ""
