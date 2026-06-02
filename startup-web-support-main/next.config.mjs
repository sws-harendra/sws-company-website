import { copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Keep pdf.worker in sync with the installed pdfjs-dist version automatically
const workerSrc = join(__dirname, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const workerDest = join(__dirname, "public/pdf.worker.min.mjs");
if (existsSync(workerSrc)) {
  copyFileSync(workerSrc, workerDest);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.startupwebsupport.com", "localhost"],
  },
  webpack: (config) => {
    // Prevent canvas module errors when pdfjs-dist runs in SSR context
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
