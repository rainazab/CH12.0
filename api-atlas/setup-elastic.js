import { Client } from '@elastic/elasticsearch';
import { initializeIndices } from './backend/services/elastic.js';

async function setupElasticsearch() {
  console.log('🚀 Setting up Elasticsearch for API Atlas...');

  try {
    // Initialize Elasticsearch client
    const client = new Client({
      node: process.env.ELASTIC_URL || 'http://localhost:9200',
      auth: {
        username: process.env.ELASTIC_USERNAME || 'elastic',
        password: process.env.ELASTIC_PASSWORD || 'changeme'
      },
      requestTimeout: 60000,
    });

    // Check if Elasticsearch is running
    await client.ping();
    console.log('✅ Elasticsearch is running!');

    // Initialize indices
    await initializeIndices();
    console.log('✅ Indices initialized successfully!');

    // Test basic operations
    await testBasicOperations(client);
    console.log('✅ Basic operations test passed!');

    console.log('\n🎉 Elasticsearch setup complete!');
    console.log('📊 You can now:');
    console.log('   - View data at: http://localhost:5601');
    console.log('   - Query API at: http://localhost:9200');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Make sure Elasticsearch is running:');
    console.log('   docker-compose up -d');
    process.exit(1);
  }
}

async function testBasicOperations(client) {
  // Test creating a sample document
  await client.index({
    index: 'api-atlas-performance',
    body: {
      api_id: 'test-api',
      timestamp: new Date().toISOString(),
      response_time_ms: 250,
      status: 'operational',
      error_rate: 0.01,
      region: 'us-east'
    }
  });

  // Test searching
  const result = await client.search({
    index: 'api-atlas-performance',
    body: {
      query: {
        match_all: {}
      }
    }
  });

  console.log(`   Found ${result.hits.hits.length} documents`);
}

// Run setup if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupElasticsearch();
}

export { setupElasticsearch };
