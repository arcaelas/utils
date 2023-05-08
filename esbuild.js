#! ts-node
const { build } = require("esbuild")

build({
    bundle: true,
    minify: true,
    platform: "neutral",
    alias: { "~": "src/" },
    outfile: "lib/index.js",
    entryPoints: ["src/index.ts"],
})