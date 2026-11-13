import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'node:url';

const frontendDirectory = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Explicitly expose only the public payment key. Never use a broad envPrefix:
  // PAYSTACK_SECRET_KEY must remain on the backend.
  const env = { ...loadEnv(mode, process.cwd(), ''), ...loadEnv(mode, frontendDirectory, ''), ...process.env };
  const publicKey = [env.PAYSTACK_PUBLIC_KEY, env.VITE_PAYSTACK_PUBLIC_KEY]
    .map((value) => (value || '').trim())
    .find((value) => /^pk_(test|live)_[a-z0-9]+$/i.test(value) && !/^pk_(test|live)_x+$/i.test(value)) || '';

  return {
    define: {
      'import.meta.env.VITE_PAYSTACK_PUBLIC_KEY': JSON.stringify(publicKey),
    },
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(frontendDirectory, './src'),
      },
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (
              id.includes('node_modules/zustand') ||
              id.includes('node_modules/sonner')
            ) {
              return 'vendor-ui';
            }
          },
        },
      },
    },
    server: {
      port: 5173,
      host: true,
    },
  };
});

