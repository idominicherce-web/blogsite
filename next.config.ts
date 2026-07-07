// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		cacheComponents: true, // MVP 10: Modern replacement for experimental.ppr
	},
};

export default nextConfig;
