#!/usr/bin/env node

/**
 * Rho Setup Script
 * Helps initialize the development environment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function error(message) {
  log(`❌ ${message}`, colors.red);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function warning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

async function checkDependencies() {
  info('Checking dependencies...');

  try {
    // Check Node.js version
    const nodeVersion = execSync('node --version').toString().trim();
    info(`Node.js version: ${nodeVersion}`);

    // Check if npm is available
    const npmVersion = execSync('npm --version').toString().trim();
    info(`npm version: ${npmVersion}`);

    success('Dependencies check passed');
    return true;
  } catch (err) {
    error('Dependencies check failed');
    error('Please ensure Node.js and npm are installed');
    return false;
  }
}

async function setupEnvironment() {
  info('Setting up environment...');

  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      warning('.env file created from .env.example');
      info('Please update .env with your actual API keys and URLs');
    } else {
      // Create basic .env file
      const envContent = `# Rho Environment Configuration
VITE_API_URL=http://localhost:3001/api
VITE_CHROMA_URL=http://localhost:8000
VITE_ELASTIC_URL=http://localhost:9200

# Elastic Configuration
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=changeme

# Chroma Configuration
CHROMA_API_KEY=your-chroma-api-key

# Development
NODE_ENV=development
`;
      fs.writeFileSync(envPath, envContent);
      warning('.env file created with default values');
      info('Please update .env with your actual API keys and URLs');
    }
  } else {
    success('.env file already exists');
  }
}

async function installDependencies() {
  info('Installing dependencies...');

  try {
    // Install frontend dependencies
    log('Installing frontend dependencies...', colors.cyan);
    execSync('npm install', { stdio: 'inherit', cwd: process.cwd() });

    // Install backend dependencies
    log('Installing backend dependencies...', colors.cyan);
    execSync('npm install', { stdio: 'inherit', cwd: 'backend' });

    success('All dependencies installed successfully');
    return true;
  } catch (err) {
    error('Failed to install dependencies');
    error(err.message);
    return false;
  }
}

async function seedDatabase() {
  info('Seeding database with initial API data...');

  try {
    // This would normally seed Chroma with API data
    // For now, just log the instruction
    warning('Database seeding requires manual setup:');
    log('1. Set up Chroma vector database', colors.cyan);
    log('2. Set up Elastic monitoring instance', colors.cyan);
    log('3. Run: curl http://localhost:3001/api/monitor/seed', colors.cyan);

    return true;
  } catch (err) {
    warning('Database seeding skipped (manual setup required)');
    return true;
  }
}

async function startDevelopmentServers() {
  info('Starting development servers...');

  try {
    log('Starting backend server on port 3001...', colors.cyan);
    // Note: In a real setup, you'd use something like concurrently
    log('Run: npm run backend (in backend directory)', colors.cyan);

    log('Starting frontend server on port 5173...', colors.cyan);
    log('Run: npm run dev', colors.cyan);

    success('Setup complete!');
    log('\n🚀 To start the application:', colors.bright);
    log('1. Backend: cd backend && npm start', colors.cyan);
    log('2. Frontend: npm run dev', colors.cyan);
    log('3. Open: http://localhost:5173', colors.cyan);

    return true;
  } catch (err) {
    error('Failed to start development servers');
    return false;
  }
}

async function main() {
  log(`${colors.bright}${colors.cyan}🚀 Rho Setup${colors.reset}\n`, colors.bright);

  const steps = [
    checkDependencies,
    setupEnvironment,
    installDependencies,
    seedDatabase,
    startDevelopmentServers
  ];

  for (const step of steps) {
    const success = await step();
    if (!success && step !== seedDatabase) {
      process.exit(1);
    }
  }

  log(`\n${colors.bright}${colors.green}🎉 Setup complete! Ready to build amazing API discovery experiences!${colors.reset}`, colors.bright);
}

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main as setup };
