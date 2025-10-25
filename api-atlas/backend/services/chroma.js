import { ChromaClient } from 'chromadb';

// Initialize Chroma client
const client = new ChromaClient({
  path: process.env.CHROMA_URL || 'http://localhost:8000'
});

// Collection name for API data
const COLLECTION_NAME = 'api-atlas-apis';

/**
 * Initialize or get the API collection
 */
async function getOrCreateCollection() {
  try {
    // Try to get existing collection
    const collection = await client.getCollection({ name: COLLECTION_NAME });
    return collection;
  } catch (error) {
    // Create new collection if it doesn't exist
    console.log(`📚 Creating new Chroma collection: ${COLLECTION_NAME}`);
    const collection = await client.createCollection({
      name: COLLECTION_NAME,
      metadata: {
        description: 'API Atlas - Semantic search for developer APIs'
      }
    });
    return collection;
  }
}

/**
 * Search APIs using semantic similarity
 */
export async function searchAPIs(query) {
  try {
    const collection = await getOrCreateCollection();

    // Generate embedding for the query (using simple text for now)
    // In production, you'd use a proper embedding model
    const embedding = await generateEmbedding(query);

    console.log(`🔍 Searching Chroma with query embedding (dimension: ${embedding.length})`);

    // Search for similar APIs
    const results = await collection.query({
      queryEmbeddings: [embedding],
      nResults: 20,
      includeMetadata: true
    });

    // Format results
    const formattedResults = results.ids[0].map((id, index) => ({
      id,
      name: results.metadatas[0][index].name,
      description: results.metadatas[0][index].description,
      category: results.metadatas[0][index].category,
      provider: results.metadatas[0][index].provider,
      features: results.metadatas[0][index].features || [],
      pricing: results.metadatas[0][index].pricing || {},
      documentation: results.metadatas[0][index].documentation,
      endpoint: results.metadatas[0][index].endpoint,
      relevanceScore: results.distances[0][index],
      metadata: results.metadatas[0][index]
    }));

    return formattedResults;

  } catch (error) {
    console.error('Chroma search error:', error);
    throw new Error(`Semantic search failed: ${error.message}`);
  }
}

/**
 * Add API to Chroma collection
 */
export async function addAPIToChroma(apiData) {
  try {
    const collection = await getOrCreateCollection();

    // Generate embedding for API description
    const embedding = await generateEmbedding(
      `${apiData.description} ${apiData.features?.join(' ')} ${apiData.category}`
    );

    // Add to collection
    await collection.add({
      ids: [apiData.id],
      embeddings: [embedding],
      metadatas: [{
        name: apiData.name,
        description: apiData.description,
        category: apiData.category,
        provider: apiData.provider,
        features: apiData.features,
        pricing: apiData.pricing,
        documentation: apiData.documentation,
        endpoint: apiData.endpoint,
        addedAt: new Date().toISOString()
      }]
    });

    console.log(`✅ Added API ${apiData.name} to Chroma collection`);
    return { success: true, id: apiData.id };

  } catch (error) {
    console.error('Chroma add error:', error);
    throw new Error(`Failed to add API to Chroma: ${error.message}`);
  }
}

/**
 * Simple embedding generation (placeholder)
 * In production, use OpenAI embeddings or sentence-transformers
 */
async function generateEmbedding(text) {
  // This is a simplified placeholder
  // In production, you'd use a proper embedding API
  const words = text.toLowerCase().split(' ');
  const embedding = new Array(384).fill(0); // 384-dimensional vector

  // Simple hash-based embedding (not semantically meaningful)
  words.forEach((word, index) => {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Use hash to modify embedding vector
    const vectorIndex = Math.abs(hash) % 384;
    embedding[vectorIndex] = (embedding[vectorIndex] + hash / 1000) % 1;
  });

  return embedding;
}

/**
 * Seed initial API data
 */
export async function seedAPIData() {
  try {
    console.log('🌱 Seeding API data to Chroma...');

    const initialAPIs = [
      {
        id: 'openai-gpt4',
        name: 'OpenAI GPT-4',
        category: 'LLM',
        provider: 'OpenAI',
        description: 'Advanced language model for text generation, analysis, and conversation',
        features: ['Text generation', 'Function calling', 'Vision', 'JSON mode'],
        pricing: { model: 'pay-per-token', input: 0.01, output: 0.03 },
        endpoint: 'https://api.openai.com/v1/chat/completions',
        documentation: 'https://platform.openai.com/docs',
        tags: ['AI', 'NLP', 'Chat', 'Code', 'Enterprise']
      },
      {
        id: 'anthropic-claude',
        name: 'Claude API',
        category: 'LLM',
        provider: 'Anthropic',
        description: 'Constitutional AI for safe and helpful text generation',
        features: ['Text generation', 'Safety', 'Vision', 'Large context'],
        pricing: { model: 'pay-per-token', input: 0.003, output: 0.015 },
        endpoint: 'https://api.anthropic.com/v1/messages',
        documentation: 'https://docs.anthropic.com',
        tags: ['AI', 'Safety', 'Vision', 'Enterprise']
      },
      {
        id: 'google-gemini',
        name: 'Gemini API',
        category: 'LLM',
        provider: 'Google',
        description: 'Multimodal AI for text and vision tasks',
        features: ['Text generation', 'Vision', 'Multimodal', 'Enterprise'],
        pricing: { model: 'pay-per-token', input: 0.0005, output: 0.0015 },
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
        documentation: 'https://ai.google.dev',
        tags: ['AI', 'Vision', 'Enterprise', 'Google']
      }
    ];

    const collection = await getOrCreateCollection();

    // Check if already seeded
    const count = await collection.count();
    if (count > 0) {
      console.log(`📊 Chroma collection already has ${count} APIs`);
      return { seeded: false, count };
    }

    // Add APIs to collection
    for (const api of initialAPIs) {
      await addAPIToChroma(api);
    }

    console.log(`✅ Successfully seeded ${initialAPIs.length} APIs to Chroma`);
    return { seeded: true, count: initialAPIs.length };

  } catch (error) {
    console.error('Seeding error:', error);
    throw new Error(`Failed to seed API data: ${error.message}`);
  }
}

/**
 * Get collection statistics
 */
export async function getCollectionStats() {
  try {
    const collection = await getOrCreateCollection();
    const count = await collection.count();

    return {
      collectionName: COLLECTION_NAME,
      documentCount: count,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Collection stats error:', error);
    throw new Error(`Failed to get collection stats: ${error.message}`);
  }
}
