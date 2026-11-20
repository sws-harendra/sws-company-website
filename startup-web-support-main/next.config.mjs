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
    domains: ["api.startupwebsupport.com", "localhost", "images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },
  webpack: (config) => {
    // Prevent canvas module errors when pdfjs-dist runs in SSR context
    config.resolve.alias.canvas = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
