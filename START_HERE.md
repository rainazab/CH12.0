# 🎉 Welcome to Rho!

Your complete API comparison platform is ready.

## ⚡ Quick Start (5 minutes)

```bash
# Navigate to the project
cd /Users/rainazabasajja/Desktop/CH12.0/rho-api-platform

# Automated setup
bash QUICKSTART.sh

# Or manual setup
npm install
npm run dev

# Open in browser
# → http://localhost:3000
```

## 📚 Documentation (Read in Order)

1. **[INDEX.md](./INDEX.md)** ← Start here for overview
2. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** ← Complete guide
3. **[rho-api-platform/SETUP.md](./rho-api-platform/SETUP.md)** ← Step-by-step setup
4. **[rho-api-platform/README.md](./rho-api-platform/README.md)** ← Full documentation

## 🚀 What You Have

✅ **Complete Next.js 14 Application**
- Landing page with search
- API comparison interface
- Pricing page (Stripe integration)
- User authentication (Firebase)

✅ **Production Ready**
- Docker containerized
- Fly.io deployment config
- Type-safe TypeScript
- Modern Tailwind UI

✅ **6 APIs Pre-Configured**
- DALL·E 3, Midjourney
- GPT-4, Claude 3
- ElevenLabs TTS
- Stripe Payments

✅ **Full Documentation**
- Setup guide
- Deployment instructions
- Troubleshooting help
- API reference

## 📋 Setup Steps

### Step 1: Get Credentials (10 min)

**Firebase:**
1. Create project at https://console.firebase.google.com
2. Enable Auth (Google + Email/Password)
3. Create Firestore database
4. Copy credentials

**Stripe:**
1. Create account at https://stripe.com
2. Get API keys from Dashboard
3. Create price object ($10/month)
4. Set up webhook

### Step 2: Configure App (5 min)

Create `.env.local` in `rho-api-platform/`:

```env
# Firebase (from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe (from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Run Locally (2 min)

```bash
cd rho-api-platform
npm install
npm run dev
```

Open: http://localhost:3000

### Step 4: Deploy to Fly.io (5 min)

```bash
# Install Fly CLI
brew install flyctl

# Login
flyctl auth login

# Deploy
flyctl launch
flyctl deploy
```

## 📁 Project Structure

```
rho-api-platform/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utilities (Firebase, Stripe)
├── data/apis.json          # API catalog
├── Dockerfile              # Container config
├── fly.toml                # Fly.io config
└── [config files]          # TypeScript, Tailwind, etc.
```

## 🎯 Key Files

| File | What It Does |
|------|--------------|
| `app/page.tsx` | Landing page |
| `app/compare/page.tsx` | Main comparison feature |
| `app/pricing/page.tsx` | Pricing & Stripe |
| `app/auth/signin/page.tsx` | Firebase login |
| `app/api/compare/route.ts` | API comparison logic |
| `lib/firebase.ts` | Firebase setup |
| `lib/stripe.ts` | Stripe utilities |

## 🔑 API Endpoints

```
POST /api/compare
  Compares multiple APIs with a prompt
  
POST /api/create-checkout-session
  Creates Stripe checkout for subscriptions
  
POST /api/stripe/webhook
  Handles Stripe payment events
  
GET /api/health
  Health check endpoint
```

## 📊 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: Firebase Authentication
- **Database**: Firestore
- **Payments**: Stripe
- **Deployment**: Fly.io + Docker

## 🎯 Features

**For Users:**
- Sign in with Google or email
- Search for APIs
- Select up to 3 APIs to compare
- Run side-by-side comparisons
- View performance metrics
- Subscribe to Pro plan

**For Developers:**
- Easy to customize
- Well-documented code
- Type-safe TypeScript
- Mock API responses (works without keys)
- Production deployment ready

## ⚙️ Configuration Checklist

- [ ] Firebase project created
- [ ] Firebase Auth enabled
- [ ] Firestore database created
- [ ] Stripe account created
- [ ] Stripe webhook set up
- [ ] `.env.local` configured
- [ ] `npm install` completed
- [ ] Local dev server running
- [ ] App tested locally
- [ ] Fly.io app created
- [ ] App deployed
- [ ] Stripe webhook updated for production

## 🚨 Troubleshooting

**Firebase connection issues?**
- Double-check credentials in `.env.local`
- Verify Firebase project is active
- Ensure all required fields are set

**Stripe checkout not working?**
- Verify price ID exists
- Check webhook secret is correct
- Use Stripe test credentials locally

**Can't sign in?**
- Ensure Google OAuth is enabled in Firebase
- Clear browser cookies
- Check console for errors

**See**: `rho-api-platform/SETUP.md` for detailed help

## 📞 Support

1. **Local Issues**: Check `rho-api-platform/SETUP.md` troubleshooting
2. **Deployment**: Read `rho-api-platform/DEPLOYMENT.md`
3. **Firebase Help**: https://firebase.google.com/support
4. **Stripe Help**: https://support.stripe.com
5. **Fly.io Help**: https://community.fly.io

## 🎓 Learning Path

1. Read `INDEX.md` - Understand what you have
2. Follow `SETUP.md` - Get it running locally
3. Explore code - See how it works
4. Read `DEPLOYMENT.md` - Deploy to production
5. Customize - Add your own features

## 💡 Next Steps After Setup

1. **Test Locally** (5 min)
   - Create test account
   - Try comparing APIs
   - Test Stripe in test mode

2. **Deploy to Production** (10 min)
   - Set up Fly.io
   - Configure secrets
   - Deploy app

3. **Customize** (30+ min)
   - Update colors/branding
   - Add real API integrations
   - Set up custom domain

4. **Scale** (ongoing)
   - Monitor performance
   - Add more APIs
   - Collect user feedback

## 📈 Scaling Tips

- Start with Fly.io free tier
- Add monitoring (Sentry)
- Implement caching
- Scale to multiple VMs if needed
- Consider adding Redis for performance

## 🎉 You're Ready!

```bash
cd /Users/rainazabasajja/Desktop/CH12.0/rho-api-platform
bash QUICKSTART.sh
```

**Then read `INDEX.md` for the complete overview.**

---

## 👥 Team

Built at CalHacks 12.0 (November 2025) by:
- Raina Zab - [LinkedIn](https://linkedin.com/in/rainazab) | [Website](https://rainazab.com)
- Matilda Verdejo - [LinkedIn](https://linkedin.com/in/matildaverdejo)
- Maria Fernanda Palacios - [LinkedIn](https://linkedin.com/in/maria-fernanda-palacios)
- Sarah Hoang - [LinkedIn](https://linkedin.com/in/sarah-hoang-compsci)

---

**Built with ❤️ for comparing APIs**

Let's ship! 🚀

