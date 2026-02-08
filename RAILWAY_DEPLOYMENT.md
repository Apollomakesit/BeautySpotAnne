# Railway Deployment Guide for BeautySpot Anne

This guide walks you through deploying the BeautySpot Anne application on Railway.

## Prerequisites

- Railway account (create at [railway.app](https://railway.app))
- GitHub account with this repository connected
- Stripe account with API keys
- Google OAuth credentials (optional, for Google login)
- Facebook OAuth credentials (optional, for Facebook login)

## Architecture

This is a full-stack monorepo with two services:
- **Backend**: FastAPI (Python) - REST API running on port 8000
- **Frontend**: Next.js (Node.js) - React app running on port 3000
- **Database**: PostgreSQL addon

## Deployment Steps

### 1. Create a New Railway Project

1. Go to [railway.app](https://railway.app) and log in
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account and select the `BeautySpotAnne` repository
5. Railway will automatically detect the monorepo structure from `railway.json`

### 2. Add PostgreSQL Database

1. In your Railway project, click the "+" button
2. Search for and select "PostgreSQL"
3. Click "Add"
4. This creates a Postgres instance and sets up the `DATABASE_URL` variable automatically

### 3. Configure Backend Service

1. Select the "backend" service
2. Go to the "Variables" tab
3. Add the following environment variables:
   - `FRONTEND_URL`: `https://<your-frontend-url>.up.railway.app` (set after frontend is deployed)
   - `CORS_ORIGINS`: `https://<your-frontend-url>.up.railway.app`
   - `STRIPE_SECRET_KEY`: Your Stripe secret key (from Stripe Dashboard)
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret
4. The `DATABASE_URL` is automatically set by the PostgreSQL addon

### 4. Configure Frontend Service

1. Select the "frontend" service
2. Go to the "Variables" tab
3. Add the following environment variables:
   - `NEXT_PUBLIC_API_URL`: `https://<your-backend-url>.up.railway.app`
   - `NEXTAUTH_URL`: `https://<your-frontend-url>.up.railway.app`
   - `NEXTAUTH_SECRET`: Generate a secure random string (run: `openssl rand -base64 32`)
   - `GOOGLE_CLIENT_ID`: From Google Cloud Console (optional)
   - `GOOGLE_CLIENT_SECRET`: From Google Cloud Console (optional)
   - `FACEBOOK_CLIENT_ID`: From Facebook Developers (optional)
   - `FACEBOOK_CLIENT_SECRET`: From Facebook Developers (optional)

### 5. Configure Stripe Webhook

After the backend service is deployed:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Webhooks (Developers → Webhooks)
3. Click "Add endpoint"
4. Endpoint URL: `https://<your-backend-url>.up.railway.app/api/bookings/webhook`
5. Select events: `checkout.session.completed`
6. Copy the signing secret and add it as `STRIPE_WEBHOOK_SECRET` in your backend variables

## Getting Your Service URLs

After deployment:

1. In Railway dashboard, click on each service
2. In the "Deployments" tab, find the generated URL
3. Use these URLs to configure cross-service variables:
   - Update backend `FRONTEND_URL` with frontend URL
   - Update frontend `NEXT_PUBLIC_API_URL` with backend URL
   - Update backend `CORS_ORIGINS` with frontend URL

Services will auto-redeploy when you update variables.

## Local Development

To test locally before deploying:

1. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Update `.env` files with your local values

3. Backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

4. Frontend (in another terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Database Migrations

The application automatically creates tables on first run. If you need to reset:

1. In Railway dashboard, select the PostgreSQL service
2. Click the "Data" tab
3. You can run SQL commands directly

## Troubleshooting

### Build Issues
- Check the deployment logs in Railway (Deployments tab)
- Ensure `runtime.txt` specifies correct Python version (3.11.7)
- Verify `requirements.txt` has all dependencies

### CORS Errors
- Verify `CORS_ORIGINS` includes your exact frontend URL
- Make sure `NEXT_PUBLIC_API_URL` is set to backend URL with `https://`

### Auth Issues
- Check `NEXTAUTH_URL` matches your frontend domain exactly
- Generate a new `NEXTAUTH_SECRET` if needed
- Verify OAuth credentials are correct in Google/Facebook consoles

### Database Connection
- Verify `DATABASE_URL` is set (should be automatic from PostgreSQL addon)
- Check backend logs for connection errors
- Ensure database is running in Railway

## Monitoring & Logs

In Railway:
1. Select each service
2. Click "Logs" tab to view real-time output
3. Click "Metrics" tab to monitor CPU, memory, network

## Next Steps

1. Set up custom domain (Domains tab in Railway settings)
2. Configure HTTPS (automatic with Railway)
3. Set up monitoring and alerts
4. Configure automated backups for PostgreSQL

## Support

- Railway Documentation: [railway.app/docs](https://railway.app/docs)
- FastAPI Documentation: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- Next.js Documentation: [nextjs.org](https://nextjs.org)
