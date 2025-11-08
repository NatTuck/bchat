import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@wllama/wllama/esm/single-thread/wllama.wasm',
          dest: 'esm/single-thread',
        },
        {
          src: 'node_modules/@wllama/wllama/esm/multi-thread/wllama.wasm',
          dest: 'esm/multi-thread',
        },
      ],
    })
  ],
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  }
})
