import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// Fix: Explicitly import the 'process' module to ensure the correct Node.js types
// are used, resolving the error "Property 'cwd' does not exist on type 'Process'".
import * as process from 'process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    // This 'define' block is crucial for making environment variables available
    // in your application code. Vite will replace any instance of 'process.env.API_KEY'
    // with the actual value from the environment at build time.
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})