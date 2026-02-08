# Environment Variables Quick Reference

## Backend Environment Variables

Located in Railway Backend Service → Variables

```
DATABASE_URL              PostgreSQL connection string (auto-set by addon)
FRONTEND_URL              https://your-frontend-domain.up.railway.app
CORS_ORIGINS              https://your-frontend-domain.up.railway.app
STRIPE_SECRET_KEY         sk_test_xxxx... or sk_live_xxxx...
STRIPE_WEBHOOK_SECRET     whsec_xxxx...
```

## Frontend Environment Variables

Located in Railway Frontend Service → Variables

```
NEXT_PUBLIC_API_URL       https://your-backend-domain.up.railway.app
NEXTAUTH_URL              https://your-frontend-domain.up.railway.app
NEXTAUTH_SECRET           (32+ character random string from: openssl rand -base64 32)
GOOGLE_CLIENT_ID          Your Google OAuth Client ID (optional)
GOOGLE_CLIENT_SECRET      Your Google OAuth Secret (optional)
FACEBOOK_CLIENT_ID        Your Facebook App ID (optional)
FACEBOOK_CLIENT_SECRET    Your Facebook App Secret (optional)
```

## How to Get Your URLs

1. **Backend URL**: Railway dashboard → backend service → Settings → URL
2. **Frontend URL**: Railway dashboard → frontend service → Settings → URL

Example format:
- Backend: `https://beautyspotanne-backend-prod-abc123.up.railway.app`
- Frontend: `https://beautyspotanne-frontend-prod-xyz789.up.railway.app`

## How to Get Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click **Developers** → **API Keys**
3. Find "Standard keys" section
4. Copy the **Secret key** → `STRIPE_SECRET_KEY`

For Webhook Secret:
1. In Stripe: **Developers** → **Webhooks**
2. Click your endpoint
3. Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

## How to Get OAuth Credentials (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Go to **Credentials** → Create **OAuth 2.0 Client ID**
5. Add authorized redirect URIs: `https://your-frontend-domain.up.railway.app/api/auth/callback/google`
6. Copy Client ID and Client Secret

### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Go to **Settings** → **Basic**
4. Copy App ID → `FACEBOOK_CLIENT_ID`
5. Copy App Secret → `FACEBOOK_CLIENT_SECRET`
6. Add App Domains: `your-frontend-domain.up.railway.app`
7. Add OAuth Valid Redirect URIs: `https://your-frontend-domain.up.railway.app/api/auth/callback/facebook`

## Railway Environment Variable Tips

- **Always use `NEXT_PUBLIC_`** prefix for frontend variables that need to be public
- **Never** commit actual values - use `.env.example` files
- Changes to environment variables trigger automatic redeployment
- Use the Railway CLI for quicker variable updates: `railway variables set VAR_NAME=value`

## Verification Commands

After deployment, verify connection from frontend to backend:

```bash
# From browser console on your frontend site:
console.log(process.env.NEXT_PUBLIC_API_URL)

# Should return something like: https://your-backend.up.railway.app
```

Check if backend is accepting requests:
```bash
curl https://your-backend-domain.up.railway.app/
# Should return: {"message": "BeautySpot Anne API"}
```
