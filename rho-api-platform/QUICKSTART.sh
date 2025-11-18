#!/bin/bash

# Rho QuickStart Script
# This script helps you set up Rho with minimal configuration

echo "🚀 Welcome to Rho - API Comparison Platform"
echo "============================================="
echo ""
echo "This script will help you get started with Rho"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << 'EOF'
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OpenAI Configuration (Optional)
OPENAI_API_KEY=

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    
    echo "📝 Created .env.local"
    echo "⚠️  Please fill in your configuration values (see SETUP.md for instructions)"
    echo ""
fi

# Option to start dev server
echo "Ready to start? Choose an option:"
echo ""
echo "1) Start development server (npm run dev)"
echo "2) Build for production (npm run build)"
echo "3) Open documentation"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting development server..."
        echo "📱 Open http://localhost:3000 in your browser"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🔨 Building for production..."
        npm run build
        ;;
    3)
        echo ""
        echo "📖 Documentation:"
        echo "  - Setup: cat SETUP.md"
        echo "  - Deployment: cat DEPLOYMENT.md"
        echo "  - Summary: cat PROJECT_SUMMARY.md"
        echo "  - README: cat README.md"
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

