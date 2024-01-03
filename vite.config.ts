import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// Fix Vite Uncaught ReferenceError //
// https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_API_KEY': JSON.stringify(env.REACT_APP_API_KEY),
    },
    plugins: [react()],
  };
});

