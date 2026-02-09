# BeautySpot Anne — Codebase Summary (Prompt-Ready)

This repository is a monorepo for a beauty salon booking platform. It contains:
- **Backend**: FastAPI + SQLAlchemy + Stripe for services, bookings, availability, users, contact messages, and reviews.
- **Frontend**: Next.js 14 app router UI with public pages, booking wizard, and an admin dashboard.
- **Deployment**: Railway configuration + deployment scripts and guides.

Use this summary as context when asking an AI to modify specific parts of the website.

---

## 1) Backend (FastAPI) — `/backend`

### Entry point
- **`app/main.py`**
  - Creates DB tables (`Base.metadata.create_all`), runs `init_db()` migrations, sets CORS.
  - Registers routers:
    - `/api/services`
    - `/api/bookings`
    - `/api/availability`
    - `/api/users`
    - `/api/contact`
    - `/api/reviews`

### Database setup
- **`app/database.py`**
  - Loads `DATABASE_URL` from env, creates SQLAlchemy engine and session.
  - Exposes `get_db()` dependency for routes.

### Migrations / DB init
- **`app/init_db.py`**
  - Ensures tables exist and adds missing `users` columns via raw SQL.

### Models (SQLAlchemy)
Defined in **`app/models.py`**:
- **User**
  - OAuth + email auth fields (email, name, provider, provider_id, password_hash).
  - Admin flag (`is_admin`), profile info, timestamps.
- **Service**
  - Service name, description, duration, price, deposit amount, image URL, active flag.
- **Availability**
  - Weekly availability by day-of-week with start/end times.
- **TimeOff**
  - One-off blocked dates (used when generating slots).
- **Booking**
  - Client details, date/time, status, payment status, Stripe session/payment IDs.
- **ContactMessage**
  - Contact form submissions with read/unread state.
- **Review**
  - Client ratings and text, approval state.

### Schemas (Pydantic)
- **`app/schemas.py`** contains request/response models for:
  - Services (`ServiceCreate`, `ServiceUpdate`, `ServiceResponse`)
  - Availability (`AvailabilityCreate`, `AvailabilityResponse`)
  - Bookings (`BookingCreate`, `BookingResponse`)
  - Users (`UserUpsert`, `UserRegister`, `UserLogin`, `UserResponse`)
  - Contact messages (`ContactMessageCreate`, `ContactMessageResponse`)
  - Reviews (`ReviewCreate`, `ReviewResponse`)

### API Routers
- **`routers/services.py`**
  - List active services, create new ones, patch updates, soft-delete (sets `active=false`).
- **`routers/bookings.py`**
  - Creates a booking, checks slot availability, starts Stripe Checkout (deposit).
  - Handles Stripe webhook to mark bookings as paid/confirmed.
  - Lists all bookings for admin UI.
- **`routers/availability.py`**
  - CRUD for weekly availability.
  - `/slots/{service_id}/{date}` generates 30‑minute slots based on service duration, availability, and existing bookings.
  - Returns no slots if the date exists in `TimeOff`.
- **`routers/users.py`**
  - OAuth upsert, email registration/login, fetch user by id or email.
  - Admin access derived from `ADMIN_EMAIL` env list.
- **`routers/contact.py`**
  - Saves contact messages and attempts SMTP email notification.
  - Lists messages and marks them as read.
- **`routers/reviews.py`**
  - Create reviews, list approved reviews (or all with `approved_only=false`).
  - Approve/reject/delete reviews (admin actions).

### Backend environment variables (from code + `.env.example`)
- `DATABASE_URL`, `FRONTEND_URL`, `CORS_ORIGINS`
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `ADMIN_EMAIL` (comma-separated admin emails)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (email notifications)

---

## 2) Frontend (Next.js 14) — `/frontend`

### App root & layout
- **`app/layout.js`**
  - Loads Google fonts, global CSS, NextAuth session provider, header/footer, toast styling.
  - Defines site metadata (title/description/keywords).

### Public pages
- **`app/page.js` (Home)**
  - Marketing landing page with hero, services teaser, reviews, and CTAs.
  - Fetches latest reviews; falls back to static testimonials.
- **`app/servicii/page.js` (Services)**
  - Loads services from API and shows cards; uses fallback data on empty.
- **`app/booking/page.js` + `app/booking/BookingContent.js`**
  - Multi‑step wizard: service → date → time → client details.
  - Calls `/api/availability/slots` for available times.
  - Submits booking to `/api/bookings` and redirects to Stripe checkout.
  - Uses fallback service list if API is missing.
- **`app/login/page.js`**
  - Email/password login via NextAuth credentials provider.
  - OAuth buttons for Google/Facebook.
- **`app/register/page.js`**
  - Registers via `/api/users/register` then signs in with credentials.
- **`app/recenzii/page.js`**
  - Lists approved reviews; allows new review submission.
- **`app/contact/page.js`**
  - Contact form posts to `/api/contact` (or simulates if API is missing).

### Admin area
Admin UI is under **`app/admin/*`** and uses **`app/admin/layout.js`**:
- Requires NextAuth session and `session.user.isAdmin`.
- Provides sidebar navigation for admin sections.

Admin pages:
- **`dashboard`**: fetches counts of services, bookings, messages, reviews.
- **`servicii`**: create/update/delete services.
- **`disponibilitate`**: manage weekly availability slots.
- **`programari`**: list bookings with status/payment info.
- **`mesaje`**: list contact messages and mark as read.
- **`recenzii`**: approve/reject/delete reviews.

### Auth API route
- **`app/api/auth/[...nextauth]/route.js`**
  - OAuth (Google/Facebook) + credentials provider.
  - OAuth sign‑in calls backend `/api/users/upsert`.
  - JWT/session callbacks store `isAdmin`, `phone`, and DB user id.

### Shared UI components
- **`components/Header.jsx`**: top navigation + auth menu + admin link.
- **`components/Footer.jsx`**: footer links, contact info, socials.
- **`components/SessionWrapper.jsx`**: wraps app in NextAuth session provider.

### Styling
- **`tailwind.config.js`**: custom beauty color palette, shadows, animations.
- **`app/globals.css`**: global styles + utility classes used across pages.

### Frontend environment variables
- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`

---

## 3) Deployment & Infrastructure

### Railway configuration
- **`railway.json` (root)**: monorepo setup for frontend + backend services.
- **`backend/railway.json`**: backend service config.
- **`frontend/railway.json`**: frontend service config.

### Deployment scripts
- Shell scripts: `deploy.sh`, `setup-railway.sh`, `setup-railway-api.sh`,
  `deploy-migrations.sh`, `setup-complete.sh`, `fix-railway-deployment.sh`.
- Python helpers: `complete-deployment.py`, `quick-push.py`, `railway_setup.py`,
  `setup_railway_api.py`.

### Documentation
- **`README.md`**: overview + local dev steps.
- **`RAILWAY_DEPLOYMENT.md`**, **`RAILWAY_CHECKLIST.md`**, **`RAILWAY_SETUP_GUIDE.md`**:
  Railway setup guidance.
- **`ENV_VARIABLES_REFERENCE.md`**: env var descriptions and setup.

---

## 4) Where to Focus for Common Changes

- **UI/UX changes** → `frontend/app/*` pages or `frontend/components/*`.
- **Booking flow** → `frontend/app/booking/*` + `backend/app/routers/bookings.py`.
- **Availability logic** → `backend/app/routers/availability.py`.
- **Services catalog** → `backend/app/routers/services.py` + admin UI.
- **Auth/session behavior** → `frontend/app/api/auth/[...nextauth]/route.js` + `backend/app/routers/users.py`.
- **Contact form** → `frontend/app/contact/page.js` + `backend/app/routers/contact.py`.
- **Reviews** → `frontend/app/recenzii/page.js` + `backend/app/routers/reviews.py`.
