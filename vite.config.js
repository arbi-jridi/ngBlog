import { defineConfig } from 'vite';
import { createAngularPlugin } from '@ngneat/vite-plugin-angular';

export default defineConfig({
  plugins: [createAngularPlugin()],
  server: {
    port: 4200,
  },
});