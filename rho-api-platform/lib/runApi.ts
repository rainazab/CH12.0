// Rate limiting: 1 request per user per tab per day
const RATE_LIMIT_KEY = 'rho_comparison_requests';
const RATE_LIMIT_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface RateLimitData {
  count: number;
  lastReset: number;
}

function getRateLimitKey(userId?: string): string {
  // Use a combination of user ID and tab identifier
  const tabId = typeof window !== 'undefined' ? window.location.href : 'server';
  return `${RATE_LIMIT_KEY}_${userId || 'anonymous'}_${tabId}`;
}

function checkRateLimit(userId?: string): boolean {
  if (typeof window === 'undefined') return true; // Server-side, allow

  const key = getRateLimitKey(userId);
  const stored = localStorage.getItem(key);

  if (!stored) return true; // No previous requests

  const data: RateLimitData = JSON.parse(stored);
  const now = Date.now();

  // Reset if 24 hours have passed
  if (now - data.lastReset > RATE_LIMIT_DURATION) {
    localStorage.removeItem(key);
    return true;
  }

  // Check if under limit (1 request per day)
  return data.count < 1;
}

function recordRateLimit(userId?: string): void {
  if (typeof window === 'undefined') return;

  const key = getRateLimitKey(userId);
  const now = Date.now();
  const stored = localStorage.getItem(key);

  if (stored) {
    const data: RateLimitData = JSON.parse(stored);
    data.count += 1;
    localStorage.setItem(key, JSON.stringify(data));
  } else {
    localStorage.setItem(key, JSON.stringify({
      count: 1,
      lastReset: now
    }));
  }
}

export async function runApi(apiId: string, input: string, userId?: string): Promise<{
  output: string;
  latency: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    // Check rate limit before making any API calls
    if (!checkRateLimit(userId)) {
      return {
        output: '',
        latency: Date.now() - startTime,
        error: 'Rate limit exceeded. You can make 1 comparison per day per tab.',
      };
    }

    // Use OpenAI to generate mock responses for different APIs
    const result = await generateMockResponse(apiId, input);

    // Record the rate limit after successful API call
    recordRateLimit(userId);

    return {
      output: JSON.stringify(result),
      latency: Date.now() - startTime,
    };
  } catch (error: any) {
    return {
      output: '',
      latency: Date.now() - startTime,
      error: error.message,
    };
  }
}

// Use OpenAI to generate realistic mock responses for different APIs
async function generateMockResponse(apiId: string, input: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  // Create prompts for different API types
  const apiPrompts = {
    dalle3: `Generate a realistic DALL·E 3 API response for the prompt: "${input}". Return valid JSON that matches OpenAI's DALL·E API format.`,
    gpt4o: `Generate a realistic GPT-4 API response for the prompt: "${input}". Return valid JSON that matches OpenAI's chat completions format with a helpful, creative response.`,
    claude3: `Generate a realistic Claude 3 API response for the prompt: "${input}". Return valid JSON that matches Anthropic's messages API format with a thoughtful, detailed response.`,
    gemini: `Generate a realistic Gemini API response for the prompt: "${input}". Return valid JSON that matches Google's Gemini API format with an innovative response.`,
    elevenlabs: `Generate a realistic ElevenLabs API response for the text: "${input}". Return valid JSON that matches ElevenLabs text-to-speech API format.`,
    midjourney: `Generate a realistic Midjourney API response for the prompt: "${input}". Return valid JSON that matches Midjourney's API format.`,
  };

  const systemPrompt = apiPrompts[apiId as keyof typeof apiPrompts] || `Generate a realistic API response for "${input}"`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: input
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const generatedContent = data.choices[0]?.message?.content || 'No response generated';

    // Format the response based on the API type
    switch (apiId) {
      case 'dalle3':
        return {
          model: 'dall-e-3',
          created: Math.floor(Date.now() / 1000),
          data: [
            {
              url: `https://via.placeholder.com/1024x1024?text=${encodeURIComponent(generatedContent.substring(0, 50))}`,
            },
          ],
        };

      case 'gpt4o':
        return {
          model: 'gpt-4-omni',
          choices: [
            {
              message: {
                content: generatedContent,
              },
            },
          ],
        };

      case 'claude3':
        return {
          content: [
            {
              text: generatedContent,
            },
          ],
        };

      case 'gemini':
        return {
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: generatedContent,
                  },
                ],
              },
            },
          ],
        };

      case 'elevenlabs':
        return {
          audio_base64: 'mock_audio_data_' + Math.random().toString(36).substring(7),
          duration_ms: Math.floor(Math.random() * 3000) + 2000,
        };

      case 'midjourney':
        return {
          taskId: Math.random().toString(36).substring(7),
          status: 'finished',
          imageUrl: `https://via.placeholder.com/1024x1024?text=${encodeURIComponent(generatedContent.substring(0, 30))}`,
        };

      default:
        return {
          response: generatedContent,
        };
    }
  } catch (error) {
    // Fallback mock responses if OpenAI fails
    console.error('OpenAI generation failed, using fallback:', error);

    switch (apiId) {
      case 'dalle3':
        return {
          model: 'dall-e-3',
          created: Math.floor(Date.now() / 1000),
          data: [{ url: 'https://via.placeholder.com/1024x1024?text=Generated+Image' }],
        };

      case 'gpt4o':
        return {
          model: 'gpt-4-omni',
          choices: [{ message: { content: `Here's a response to: "${input}". This is a simulated API response.` } }],
        };

      case 'claude3':
        return {
          content: [{ text: `Claude 3 Opus response: ${input}. This demonstrates thoughtful, detailed analysis.` }],
        };

      case 'gemini':
        return {
          candidates: [{ content: { parts: [{ text: `Gemini response: ${input}. Innovative and comprehensive.` }] } }],
        };

      case 'elevenlabs':
        return { audio_base64: 'fallback_audio_data', duration_ms: 2500 };

      case 'midjourney':
        return { taskId: 'fallback_task', status: 'finished', imageUrl: 'https://via.placeholder.com/1024x1024?text=Artistic+Image' };

      default:
        return { response: 'API simulation completed' };
    }
  }
}

export async function runComparison(
  prompt: string,
  apiIds: string[],
  userId?: string
): Promise<Record<string, any>> {
  const results: Record<string, any> = {};

  for (const apiId of apiIds) {
    results[apiId] = await runApi(apiId, prompt, userId);
  }

  return results;
}

