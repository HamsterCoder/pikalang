import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        ViteEjsPlugin((viteConfig) => ({
            // viteConfig is the current Vite resolved config
            env: viteConfig.env,
        })),
        react(),
    ],
    resolve: {
        alias: [
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '@api',
                replacement: path.resolve(__dirname, 'src/api'),
            },
            {
                find: '@utils',
                replacement: path.resolve(__dirname, 'src/utils'),
            },
        ],
    },
    base: '/pikalang/',
});
