import { defineConfig } from "vite";

export default defineConfig({
	root: "./",
	base: "/towers-of-hanoi",
	build: {
		outDir: "./dist",
		assetsDir: "./",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: "index.html",
			},
			output: {
				entryFileNames: "[name]-[hash].js",
				assetFileNames: "[name]-[hash].[ext]",
			},
		},
	},
});
