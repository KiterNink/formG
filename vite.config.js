import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8066,
	},
	plugins: [vue()],
	resolve: {
		alias: {
			vue: "vue/dist/vue.esm-bundler.js",
			"@": resolve(__dirname, "./src"),
		},
	},
});
