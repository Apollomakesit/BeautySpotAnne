#!/bin/bash
# BeautySpot Anne - Fix Railway Services Script
# This script will help configure your Railway services correctly

PROJECT_ID="ceac9d51-c1b0-413f-b112-5caa1e02dae0"

echo "🔧 BeautySpot Anne - Railway Configuration Fix"
echo "=============================================="
echo ""
echo "Project: https://railway.app/project/$PROJECT_ID"
echo ""

cat << 'EOF'

PROBLEM IDENTIFIED:
==================
Both services are failing because Railway doesn't know which folder to build.
Railway sees the root directory with multiple folders and can't determine the app type.

SOLUTION - Complete These Steps in Railway Dashboard:
======================================================

STEP 1: Delete Current Failing Services
----------------------------------------
1. Go to: https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0
2. Click on "truthful-smile" service → Settings → Scroll down → "Delete Service"
3. Click on "BeautySpotAnne" service → Settings → Scroll down → "Delete Service"
4. Confirm deletions

STEP 2: Add Backend Service (FastAPI)
--------------------------------------
1. Click "+ New Service"
2. Select "GitHub Repo"
3. Choose: Apollomakesit/BeautySpotAnne
4. Service will be created - click on it
5. Go to "Settings" tab
6. Find "Source" or "Root Directory" section
7. Set Root Directory to: backend
8. Save changes

Now add Backend Variables (in Variables tab):
   DATABASE_URL → (will auto-populate from Postgres)
   STRIPE_SECRET_KEY → sk_test_YOUR_KEY_HERE
   STRIPE_WEBHOOK_SECRET → whsec_YOUR_SECRET_HERE
   FRONTEND_URL → http://localhost:3000 (temporary, update after frontend deploys)
   CORS_ORIGINS → http://localhost:3000 (temporary, update after frontend deploys)

9. Click "Deploy" or wait for auto-deploy

STEP 3: Add Frontend Service (Next.js)
---------------------------------------
1. Click "+ New Service" again
2. Select "GitHub Repo"
3. Choose: Apollomakesit/BeautySpotAnne (same repo)
4. Service will be created - click on it
5. Go to "Settings" tab
6. Set Root Directory to: frontend
7. Save changes

Now add Frontend Variables (in Variables tab):
   NEXT_PUBLIC_API_URL → http://localhost:8000 (temporary, update after backend deploys)
   NEXTAUTH_URL → http://localhost:3000 (temporary, update after frontend deploys)
   NEXTAUTH_SECRET → (generate with: openssl rand -base64 32)
   GOOGLE_CLIENT_ID → your_google_client_id (optional)
   GOOGLE_CLIENT_SECRET → your_google_secret (optional)
   FACEBOOK_CLIENT_ID → your_facebook_id (optional)
   FACEBOOK_CLIENT_SECRET → your_facebook_secret (optional)

8. Click "Deploy" or wait for auto-deploy

STEP 4: Update Cross-Service URLs
----------------------------------
After both services successfully deploy and get Railway URLs:

1. Click on Backend service
2. Go to "Settings" → Find the generated Railway URL (e.g., https://backend-xxx.railway.app)
3. Copy this URL

4. Click on Frontend service
5. Go to "Settings" → Find the generated Railway URL (e.g., https://frontend-xxx.railway.app)
6. Copy this URL

7. Now update the variables:
   Backend Variables:
   - FRONTEND_URL → https://frontend-xxx.railway.app
   - CORS_ORIGINS → https://frontend-xxx.railway.app
   
   Frontend Variables:
   - NEXT_PUBLIC_API_URL → https://backend-xxx.railway.app
   - NEXTAUTH_URL → https://frontend-xxx.railway.app

8. Services will auto-redeploy with updated URLs

STEP 5: Configure Stripe Webhook
---------------------------------
1. Go to: https://dashboard.stripe.com
2. Click Developers → Webhooks
3. Click "Add an endpoint"
4. Endpoint URL: https://backend-xxx.railway.app/api/bookings/webhook
5. Select events: checkout.session.completed
6. Click "Add endpoint"
7. Copy the "Signing secret" (starts with whsec_)
8. In Railway, update Backend variable:
   STRIPE_WEBHOOK_SECRET → whsec_YOUR_SIGNING_SECRET

STEP 6: Verify Deployment
--------------------------
1. Visit your frontend URL in browser
2. Check that the page loads
3. Open browser console (F12)
4. Check for API connection errors
5. Try navigating to /servicii and /booking pages

VERIFICATION CHECKLIST:
=======================
[ ] PostgreSQL service is Online (green)
[ ] Backend service deployed successfully (green checkmark)
[ ] Frontend service deployed successfully (green checkmark)
[ ] Backend has all required variables set
[ ] Frontend has all required variables set
[ ] Backend FRONTEND_URL matches actual frontend domain
[ ] Frontend NEXT_PUBLIC_API_URL matches actual backend domain
[ ] Stripe webhook configured and secret updated
[ ] Frontend loads in browser without errors
[ ] Can see services list on the site
[ ] Booking page loads correctly

QUICK REFERENCE:
================
Backend needs: DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FRONTEND_URL, CORS_ORIGINS
Frontend needs: NEXT_PUBLIC_API_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, (optional OAuth credentials)

Generate NEXTAUTH_SECRET:
$ openssl rand -base64 32

Check backend is running:
$ curl https://your-backend-domain.railway.app/
Should return: {"message": "BeautySpot Anne API"}

Common Issues:
- Build fails: Check Root Directory is set correctly
- CORS errors: Ensure CORS_ORIGINS matches frontend URL exactly (with https://)
- Blank page: Check NEXT_PUBLIC_API_URL is set and backend is responding
- Database errors: Ensure DATABASE_URL is present (auto-set by Postgres addon)

Need Help?
See: ENV_VARIABLES_REFERENCE.md for detailed variable information
See: RAILWAY_DEPLOYMENT.md for complete deployment guide

EOF

echo ""
echo "📋 Follow the steps above in your Railway dashboard"
echo ""
echo "🔗 Quick Links:"
echo "   Railway Project: https://railway.app/project/$PROJECT_ID"
echo "   Stripe Dashboard: https://dashboard.stripe.com"
echo "   Google Cloud Console: https://console.cloud.google.com"
echo "   Facebook Developers: https://developers.facebook.com"
echo ""
