import { NextRequest, NextResponse } from 'next/server';
import { runAPIs } from '@/lib/apiRunner';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, apis } = body;

    if (!prompt || !apis || !Array.isArray(apis)) {
      return NextResponse.json(
        { error: 'Missing prompt or apis array' },
        { status: 400 }
      );
    }

    // Check if all required API keys are configured
    const missingKeys = [];
    for (const apiId of apis) {
      switch (apiId) {
        case 'gpt4o':
        case 'gpt35':
          if (!process.env.OPENAI_API_KEY) {
            missingKeys.push('OpenAI');
          }
          break;
        case 'claude3':
          if (!process.env.ANTHROPIC_API_KEY) {
            missingKeys.push('Anthropic');
          }
          break;
        case 'gemini':
          if (!process.env.GOOGLE_API_KEY) {
            missingKeys.push('Google');
          }
          break;
      }
    }

    if (missingKeys.length > 0) {
      return NextResponse.json(
        {
          error: `Missing API keys for: ${[...new Set(missingKeys)].join(', ')}. Please configure them in environment variables.`,
        },
        { status: 400 }
      );
    }

    // Run the APIs
    const results = await runAPIs(apis, prompt);

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to run APIs' },
      { status: 500 }
    );
  }
}

