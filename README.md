# BeautySpot Anne

A full-stack beauty appointment booking application with admin dashboard, built with FastAPI (Python backend) and Next.js (React frontend).

## Features

- **Service Management**: Admin can manage beauty services
- **Booking System**: Clients can book appointments with date/time selection
- **Availability Management**: Admin can set availability slots
- **Authentication**: Google and Facebook OAuth integration with NextAuth.js
- **Payments**: Stripe integration for appointment deposits
- **Responsive Design**: Tailwind CSS for mobile-friendly UI

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Payments**: Stripe
- **Server**: Uvicorn
- **Python Version**: 3.11.7

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js with OAuth providers
- **Client**: Axios, React Calendar
- **Payments**: Stripe.js

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── database.py      # Database configuration
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   └── routers/
│   │       ├── services.py  # Service CRUD endpoints
│   │       ├── bookings.py  # Booking & Stripe endpoints
│   │       ├── availability.py  # Admin availability endpoints
│   │       └── users.py     # User management
│   ├── requirements.txt
│   ├── runtime.txt
│   └── railway.json         # Railway config for backend
│
├── frontend/
│   ├── app/
│   │   ├── layout.js        # Root layout
│   │   ├── page.js          # Home page
│   │   ├── booking/         # Booking page
│   │   ├── servicii/        # Services listing page
│   │   ├── admin/           # Admin pages
│   │   ├── api/auth/        # NextAuth endpoints
│   │   └── globals.css
│   ├── components/          # React components
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── railway.json             # Root Railway config (monorepo)
├── RAILWAY_DEPLOYMENT.md    # Detailed deployment guide
├── RAILWAY_CHECKLIST.md     # Step-by-step deployment checklist
└── ENV_VARIABLES_REFERENCE.md # Environment variables guide
```

## Quick Start - Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL running locally

### Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your local database URL and Stripe keys

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
cp .env.example .env
# Edit .env with your local API URL and OAuth credentials

npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`

## Deployment on Railway

### Quick Deploy

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project → Connect GitHub repo
4. Railway auto-detects the monorepo and deploys both services
5. Add PostgreSQL addon
6. Configure environment variables (see guides below)

### Documentation

Follow these guides in order:

1. **[RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)** - Complete deployment guide with architecture details
2. **[RAILWAY_CHECKLIST.md](RAILWAY_CHECKLIST.md)** - Step-by-step checklist for deployment
3. **[ENV_VARIABLES_REFERENCE.md](ENV_VARIABLES_REFERENCE.md)** - Environment variables quick reference

## Environment Variables

### Required for Both Environments

See [ENV_VARIABLES_REFERENCE.md](ENV_VARIABLES_REFERENCE.md) for complete list and how to obtain them.

**Backend** needs:
- `DATABASE_URL` - PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Stripe API key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `FRONTEND_URL` - Your frontend domain
- `CORS_ORIGINS` - Frontend URLs allowed to call backend

**Frontend** needs:
- `NEXT_PUBLIC_API_URL` - Your backend domain
- `NEXTAUTH_URL` - Your frontend domain
- `NEXTAUTH_SECRET` - Secure random string (32+ chars)
- OAuth credentials (Google/Facebook) optional

## API Endpoints

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service (admin)
- `PUT /api/services/{id}` - Update service (admin)
- `DELETE /api/services/{id}` - Delete service (admin)

### Bookings
- `GET /api/bookings` - List bookings (admin)
- `POST /api/bookings` - Create booking
- `POST /api/bookings/webhook` - Stripe webhook endpoint

### Availability
- `GET /api/availability` - List available slots (admin)
- `GET /api/availability/slots/{service_id}/{date}` - Get available times for date
- `POST /api/availability` - Add availability (admin)
- `DELETE /api/availability/{id}` - Delete availability (admin)

### Users
- `POST /api/users/upsert` - Create/update user (OAuth callback)

## Testing Stripe Webhooks Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Listen for events
stripe listen --forward-to localhost:8000/api/bookings/webhook

# Get webhook signing secret from CLI output
# Set in .env as STRIPE_WEBHOOK_SECRET
```

## Database Setup

Tables are created automatically on first run. To reset the database:

1. **Locally**: Drop and recreate PostgreSQL database
2. **Railway**: Use the Data tab in PostgreSQL service to run SQL commands

## Known Issues & Troubleshooting

- **CORS errors**: Verify `CORS_ORIGINS` includes your frontend URL with `https://`
- **Auth failing**: Check `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` matches your domain
- **Blank page on frontend**: Check browser console and backend logs
- **Stripe errors**: Verify webhook secret matches Stripe dashboard

## Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Push to GitHub
5. Create Pull Request

## License

[Your License Here]

## Support

For deployment issues, see:
- [Railway Docs](https://railway.app/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Next.js Docs](https://nextjs.org/docs)

## Contact

For bugs and feature requests, open an issue on GitHub.
