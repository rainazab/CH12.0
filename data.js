// Static API Data for StackFinder
const apiDatabase = {
    // Text Generation APIs
    'chatgpt': {
        name: 'ChatGPT API',
        provider: 'OpenAI',
        icon: '🧠',
        logo: 'openai',
        category: 'text-generation',
        inputTypes: ['text', 'code'],
        outputTypes: ['text', 'json'],
        pricingModel: 'pay-per-use',
        description: 'Advanced language model for text generation and conversation',
        baseUrl: 'https://api.openai.com/v1/chat/completions',
        pricing: {
            'gpt-3.5-turbo': {
                input: 0.0015, // per 1K tokens
                output: 0.002, // per 1K tokens
                context: 4096
            },
            'gpt-4': {
                input: 0.03,
                output: 0.06,
                context: 8192
            },
            'gpt-4-turbo': {
                input: 0.01,
                output: 0.03,
                context: 128000
            }
        },
        features: [
            'Text generation',
            'Conversational AI',
            'Code generation',
            'Text analysis',
            'Multi-language support',
            'Function calling',
            'JSON mode',
            'Streaming responses'
        ],
        pros: [
            'High quality responses',
            'Large context window',
            'Fast inference',
            'Extensive documentation',
            'Active community'
        ],
        cons: [
            'Rate limiting',
            'Moderation filters',
            'Higher costs for GPT-4',
            'Usage caps'
        ],
        useCases: [
            'Chatbots',
            'Content creation',
            'Code assistance',
            'Text summarization',
            'Language translation'
        ],
        popularity: 95,
        reliability: 98,
        easeOfUse: 90,
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://platform.openai.com/docs',
        tags: ['AI', 'NLP', 'Chat', 'Code', 'Enterprise']
    },

    'claude': {
        name: 'Claude API',
        provider: 'Anthropic',
        icon: '🧠',
        logo: 'anthropic',
        category: 'multimodal',
        inputTypes: ['text', 'image'],
        outputTypes: ['text', 'json'],
        pricingModel: 'pay-per-use',
        description: 'Constitutional AI for safe and helpful text generation',
        baseUrl: 'https://api.anthropic.com/v1/messages',
        pricing: {
            'claude-3-haiku': {
                input: 0.00025,
                output: 0.00125,
                context: 200000
            },
            'claude-3-sonnet': {
                input: 0.003,
                output: 0.015,
                context: 200000
            },
            'claude-3-opus': {
                input: 0.015,
                output: 0.075,
                context: 200000
            }
        },
        features: [
            'Text generation',
            'Constitutional AI safety',
            'Large context window',
            'Vision capabilities',
            'Code generation',
            'Multi-modal inputs',
            'Tool use',
            'Streaming responses'
        ],
        pros: [
            'Safety-first approach',
            'Very large context window',
            'Vision capabilities',
            'Strong reasoning',
            'Tool integration'
        ],
        cons: [
            'Newer API (less mature)',
            'Limited community resources',
            'Higher latency',
            'Fewer model options'
        ],
        useCases: [
            'Safe AI assistants',
            'Document analysis',
            'Research assistance',
            'Educational tools',
            'Content moderation'
        ],
        popularity: 75,
        reliability: 92,
        easeOfUse: 85,
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://docs.anthropic.com',
        tags: ['AI', 'Safety', 'Vision', 'Enterprise', 'Constitutional']
    },

    'gemini': {
        name: 'Gemini API',
        provider: 'Google',
        icon: '🤖',
        logo: 'google',
        category: 'multimodal',
        inputTypes: ['text', 'image'],
        outputTypes: ['text', 'json'],
        pricingModel: 'pay-per-use',
        description: 'Google\'s multimodal AI for text and vision tasks',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
        pricing: {
            'gemini-pro': {
                input: 0.0005,
                output: 0.0015,
                context: 32768
            },
            'gemini-pro-vision': {
                input: 0.0005,
                output: 0.0015,
                context: 16384
            }
        },
        features: [
            'Text generation',
            'Vision understanding',
            'Code generation',
            'Multi-modal',
            'Function calling',
            'Safety filters',
            'Enterprise security'
        ],
        pros: [
            'Google infrastructure',
            'Vision capabilities',
            'Enterprise features',
            'Good documentation',
            'Reliable uptime'
        ],
        cons: [
            'Limited context window',
            'Fewer model variants',
            'Complex setup',
            'Regional restrictions'
        ],
        useCases: [
            'Visual AI applications',
            'Enterprise chatbots',
            'Document processing',
            'Image analysis',
            'Business intelligence'
        ],
        popularity: 70,
        reliability: 95,
        easeOfUse: 80,
        freeTier: true,
        enterpriseReady: true,
        documentation: 'https://ai.google.dev',
        tags: ['AI', 'Vision', 'Enterprise', 'Google', 'Multimodal']
    },

    // Image Generation APIs
    'dalle': {
        name: 'DALL-E API',
        provider: 'OpenAI',
        icon: '🎨',
        logo: 'openai',
        category: 'image-generation',
        inputTypes: ['text'],
        outputTypes: ['image'],
        pricingModel: 'pay-per-use',
        description: 'AI image generation from text descriptions',
        baseUrl: 'https://api.openai.com/v1/images/generations',
        pricing: {
            'dall-e-3-standard': {
                cost: 0.04, // per image
                resolution: '1024x1024'
            },
            'dall-e-3-hd': {
                cost: 0.08,
                resolution: '1024x1024'
            },
            'dall-e-2': {
                cost: 0.02,
                resolution: '1024x1024'
            }
        },
        features: [
            'Text-to-image',
            'Image variations',
            'High quality output',
            'Style variations',
            'Multiple resolutions'
        ],
        pros: [
            'High quality images',
            'Easy to use',
            'Good documentation',
            'Multiple styles',
            'Commercial usage'
        ],
        cons: [
            'Usage restrictions',
            'Content policies',
            'Higher costs',
            'Rate limits'
        ],
        useCases: [
            'Art generation',
            'Marketing materials',
            'Product visualization',
            'Social media content',
            'Design prototyping'
        ],
        popularity: 90,
        reliability: 96,
        easeOfUse: 95,
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://platform.openai.com/docs/guides/images',
        tags: ['AI', 'Images', 'Creative', 'Art', 'DALL-E']
    },

    'midjourney': {
        name: 'Midjourney API',
        provider: 'Midjourney',
        icon: '🎨',
        logo: 'midjourney',
        category: 'image-generation',
        inputTypes: ['text'],
        outputTypes: ['image'],
        pricingModel: 'subscription',
        description: 'Professional-grade AI image generation',
        baseUrl: 'https://api.midjourney.com/v1/imagine',
        pricing: {
            'basic': {
                cost: 0.08, // per image
                jobs: 200
            },
            'standard': {
                cost: 0.06,
                jobs: 1000
            },
            'pro': {
                cost: 0.05,
                jobs: 3000
            }
        },
        features: [
            'High-quality images',
            'Artistic styles',
            'Upscaling',
            'Variations',
            'Commercial usage'
        ],
        pros: [
            'Artistic quality',
            'Professional results',
            'Style consistency',
            'Community features'
        ],
        cons: [
            'Discord-based interface',
            'Slower generation',
            'Limited API access',
            'Higher costs'
        ],
        useCases: [
            'Professional art',
            'Brand assets',
            'Concept design',
            'Creative projects'
        ],
        popularity: 85,
        reliability: 88,
        easeOfUse: 75,
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://docs.midjourney.com',
        tags: ['AI', 'Art', 'Professional', 'Creative', 'Design']
    },

    // Speech APIs
    'whisper': {
        name: 'Whisper API',
        provider: 'OpenAI',
        icon: '🎤',
        logo: 'openai',
        category: 'speech-to-text',
        inputTypes: ['audio'],
        outputTypes: ['text', 'json'],
        pricingModel: 'pay-per-use',
        description: 'Advanced speech recognition and transcription',
        baseUrl: 'https://api.openai.com/v1/audio/transcriptions',
        pricing: {
            'whisper-1': {
                cost: 0.006 // per minute
            }
        },
        features: [
            'Speech-to-text',
            'Multiple languages',
            'High accuracy',
            'Timestamp support',
            'Multiple formats'
        ],
        pros: [
            'High accuracy',
            'Multi-language',
            'Good documentation',
            'Easy integration'
        ],
        cons: [
            'File size limits',
            'Processing time',
            'Costs add up'
        ],
        useCases: [
            'Transcription services',
            'Voice assistants',
            'Meeting notes',
            'Accessibility tools',
            'Media processing'
        ],
        popularity: 88,
        reliability: 94,
        easeOfUse: 92,
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://platform.openai.com/docs/guides/speech-to-text',
        tags: ['AI', 'Audio', 'Speech', 'Transcription', 'Accessibility']
    },

    'elevenlabs': {
        name: 'ElevenLabs API',
        provider: 'ElevenLabs',
        icon: '🗣️',
        logo: 'elevenlabs',
        category: 'text-to-speech',
        inputTypes: ['text'],
        outputTypes: ['audio'],
        pricingModel: 'pay-per-use',
        description: 'Natural-sounding text-to-speech synthesis',
        baseUrl: 'https://api.elevenlabs.io/v1/text-to-speech',
        pricing: {
            'starter': {
                cost: 0.18, // per 1K characters
                voices: 10
            },
            'creator': {
                cost: 0.15,
                voices: 30
            },
            'pro': {
                cost: 0.12,
                voices: 100
            }
        },
        features: [
            'Text-to-speech',
            'Voice cloning',
            'Multiple voices',
            'Natural intonation',
            'Multiple languages'
        ],
        pros: [
            'Natural voices',
            'Voice cloning',
            'Good quality',
            'Easy API'
        ],
        cons: [
            'Higher costs',
            'Limited free tier',
            'Voice quality varies'
        ],
        useCases: [
            'Voice assistants',
            'Audiobook creation',
            'Accessibility',
            'Gaming characters',
            'IVR systems'
        ],
        popularity: 82,
        reliability: 90,
        easeOfUse: 88,
        freeTier: true,
        enterpriseReady: true,
        documentation: 'https://elevenlabs.io/docs',
        tags: ['AI', 'Audio', 'Voice', 'TTS', 'Accessibility']
    },

    // Code Generation APIs
    'copilot': {
        name: 'GitHub Copilot API',
        provider: 'GitHub',
        icon: '💻',
        logo: 'github',
        category: 'code-generation',
        inputTypes: ['text', 'code'],
        outputTypes: ['code', 'text'],
        pricingModel: 'subscription',
        description: 'AI-powered code completion and generation',
        baseUrl: 'https://api.github.com/copilot',
        pricing: {
            'individual': {
                cost: 10, // per month
                requests: 1000
            },
            'business': {
                cost: 19,
                requests: 5000
            },
            'enterprise': {
                cost: 39,
                requests: 10000
            }
        },
        features: [
            'Code completion',
            'Code generation',
            'Multiple languages',
            'Context awareness',
            'IDE integration'
        ],
        pros: [
            'Accurate suggestions',
            'Wide language support',
            'IDE integration',
            'GitHub integration'
        ],
        cons: [
            'Limited API access',
            'Privacy concerns',
            'Subscription model',
            'Limited customization'
        ],
        useCases: [
            'Code completion',
            'Boilerplate generation',
            'Learning programming',
            'Code review',
            'Team collaboration'
        ],
        popularity: 92,
        reliability: 94,
        easeOfUse: 85,
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://docs.github.com/en/copilot',
        tags: ['AI', 'Code', 'Development', 'GitHub', 'Programming']
    }
};

// Project type mappings to API recommendations
const projectMappings = {
    'chatbot': ['chatgpt', 'claude', 'gemini'],
    'text generation': ['chatgpt', 'claude', 'gemini'],
    'conversation': ['chatgpt', 'claude', 'gemini'],
    'image generation': ['dalle', 'midjourney'],
    'art': ['dalle', 'midjourney'],
    'visual': ['dalle', 'midjourney', 'gemini', 'claude'],
    'speech to text': ['whisper'],
    'transcription': ['whisper'],
    'text to speech': ['elevenlabs'],
    'voice': ['elevenlabs', 'whisper'],
    'code generation': ['copilot', 'chatgpt', 'claude'],
    'programming': ['copilot', 'chatgpt', 'claude'],
    'assistant': ['chatgpt', 'claude', 'gemini'],
    'ai assistant': ['chatgpt', 'claude', 'gemini'],
    'content creation': ['chatgpt', 'claude', 'dalle'],
    'writing': ['chatgpt', 'claude'],
    'analysis': ['chatgpt', 'claude', 'gemini'],
    'research': ['chatgpt', 'claude'],
    'education': ['chatgpt', 'claude', 'gemini'],
    'business': ['chatgpt', 'claude', 'gemini'],
    'enterprise': ['claude', 'gemini', 'chatgpt'],
    'creative': ['dalle', 'midjourney', 'chatgpt'],
    'design': ['dalle', 'midjourney'],
    'accessibility': ['whisper', 'elevenlabs'],
    'audio': ['whisper', 'elevenlabs'],
    'multimodal': ['claude', 'gemini'],
    'vision': ['claude', 'gemini']
};

// Enhanced filtering mappings
const filterMappings = {
    useCases: {
        'chatbot': ['chatbot', 'text-generation', 'multimodal'],
        'text-generation': ['text-generation', 'multimodal'],
        'image-generation': ['image-generation'],
        'speech-to-text': ['speech-to-text'],
        'text-to-speech': ['text-to-speech'],
        'code-generation': ['code-generation'],
        'multimodal': ['multimodal']
    },

    inputTypes: {
        'text': ['text'],
        'image': ['image'],
        'audio': ['audio'],
        'code': ['code'],
        'multimodal': ['text', 'image', 'audio', 'code']
    },

    outputTypes: {
        'text': ['text', 'json'],
        'image': ['image'],
        'audio': ['audio'],
        'code': ['code', 'text'],
        'json': ['json', 'text']
    },

    pricingModels: {
        'free': [], // APIs with free tier
        'pay-per-use': ['pay-per-use'],
        'subscription': ['subscription'],
        'enterprise': [] // Enterprise-focused APIs
    }
};

// Cost calculation helpers
function calculateMonthlyCost(apiKey, usage) {
    const api = apiDatabase[apiKey];
    if (!api) return 0;

    let totalCost = 0;

    if (api.category === 'text-generation' || api.category === 'speech-to-text') {
        // Token-based pricing
        const model = Object.keys(api.pricing)[0]; // Use first available model
        const pricing = api.pricing[model];

        if (usage.textInput) {
            totalCost += (usage.textInput / 1000) * pricing.input;
        }
        if (usage.textOutput) {
            totalCost += (usage.textOutput / 1000) * pricing.output;
        }
    } else if (api.category === 'image-generation') {
        // Image-based pricing
        const quality = Object.keys(api.pricing)[0];
        const pricing = api.pricing[quality];

        if (usage.images) {
            totalCost += usage.images * pricing.cost;
        }
    } else if (api.category === 'text-to-speech') {
        // Character-based pricing
        const tier = Object.keys(api.pricing)[0];
        const pricing = api.pricing[tier];

        if (usage.characters) {
            totalCost += (usage.characters / 1000) * pricing.cost;
        }
    } else if (api.category === 'code-generation') {
        // Subscription-based pricing
        const tier = Object.keys(api.pricing)[0];
        totalCost = api.pricing[tier].cost; // Monthly cost
    }

    return totalCost;
}

function getUsageEstimate(projectType) {
    const estimates = {
        'chatbot': {
            textInput: 100000,  // tokens per month
            textOutput: 200000,
            images: 0,
            characters: 0
        },
        'content creation': {
            textInput: 50000,
            textOutput: 150000,
            images: 50,
            characters: 0
        },
        'image generation': {
            textInput: 10000,
            textOutput: 20000,
            images: 200,
            characters: 0
        },
        'voice assistant': {
            textInput: 80000,
            textOutput: 100000,
            images: 0,
            characters: 500000
        },
        'code generation': {
            textInput: 200000,
            textOutput: 100000,
            images: 0,
            characters: 0
        }
    };

    return estimates[projectType] || {
        textInput: 50000,
        textOutput: 100000,
        images: 10,
        characters: 100000
    };
}
