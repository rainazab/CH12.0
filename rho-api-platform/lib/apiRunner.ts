/**
 * Real API Integration Service
 * Handles actual API calls to various providers
 */

interface APIResult {
  success: boolean;
  output: string;
  latency: number;
  error?: string;
  cost?: number;
}

// OpenAI APIs
async function callOpenAI(apiType: string, prompt: string): Promise<APIResult> {
  const startTime = Date.now();
  
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        output: '',
        latency: 0,
        error: 'OpenAI API key not configured',
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: apiType === 'gpt4' ? 'gpt-4' : 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const latency = Date.now() - startTime;

    if (data.error) {
      return {
        success: false,
        output: '',
        latency,
        error: data.error.message,
      };
    }

    return {
      success: true,
      output: data.choices[0]?.message?.content || 'No output received',
      latency,
      cost: 0.01, // Approximate cost
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    return {
      success: false,
      output: '',
      latency,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Anthropic Claude
async function callClaude(prompt: string): Promise<APIResult> {
  const startTime = Date.now();
  
  try {
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        output: '',
        latency: 0,
        error: 'Anthropic API key not configured',
      };
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const latency = Date.now() - startTime;

    if (data.error) {
      return {
        success: false,
        output: '',
        latency,
        error: data.error.message,
      };
    }

    return {
      success: true,
      output: data.content[0]?.text || 'No output received',
      latency,
      cost: 0.015,
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    return {
      success: false,
      output: '',
      latency,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Google Gemini
async function callGemini(prompt: string): Promise<APIResult> {
  const startTime = Date.now();
  
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      return {
        success: false,
        output: '',
        latency: 0,
        error: 'Google API key not configured',
      };
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const latency = Date.now() - startTime;

    if (data.error) {
      return {
        success: false,
        output: '',
        latency,
        error: data.error.message,
      };
    }

    return {
      success: true,
      output: data.candidates[0]?.content?.parts[0]?.text || 'No output received',
      latency,
      cost: 0.0005,
    };
  } catch (error) {
    const latency = Date.now() - startTime;
    return {
      success: false,
      output: '',
      latency,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Main function to run APIs
export async function runAPIs(
  apiIds: string[],
  prompt: string
): Promise<Record<string, APIResult>> {
  const results: Record<string, APIResult> = {};

  // Run in parallel for speed
  const promises = apiIds.map(async (apiId) => {
    let result: APIResult;

    switch (apiId) {
      case 'gpt4o':
        result = await callOpenAI('gpt4', prompt);
        break;
      case 'gpt35':
        result = await callOpenAI('gpt35', prompt);
        break;
      case 'claude3':
        result = await callClaude(prompt);
        break;
      case 'gemini':
        result = await callGemini(prompt);
        break;
      default:
        result = {
          success: false,
          output: '',
          latency: 0,
          error: `API ${apiId} not supported`,
        };
    }

    return { apiId, result };
  });

  const resultsArray = await Promise.all(promises);
  resultsArray.forEach(({ apiId, result }) => {
    results[apiId] = result;
  });

  return results;
}

// Get available APIs (based on configured API keys)
export async function getAvailableAPIs(): Promise<string[]> {
  const available: string[] = [];

  // Check which API keys are configured
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY) {
    available.push('gpt4o', 'gpt35');
  }
  if (process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY) {
    available.push('claude3');
  }
  if (process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY) {
    available.push('gemini');
  }

  return available;
}

