// convert-to-webp.mjs
// Run from the project root: node convert-to-webp.mjs
// sharp ships with Next.js — no extra install needed.

import { createRequire } from "module";
import { existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Next.js vendors its own sharp build
let sharp;
try {
  sharp = require("sharp");
} catch {
  // fall back to next's internal copy
  sharp = require("./node_modules/sharp");
}

const publicDir = resolve(__dirname, "public");

const images = [
  { src: "hero-desktop.jpeg", dest: "hero-desktop.webp", quality: 85 },
  { src: "hero-tablet.jpeg",  dest: "hero-tablet.webp",  quality: 85 },
  { src: "hero-mobile.jpeg",  dest: "hero-mobile.webp",  quality: 85 },
  { src: "logo.png",          dest: "logo.webp",          quality: 90 },
];

for (const { src, dest, quality } of images) {
  const srcPath  = resolve(publicDir, src);
  const destPath = resolve(publicDir, dest);
  if (!existsSync(srcPath)) {
    console.warn(`SKIP  ${src} — not found`);
    continue;
  }
  await sharp(srcPath).webp({ quality }).toFile(destPath);
  console.log(`OK    ${src}  →  ${dest}`);
}

console.log("\nAll done. WebP files written to /public.");
