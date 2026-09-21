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
                replacement: path.resolve(
                    import.meta.dirname,
                    'src/components',
                ),
            },
            {
                find: '@api',
                replacement: path.resolve(import.meta.dirname, 'src/api'),
            },
            {
                find: '@utils',
                replacement: path.resolve(import.meta.dirname, 'src/utils'),
            },
            {
                find: '@routes',
                replacement: path.resolve(import.meta.dirname, 'src/routes'),
            },
            {
                find: '@hooks',
                replacement: path.resolve(import.meta.dirname, 'src/hooks'),
            },
            {
                find: '@lessons',
                replacement: path.resolve(import.meta.dirname, 'src/lessons'),
            },
            {
                find: '@conversations-data',
                replacement: path.resolve(
                    import.meta.dirname,
                    'src/conversations-data',
                ),
            },
            {
                find: '@dictionary',
                replacement: path.resolve(
                    import.meta.dirname,
                    'src/dictionary',
                ),
            },
            {
                find: '@words',
                replacement: path.resolve(import.meta.dirname, 'src/words'),
            },
            {
                find: '@themes',
                replacement: path.resolve(import.meta.dirname, 'src/themes'),
            },
        ],
    },
    base: '/pikalang/',
    server: {
        // Lets a launcher hand us a free port instead of colliding on 5173.
        port: process.env.PORT ? Number(process.env.PORT) : undefined,
    },
});
