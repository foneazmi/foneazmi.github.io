import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from '@vitejs/plugin-react-swc'
import { ViteMinifyPlugin } from "vite-plugin-minify";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), ViteMinifyPlugin({})],
});
