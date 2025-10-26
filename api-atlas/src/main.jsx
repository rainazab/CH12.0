import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Debug logging
console.log('🚀 main.jsx loaded');
console.log('Root element:', document.getElementById('root'));

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('✅ Creating React root...');
  try {
    // Add a simple test to see if React is working
    rootElement.innerHTML = `
      <div style="padding: 20px; color: white; font-family: Arial, sans-serif;">
        <h1>🔄 Loading React...</h1>
        <p>Check console for logs</p>
      </div>
    `;

    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('✅ React app rendered successfully');
  } catch (error) {
    console.error('❌ Error rendering React app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; background: #f0f0f0;">
        <h1 style="color: red;">React Error</h1>
        <p>Error: ${error.message}</p>
        <p>Check browser console for details.</p>
        <pre style="background: #333; color: #fff; padding: 10px; margin: 10px 0; border-radius: 5px; font-size: 12px;">${error.stack}</pre>
      </div>
    `;
  }
} else {
  console.error('❌ Root element not found!');
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; background: #f0f0f0;">
      <h1 style="color: red;">Root Element Not Found</h1>
      <p>Could not find element with id="root"</p>
    </div>
  `;
}
