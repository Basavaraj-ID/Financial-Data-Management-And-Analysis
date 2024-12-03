import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: true,
    },
    plugins: [react()],
    define: {
      // Make custom environment variables accessible in the code
      __APP_ENV__: JSON.stringify(env.APP_ENV), // Example custom variable
    },
  };
});
