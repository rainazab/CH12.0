# Rho - API Comparison Platform

Rho is a modern full-stack web application built with Next.js 14 that allows users to visually compare APIs side-by-side and see how they respond to the same prompts.

**Built by 4 developers at CalHacks 12.0 in 2025**

## Features

- 🎨 **Visual API Comparison** - Compare up to 3 APIs simultaneously
- ⚡ **Real-time Results** - See API outputs, latency, and performance metrics
- 🔐 **Firebase Authentication** - Secure Google & email-based login
- 💳 **Stripe Subscriptions** - Free and Pro plans with flexible pricing
- 📊 **Performance Tracking** - Monitor API latency, uptime, and costs
- 🚀 **Production Ready** - Deployed on Fly.io with Docker

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Payments**: Stripe
- **Deployment**: Fly.io (Docker)
- **AI**: OpenAI API for recommendations

## Project Structure

```
rho-api-platform/
├── app/
│   ├── api/                    # API routes
│   │   ├── compare/           # API comparison endpoint
│   │   ├── create-checkout-session/
│   │   ├── stripe/webhook/
│   │   └── health/
│   ├── auth/
│   │   └── signin/            # Firebase Auth page
│   ├── compare/               # Comparison page
│   ├── pricing/               # Pricing page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css
├── components/                # Reusable React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ApiCard.tsx
│   └── CompareOutputPanel.tsx
├── lib/                       # Utilities & configurations
│   ├── firebase.ts            # Firebase setup
│   ├── stripe.ts              # Stripe utilities
│   └── runApi.ts              # API execution logic
├── data/
│   └── apis.json              # Seed API list
├── Dockerfile                 # Container configuration
├── fly.toml                   # Fly.io configuration
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Stripe account
- OpenAI API key (optional)

### 1. Clone & Install

```bash
cd rho-api-platform
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Google & Email/Password)
4. Enable Firestore Database
5. Get your credentials from Project Settings

### 3. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create two price objects:
   - `price_pro_monthly` - $10/month subscription
3. Get your API keys from Settings

### 4. Environment Variables

Create `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# OpenAI (Optional)
OPENAI_API_KEY=sk_your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Local Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### 6. Deploy to Fly.io

```bash
# Install Fly CLI
brew install flyctl

# Login to Fly
flyctl auth login

# Deploy
flyctl launch  # Follow prompts
flyctl deploy
```

Set environment variables on Fly:

```bash
flyctl secrets set STRIPE_SECRET_KEY=your_key
flyctl secrets set STRIPE_WEBHOOK_SECRET=your_secret
# ... set other secrets
```

## API Endpoints

### `POST /api/compare`

Compare multiple APIs with a prompt.

**Request:**
```json
{
  "prompt": "Generate an image of a sunset",
  "apis": ["dalle3", "gpt4o"]
}
```

**Response:**
```json
{
  "dalle3": {
    "output": "...",
    "latency": 1243
  },
  "gpt4o": {
    "output": "...",
    "latency": 832
  }
}
```

### `POST /api/create-checkout-session`

Create a Stripe checkout session for subscription.

**Request:**
```json
{
  "userId": "firebase_uid",
  "priceId": "price_pro_monthly",
  "email": "user@example.com"
}
```

### `POST /api/stripe/webhook`

Stripe webhook handler for subscription events.

## Available APIs

The platform includes integrations for:

- **DALL·E 3** (Image Generation) - $0.08/image
- **Midjourney** (Image Generation) - $0.04/image
- **GPT-4 Omni** (LLM) - $0.005/1k tokens
- **Claude 3** (LLM) - $0.015/1k tokens
- **ElevenLabs TTS** (Text-to-Speech) - $0.30/1M chars
- **Stripe API** (Payments) - 2.9% + $0.30

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 1 comparison/day, 2 APIs max |
| Pro | $10/mo | Unlimited comparisons, 3 APIs max |
| Enterprise | Custom | Full features, dedicated support |

## Contributing

Built at CalHacks 12.0 by:
- [Raina Zab](https://www.linkedin.com/in/rainazab) - [Website](https://www.rainazab.com)
- [Matilda Verdejo](https://www.linkedin.com/in/matildaverdejo/)
- [Maria Fernanda Palacios](https://www.linkedin.com/in/maria-fernanda-palacios/)
- [Sarah Hoang](https://www.linkedin.com/in/sarah-hoang-compsci/)

## License

MIT License - feel free to use this for your own projects!

## Support

- Email: support@rhoapi.com
- Issues: GitHub Issues
- Documentation: In-app help guides

---

**Made with ❤️ at CalHacks 12.0**

