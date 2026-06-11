import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  },
  transpilePackages: [
    "@shadergradient/react",
    "@react-three/fiber",
    "three"
  ],
  webpack(config) {
    // The @shadergradient/react package's exports field doesn't expose a
    // `default`/`require` condition, which trips Next's bundler. Alias the
    // package straight to its dist entry to bypass the exports resolver.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@shadergradient/react$": path.resolve(
        __dirname,
        "node_modules/@shadergradient/react/dist/index.mjs"
      )
    };
    return config;
  }
};

export default nextConfig;
