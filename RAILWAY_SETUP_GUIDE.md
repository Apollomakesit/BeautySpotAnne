# Railway Deployment Setup Guide for BeautySpot Anne

## Project Information
- **Project ID**: ceac9d51-c1b0-413f-b112-5caa1e02dae0
- **Project URL**: https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0
- **GitHub Repo**: Apollomakesit/BeautySpotAnne
- **User Email**: ionutstefan2014@gmail.com

## Status Report

### ✓ Completed
1. Railway project created successfully with ID: `ceac9d51-c1b0-413f-b112-5caa1e02dae0`
2. User authenticated with Railway CLI
3. railway.json configured with both services (backend and frontend) in their respective root directories

### Current Configuration in railway.json

**Backend Service:**
- Root Directory: `backend`
- Builder: NIXPACKS
- Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Restart Policy: ON_FAILURE (max 10 retries)

**Frontend Service:**
- Root Directory: `frontend`
- Builder: NIXPACKS
- Start Command: `next start`
- Restart Policy: ON_FAILURE (max 5 retries)

## Remaining Tasks

### 1. Add PostgreSQL Database

**Option A: Using Railway Dashboard (Recommended)**
1. Go to: https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0
2. Click "+ Add New Service" button
3. Select "Database" → "PostgreSQL"
4. Confirm and Railway will provision the database

**Option B: Using Railway CLI**
```bash
# First, ensure you're in the project directory
cd /workspaces/BeautySpotAnne

# Add PostgreSQL
railway service add postgres

# Or if that doesn't work, use:
railway database postgres
```

**Expected Result:**
- PostgreSQL service will be created
- Connection string will be available as environment variable in other services

---

### 2. Set Backend Environment Variables

Navigate to Railway Dashboard → Project → Backend Service → Variables tab

**Add these variables** (replacing placeholders as indicated):

| Variable | Value | Notes |
|----------|-------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_placeholder` | User will update with real key |
| `STRIPE_WEBHOOK_SECRET` | `whsec_placeholder` | User will update with real secret |
| `FRONTEND_URL` | `http://localhost:3000` | Update after frontend is deployed |
| `CORS_ORIGINS` | `http://localhost:3000` | Update after frontend URL is known |
| `DATABASE_URL` | Auto-populated by PostgreSQL | This comes from the PostgreSQL service |

**Using Railway CLI:**
```bash
railway service select backend

# Set each variable
railway variable set STRIPE_SECRET_KEY=sk_test_placeholder
railway variable set STRIPE_WEBHOOK_SECRET=whsec_placeholder
railway variable set FRONTEND_URL=http://localhost:3000
railway variable set CORS_ORIGINS=http://localhost:3000
```

---

### 3. Set Frontend Environment Variables

Navigate to Railway Dashboard → Project → Frontend Service → Variables tab

**Add these variables** (replacing placeholders as indicated):

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Update after backend is deployed |
| `NEXTAUTH_URL` | `http://localhost:3000` | Update with actual frontend URL |
| `NEXTAUTH_SECRET` | `please-change-me-with-openssl-rand-base64-32` | Generate: `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | `your_google_client_id.apps.googleusercontent.com` | Get from Google OAuth setup |
| `GOOGLE_CLIENT_SECRET` | `your_google_client_secret` | Get from Google OAuth setup |
| `FACEBOOK_CLIENT_ID` | `your_facebook_app_id` | Get from Facebook App setup |
| `FACEBOOK_CLIENT_SECRET` | `your_facebook_app_secret` | Get from Facebook App setup |

**Using Railway CLI:**
```bash
railway service select frontend

# Set each variable
railway variable set NEXT_PUBLIC_API_URL=http://localhost:8000
railway variable set NEXTAUTH_URL=http://localhost:3000
railway variable set NEXTAUTH_SECRET=please-change-me-with-openssl-rand-base64-32
railway variable set GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
railway variable set GOOGLE_CLIENT_SECRET=your_google_client_secret
railway variable set FACEBOOK_CLIENT_ID=your_facebook_app_id
railway variable set FACEBOOK_CLIENT_SECRET=your_facebook_app_secret
```

---

### 4. Verify GitHub Connection

The services are defined in `railway.json` with their root directories. Railway will:
1. Automatically deploy from the specified root directories when you push to GitHub
2. Build and start the services according to the start commands specified

**Check GitHub connection in Railway Dashboard:**
1. Go to Project Settings
2. Ensure the GitHub repository (Apollomakesit/BeautySpotAnne) is connected
3. Verify deployment triggers are set to automatic on push to main branch

---

## Implementation Steps (In Order)

### Step 1: Add PostgreSQL
```bash
# Via CLI (if interactive mode works)
railway service add postgres

# Via Dashboard:
# https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0
# → Add Service → Database → PostgreSQL
```

### Step 2: Verify Services are Linked
```bash
# List all services in the project
railway service list

# Or check in dashboard - both backend and frontend should be listed
```

### Step 3: Set Backend Variables
The backend (`/workspaces/BeautySpotAnne/backend`) needs:
- Database connection (automatic from PostgreSQL service)
- Stripe keys
- Frontend URL for CORS

### Step 4: Set Frontend Variables
The frontend (`/workspaces/BeautySpotAnne/frontend`) needs:
- API URL pointing to backend
- NextAuth secrets
- OAuth credentials (Google, Facebook)

### Step 5: Deploy
- Push changes to GitHub (the railway.json is already updated)
- Railway will automatically build and deploy both services
- Monitor builds in the Railway dashboard

---

## Troubleshooting

### If Railway CLI is stuck in variable input mode:
- Open a new terminal window
- Or use the Railway web dashboard directly instead

### If services don't appear in Railway:
- Ensure your GitHub repo is authenticated with Railway
- Check that railway.json has correct syntax
- Verify the GitHub repo is properly connected in Settings

### If environment variables aren't being picked up:
- Redeploy the services (push a change or manually trigger rebuild)
- Variables take effect on the next deployment

---

## Post-Deployment Checklist

- [ ] PostgreSQL database created and accessible
- [ ] Backend service deployed and running
- [ ] Frontend service deployed and running  
- [ ] Backend environment variables set
- [ ] Frontend environment variables set
- [ ] GitHub deployments triggering on push
- [ ] Health checks: Backend API responds
- [ ] Health checks: Frontend loads

---

## Dashboard Links

- **Project**: https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0
- **GitHub Repo**: https://github.com/Apollomakesit/BeautySpotAnne

---

## Notes

- The backend runs on `$PORT` (Railway assigns this dynamically)
- The frontend uses Next.js with built-in start command
- Database connection string will be available as `DATABASE_URL` in backend service
- Both services will auto-restart on failure as configured
