import { defineConfig } from "vite";

export default defineConfig({
	root: "./",
	build: {
		outDir: "./docs",
		assetsDir: "./",
		emptyOutDir: true,
	},
});
