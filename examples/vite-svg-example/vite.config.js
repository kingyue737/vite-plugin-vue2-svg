import { defineConfig } from "vite";
import { createSvgPlugin } from "vite-plugin-vue2-svg";
import createVuePlugin from "@vitejs/plugin-vue2";
export default defineConfig({
  plugins: [createVuePlugin(), createSvgPlugin({})],
});
