import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts", "./src/lite.ts"],
	dts: true,
	minify: true,
	platform: "browser",
	exports: true,
	fixedExtension: true,
});
