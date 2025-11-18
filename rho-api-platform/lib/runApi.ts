interface ApiConfig {
  id: string;
  endpoint: string;
  headers?: Record<string, string>;
  transform?: (data: any) => any;
}

const apiConfigs: Record<string, ApiConfig> = {
  dalle3: {
    id: 'dalle3',
    endpoint: 'https://api.openai.com/v1/images/generations',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  },
  gpt4o: {
    id: 'gpt4o',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  },
  elevenlabs: {
    id: 'elevenlabs',
    endpoint: 'https://api.elevenlabs.io/v1/text-to-speech',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
    },
  },
};

export async function runApi(apiId: string, input: string): Promise<{
  output: string;
  latency: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    const config = apiConfigs[apiId];

    if (!config) {
      return {
        output: '',
        latency: Date.now() - startTime,
        error: `API ${apiId} not configured`,
      };
    }

    let result;

    // Mock implementations for demo
    switch (apiId) {
      case 'dalle3':
        result = await mockDalle3(input);
        break;
      case 'gpt4o':
        result = await mockGpt4(input);
        break;
      case 'elevenlabs':
        result = await mockElevenLabs(input);
        break;
      default:
        result = { text: 'No output' };
    }

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

async function mockDalle3(_prompt: string) {
  // Mock DALL·E response
  return {
    model: 'dall-e-3',
    created: new Date().toISOString(),
    data: [
      {
        url: 'https://via.placeholder.com/1024x1024?text=Generated+Image',
      },
    ],
  };
}

async function mockGpt4(prompt: string) {
  // Mock GPT-4 response
  return {
    model: 'gpt-4-omni',
    choices: [
      {
        message: {
          content: `This is a mock response to: "${prompt}". In production, this would call the actual OpenAI API.`,
        },
      },
    ],
  };
}

async function mockElevenLabs(_text: string) {
  // Mock ElevenLabs response
  return {
    audio_base64: 'mock_audio_data',
    duration_ms: 2500,
  };
}

export async function runComparison(
  prompt: string,
  apiIds: string[]
): Promise<Record<string, any>> {
  const results: Record<string, any> = {};

  for (const apiId of apiIds) {
    results[apiId] = await runApi(apiId, prompt);
  }

  return results;
}

