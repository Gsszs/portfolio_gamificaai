// vite.config.js
import { defineConfig } from 'vite';

const tiledPlugin = () => {
    return {
        name: 'tiled-tileset-plugin',
        resolveId: {
            order: 'pre',
            handler(sourceId, importer, options) {
                if (!sourceId.endsWith(".tsx")) return;
                return { id: 'tileset:' + sourceId, external: 'relative' }
            }
        }
    };
}

export default defineConfig({
    plugins: [tiledPlugin()],
    build: {
        assetsInlineLimit: 0,
        sourcemap: true
    }
});