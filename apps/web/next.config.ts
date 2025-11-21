// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withYak } from "next-yak/withYak";

// Helper to compose multiple Next.js plugins with proper typing
function composePlugins<T extends NextConfig>(
  ...plugins: ((config: T) => T)[]
) {
  return (config: T): T => plugins.reduce((acc, plugin) => plugin(acc), config);
}

// Base Next.js config
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // add other Next.js options here
};

// Wrap next-intl
const withNextIntl = createNextIntlPlugin();

// Compose plugins in order
const withPlugins = composePlugins(withNextIntl, withYak);

export default withPlugins(nextConfig);
