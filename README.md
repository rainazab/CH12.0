# CalHacks12.0Baddies

### Problem Statement
The AI API ecosystem is crowded and constantly changing. Prices shift, features get deprecated, and performance evolves overnight. Developers waste time digging through docs and forums without a clear, historical view of how an API has performed. There's no reliable, data-driven way to compare APIs over time and make informed decisions.

---

### Solution Statement
Build a platform that aggregates and benchmarks AI APIs across cost, latency, accuracy, and scalability, while using an AI component to analyze each API's history and evolution. Developers can view trends like pricing changes, model improvements, and downtime frequency to choose APIs based on both current performance and long-term reliability.

---

### Tagline
**AI that compares AI — past, present, and future.**

## 🚀 API Atlas

A modern API comparison platform that helps developers find the perfect APIs for their projects. Built with a focus on beautiful design, powerful filtering, and data-driven decisions.

### ✨ Features

🎨 **Ultra-Colorful Design** - Vibrant gradients, smooth animations, and modern aesthetics
🔍 **Advanced Filtering** - Filter by use case, input/output types, pricing, and more
📊 **Comprehensive Comparisons** - Side-by-side API analysis with cost breakdowns
💰 **Real-Time Pricing** - Accurate monthly cost calculations based on usage
⚡ **Smart Recommendations** - AI-powered suggestions based on project requirements
📱 **Responsive Design** - Beautiful on all devices with smooth interactions

### 🌟 Supported APIs

#### **Text Generation & AI**
- **ChatGPT API** (OpenAI) - Advanced conversational AI with function calling
- **Claude API** (Anthropic) - Constitutional AI with vision capabilities
- **Gemini API** (Google) - Multimodal AI with enterprise security

#### **Image Generation**
- **DALL-E API** (OpenAI) - High-quality text-to-image generation
- **Midjourney API** - Professional artistic image creation

#### **Speech Processing**
- **Whisper API** (OpenAI) - Advanced speech-to-text transcription
- **ElevenLabs API** - Natural text-to-speech with voice cloning

#### **Code Generation**
- **GitHub Copilot API** - AI-powered code completion and generation

### 🛠 Technical Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Design**: Ultra-colorful gradients, glassmorphism effects, smooth animations
- **Filtering**: Advanced multi-criteria filtering with real-time updates
- **Data**: Enhanced JSON database with detailed API metadata

### 🚀 Quick Start

1. **Navigate to the project directory**: `cd api-atlas`
2. **Install dependencies**: `npm install`
3. **Start both frontend and backend**: `npm run start`
4. **Open browser**: Navigate to `http://localhost:5173`
5. **Explore**: Use the interface to discover and compare APIs!

### 📁 Project Structure

```
api-atlas/
├── backend/              # Node.js/Express server
│   ├── routes/          # API routes (search, performance, monitor)
│   ├── services/        # Business logic (chroma, elastic, scoring)
│   ├── data/           # Seed data
│   └── server.js       # Main backend server
├── src/                # React frontend source
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   ├── assets/        # Static assets
│   ├── App.jsx        # Main React app
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── package.json       # Frontend dependencies
├── vite.config.js     # Vite configuration
└── tailwind.config.js # Tailwind CSS configuration
```
