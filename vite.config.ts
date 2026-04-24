import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: '.',
      server: { port: 3000, open: '/test/index.html' },
    };
  }

  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'cosmo',
        formats: ['umd', 'es'],
        fileName: (format) => (format === 'umd' ? 'cosmo.js' : 'cosmo.esm.js'),
      },
      outDir: 'dist',
      emptyOutDir: true,
    },
  };
});
