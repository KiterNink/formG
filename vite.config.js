import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 1000
	},
	mode: 'development',
	plugins: [
		vue(),
	],
	resolve: {
		alias: {
			vue: "vue/dist/vue.runtime.esm-browser.js",
			"@": resolve(__dirname, "./src"),
		},
	},
	optimizeDeps: {
		exclude: ['consolidate']
	  }
});
