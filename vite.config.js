import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
	server: {
		port: 8066,
		hmr: false,
	},
	plugins: [vue()],
	define: {
		"process.env": {},
	},
	resolve: {
		alias: {
			vue: "vue/dist/vue.esm-bundler.js",
			"@": resolve(__dirname, "./src"),
		},
	},
	optimizeDeps: {
		exclude: [
			"consolidate",
			"velocityjs",
			"dustjs-linkedin",
			"atpl",
			"liquor",
			"twig",
			"ejs",
			"eco",
			"jazz",
			"hamljs",
			"hamlet",
			"jqtpl",
			"whiskers",
			"haml-coffee",
			"hogan.js",
			"templayed",
			"handlebars",
			"underscore",
			"lodash",
			"walrus",
			"mustache",
			"just",
			"ect",
			"mote",
			"toffee",
			"dot",
			"bracket-template",
			"ractive",
			"htmling",
			"babel-core",
			"plates",
			"react-dom/server",
			"react",
			"vash",
			"slm",
			"marko",
			"teacup/lib/express",
			"coffee-script",
			"squirrelly",
			"twing",
		],
	},
});
