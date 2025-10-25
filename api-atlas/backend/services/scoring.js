/**
 * Calculate relevance score for an API result
 * Combines semantic relevance with performance metrics
 */
export function calculateRelevanceScore(api) {
  let score = 0;

  // 1. Semantic relevance (40% weight)
  // Chroma returns distance, convert to similarity score (0-1)
  const semanticScore = Math.max(0, 1 - (api.relevanceScore || 0.5));
  score += semanticScore * 0.4;

  // 2. Performance score (60% weight)
  const performanceScore = calculatePerformanceScore(api.performance || {});
  score += performanceScore * 0.6;

  return Math.round(score * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate performance score based on metrics
 */
function calculatePerformanceScore(performance) {
  let score = 0.5; // Default score

  if (!performance || performance.status === 'unknown') {
    return score; // Neutral score for unknown performance
  }

  // Response time score (40% of performance score)
  if (performance.responseTime) {
    const responseTimeScore = calculateResponseTimeScore(performance.responseTime);
    score += responseTimeScore * 0.4;
  }

  // Uptime score (40% of performance score)
  if (performance.uptime !== null) {
    const uptimeScore = performance.uptime / 100; // Convert percentage to 0-1
    score += uptimeScore * 0.4;
  }

  // Status score (20% of performance score)
  const statusScore = calculateStatusScore(performance.status);
  score += statusScore * 0.2;

  return Math.min(1, Math.max(0, score)); // Clamp between 0 and 1
}

/**
 * Calculate score based on response time
 */
function calculateResponseTimeScore(responseTime) {
  // Excellent: < 500ms
  // Good: 500-1000ms
  // Fair: 1000-2000ms
  // Poor: > 2000ms

  if (responseTime < 500) return 1.0;
  if (responseTime < 1000) return 0.8;
  if (responseTime < 2000) return 0.6;
  return 0.3;
}

/**
 * Calculate score based on status
 */
function calculateStatusScore(status) {
  switch (status) {
    case 'operational':
    case 200:
      return 1.0;
    case 'degraded':
    case 429: // Rate limited
      return 0.7;
    case 'down':
    case 500:
    case 502:
    case 503:
    case 504:
      return 0.1;
    default:
      return 0.5; // Unknown status
  }
}

/**
 * Calculate overall API quality score
 */
export function calculateQualityScore(api) {
  const relevanceScore = calculateRelevanceScore(api);
  const performanceScore = calculatePerformanceScore(api.performance || {});

  // Weighted combination
  return {
    overall: Math.round((relevanceScore * 0.4 + performanceScore * 0.6) * 100) / 100,
    relevance: Math.round(relevanceScore * 100) / 100,
    performance: Math.round(performanceScore * 100) / 100,
    components: {
      semanticMatch: Math.round(relevanceScore * 100) / 100,
      responseTime: performanceScore > 0 ? Math.round(performanceScore * 100) / 100 : null,
      uptime: api.performance?.uptime || null,
      reliability: api.reliability || null
    }
  };
}

/**
 * Compare two APIs and determine winner
 */
export function compareAPIs(api1, api2) {
  const score1 = calculateRelevanceScore(api1);
  const score2 = calculateRelevanceScore(api2);

  return {
    winner: score1 > score2 ? api1 : api2,
    scores: {
      [api1.name]: score1,
      [api2.name]: score2
    },
    difference: Math.abs(score1 - score2)
  };
}

/**
 * Get performance tier based on metrics
 */
export function getPerformanceTier(performance) {
  if (!performance || performance.status === 'unknown') {
    return 'unknown';
  }

  const responseTime = performance.responseTime || 9999;
  const uptime = performance.uptime || 0;

  if (responseTime < 500 && uptime > 99.5) {
    return 'excellent';
  } else if (responseTime < 1000 && uptime > 99) {
    return 'good';
  } else if (responseTime < 2000 && uptime > 95) {
    return 'fair';
  } else {
    return 'poor';
  }
}

/**
 * Calculate cost efficiency score
 */
export function calculateCostEfficiency(api, usage = 'moderate') {
  // This would need actual pricing data and usage patterns
  // For now, return a mock score based on popularity and pricing model

  let efficiencyScore = 0.5; // Default

  // Favor APIs with good popularity (indicates reliability)
  efficiencyScore += (api.popularity / 100) * 0.3;

  // Favor APIs with clear pricing models
  if (api.pricingModel === 'pay-per-use') {
    efficiencyScore += 0.2;
  } else if (api.pricingModel === 'subscription') {
    efficiencyScore += 0.1;
  }

  return Math.min(1, Math.max(0, efficiencyScore));
}
