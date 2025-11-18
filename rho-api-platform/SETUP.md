# Rho Setup Guide

## Quick Start

This guide will walk you through setting up Rho from scratch.

## Step 1: Clone the Repository

```bash
cd /Users/rainazabasajja/Desktop/CH12.0
cd rho-api-platform
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Firebase Setup (5 minutes)

### Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "rho-platform" (or your preference)
4. Enable Google Analytics (optional)
5. Click "Create project"

### Enable Authentication

1. Go to Build → Authentication
2. Click "Get started"
3. Enable these providers:
   - **Google** - Click Google, enable it, select your email
   - **Email/Password** - Click Email/Password, enable it

### Get Firebase Credentials

1. Go to Project Settings (gear icon)
2. Copy these values:
   - apiKey → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - authDomain → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - projectId → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - storageBucket → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - messagingSenderId → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - appId → `NEXT_PUBLIC_FIREBASE_APP_ID`

### Create Firestore Database

1. Go to Build → Firestore Database
2. Click "Create database"
3. Start in test mode (production rules below)
4. Choose region (us-central1 recommended)

**Production Rules** (use after testing):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      match /subscription/{document=**} {
        allow read, write: if request.auth.uid == uid;
      }
    }
  }
}
```

## Step 4: Stripe Setup (5 minutes)

### Create Stripe Account

1. Go to https://stripe.com
2. Sign up for an account
3. Verify your email

### Get API Keys

1. Go to Dashboard → API keys
2. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

### Create Price Object

1. Go to Products → Create product
2. Name: "Rho Pro Monthly"
3. Add price: $10/month (recurring)
4. Copy price ID → `price_pro_monthly` or similar
5. Update the pricing page code with your price ID

### Set Up Webhook

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. For local testing, use: https://your-local-url/api/stripe/webhook
   - Or use Stripe CLI for local testing
4. Select events:
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
5. Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

## Step 5: Environment Variables

Create `.env.local` in the project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=rho-platform.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=rho-platform
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=rho-platform.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI (Optional - for real API calls)
OPENAI_API_KEY=sk_...

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### Test the App

1. Click "Start Comparing"
2. Try signing in with Google or Email
3. Select some APIs
4. Enter a prompt
5. Click "Compare APIs"
6. You should see mock results

### Test Stripe Checkout

For local Stripe testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Start webhook listener
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy webhook signing secret and add to .env.local
```

Then go to /pricing and click "Subscribe"

## Step 7: Deploy to Fly.io

### Install Fly CLI

```bash
brew install flyctl
```

### Create Fly App

```bash
flyctl auth login
flyctl launch
```

Answer the questions:
- App name: `rho-api-platform`
- Region: `sjc` (or closest to you)

### Set Environment Variables

```bash
flyctl secrets set \
  NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD... \
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=... \
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=... \
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=... \
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=... \
  NEXT_PUBLIC_FIREBASE_APP_ID=... \
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_... \
  STRIPE_SECRET_KEY=sk_... \
  STRIPE_WEBHOOK_SECRET=whsec_... \
  OPENAI_API_KEY=sk_... \
  NEXT_PUBLIC_APP_URL=https://your-app.fly.dev
```

### Deploy

```bash
flyctl deploy
```

### Update Stripe Webhook

1. Go to Stripe Dashboard → Webhooks
2. Update webhook endpoint to: `https://your-app.fly.dev/api/stripe/webhook`

## Troubleshooting

### Firebase connection fails

- Check your credentials in `.env.local`
- Ensure Firebase project is active in console
- Verify firebaseapp.com URL matches

### Stripe webhook doesn't work

- Use Stripe CLI for local testing
- For Fly.io, ensure endpoint is https:// and publicly accessible
- Check Stripe logs for errors

### Can't sign in

- Ensure Google OAuth is enabled in Firebase
- Check CORS settings if using external domain
- Clear browser cookies and try again

### API comparison returns mock data

- Mock endpoints are intentional for this demo
- To use real APIs, add your API keys and implement endpoints
- OpenAI: Add `OPENAI_API_KEY` and uncomment real calls in `/lib/runApi.ts`

## Next Steps

1. **Add Real API Integrations**
   - Implement actual calls to DALL·E, GPT-4, etc.
   - Add your API keys to environment variables

2. **Customize Branding**
   - Update logo and colors
   - Modify copy and messaging
   - Add custom domain

3. **Add More Features**
   - User dashboards
   - Saved comparisons
   - API recommendations
   - Advanced analytics

4. **Scale Infrastructure**
   - Add caching layer (Redis)
   - Implement rate limiting
   - Set up monitoring (Sentry, LogRocket)

## Support

- **Docs**: See README.md
- **Fly.io Docs**: https://fly.io/docs/
- **Firebase Docs**: https://firebase.google.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs

## Team

Built at CalHacks 12.0 by Raina, Matilda, Fernanda, and Sarah

Good luck! 🚀

