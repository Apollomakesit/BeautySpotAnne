# BeautySpot Anne - Railway Deployment Checklist

## Pre-Deployment Setup

### 1. Prepare Your Accounts & Credentials

- [ ] Have a Railway account created at [railway.app](https://railway.app)
- [ ] Have Stripe test/live API keys ready:
  - [ ] `STRIPE_SECRET_KEY` (starts with `sk_`)
  - [ ] `STRIPE_WEBHOOK_SECRET` (from Stripe Webhooks dashboard, starts with `whsec_`)
- [ ] (Optional) Google OAuth credentials:
  - [ ] `GOOGLE_CLIENT_ID`
  - [ ] `GOOGLE_CLIENT_SECRET`
- [ ] (Optional) Facebook OAuth credentials:
  - [ ] `FACEBOOK_CLIENT_ID`
  - [ ] `FACEBOOK_CLIENT_SECRET`

### 2. Generate Secure Secrets

Generate a secure NEXTAUTH_SECRET for the frontend:
```bash
openssl rand -base64 32
```
Save this value - you'll need it for the frontend environment variables.

## Deployment Steps

### 3. Initialize Railway Project

- [ ] Go to [railway.app/dashboard](https://railway.app/dashboard)
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub"
- [ ] Select the `BeautySpotAnne` repository
- [ ] Railway will auto-detect and create two services: `backend` and `frontend`

### 4. Add PostgreSQL Database

- [ ] In your Railway project, click the "+" button
- [ ] Search for and select "PostgreSQL"
- [ ] Click "Add"
- [ ] The database will automatically provide `DATABASE_URL` to the backend

### 5. Configure Backend Environment Variables

Select the **backend** service and go to **Variables** tab. Add:

- [ ] `DATABASE_URL` - Already set by PostgreSQL addon (verify it exists)
- [ ] `FRONTEND_URL` - Leave empty for now, update after frontend is deployed
- [ ] `CORS_ORIGINS` - Leave empty for now, update after frontend is deployed
- [ ] `STRIPE_SECRET_KEY` - Your Stripe secret key
- [ ] `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

### 6. Deploy & Get Backend URL

- [ ] Click "Deploy" to deploy the backend
- [ ] Wait for the deployment to complete (check Logs tab)
- [ ] Once deployed, go to **Settings** tab
- [ ] Copy your backend service URL (something like `https://beautyspotanne-backend-prod.up.railway.app`)

### 7. Configure Frontend Environment Variables

Select the **frontend** service and go to **Variables** tab. Add:

- [ ] `NEXT_PUBLIC_API_URL` - `https://<your-backend-url>.up.railway.app` (from step 6)
- [ ] `NEXTAUTH_URL` - Leave as placeholder for now, update after frontend is deployed
- [ ] `NEXTAUTH_SECRET` - The 32-character secret you generated earlier
- [ ] `GOOGLE_CLIENT_ID` - (optional)
- [ ] `GOOGLE_CLIENT_SECRET` - (optional)
- [ ] `FACEBOOK_CLIENT_ID` - (optional)
- [ ] `FACEBOOK_CLIENT_SECRET` - (optional)

### 8. Deploy & Get Frontend URL

- [ ] Click "Deploy" to deploy the frontend
- [ ] Wait for the deployment to complete (check Logs tab)
- [ ] Once deployed, go to **Settings** tab
- [ ] Copy your frontend service URL (something like `https://beautyspotanne-frontend-prod.up.railway.app`)

### 9. Complete Backend Configuration

Back to the **backend** service, update these variables:

- [ ] `FRONTEND_URL` - `https://<your-frontend-url>.up.railway.app` (from step 8)
- [ ] `CORS_ORIGINS` - `https://<your-frontend-url>.up.railway.app`
- [ ] Trigger redeploy with these new values

### 10. Configure Stripe Webhook

- [ ] Go to [Stripe Dashboard](https://dashboard.stripe.com)
- [ ] Click **Developers** > **Webhooks**
- [ ] Click **Add an endpoint**
- [ ] Endpoint URL: `https://<your-backend-url>.up.railway.app/api/bookings/webhook`
- [ ] Events to send: Select `checkout.session.completed`
- [ ] Click **Add endpoint**
- [ ] Copy the Signing secret
- [ ] Update `STRIPE_WEBHOOK_SECRET` in your backend variables if different

### 11. Verify Deployments

- [ ] Backend service logs show no errors
- [ ] Frontend service logs show successful build and start
- [ ] Database is connected
- [ ] Visit `https://<your-frontend-url>.up.railway.app` - should load the site

## Testing

### 12. Test Core Functionality

- [ ] Visit the frontend URL and verify it loads
- [ ] Test navigation between pages
- [ ] Check browser console for any API errors
- [ ] Go to `/booking` and verify you can see services
- [ ] Try to create a booking and verify Stripe checkout loads
- [ ] Test authentication (Google/Facebook if configured)

## Monitoring & Maintenance

### 13. Set Up Monitoring

- [ ] Check logs regularly in Railway dashboard
- [ ] Set up alerts for deployment failures (in Railway settings)
- [ ] Monitor PostgreSQL query logs if issues arise

### 14. Custom Domain (Optional)

- [ ] In Railway project settings, go to **Domains**
- [ ] Add a custom domain for frontend
- [ ] Update `NEXTAUTH_URL` in frontend with custom domain
- [ ] Update `FRONTEND_URL` and `CORS_ORIGINS` in backend to use custom domain
- [ ] Trigger redeploys

## Troubleshooting

- **CORS errors**: Verify `CORS_ORIGINS` in backend matches your exact frontend URL with `https://`
- **Auth not working**: Check `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are set correctly
- **Blank page**: Check browser console and Railway backend logs
- **Stripe errors**: Verify webhook signature secret is correct
- **Database errors**: Confirm `DATABASE_URL` exists in backend variables

## Support Resources

- [Railway Documentation](https://railway.app/docs)
- [FastAPI Guide](https://fastapi.tiangolo.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
