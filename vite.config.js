import { defineConfig } from "vite";
import vitePluginVuedoc, { vueDocFiles } from "vite-plugin-vuedoc";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vitePluginVuedoc({
			previewComponent: "DemoPreview",
		}),
		vue({
			include: [...vueDocFiles],
		}),
	],
	resolve: {
		alias: {
			vue: "vue/dist/vue.esm-bundler.js",
			"@": resolve(__dirname, "./src"),
		},
	},
});
